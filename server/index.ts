import express from 'express';
import session from 'express-session'; // Add this line
import cookieSession from 'cookie-session'; // If you want to use cookie-based sessions
import cors from 'cors';
import passport from 'passport';
import { router as authRoutes } from './routes/authRoutes';
import { prisma, router as testRoutes } from './routes/userRoutes';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import Stripe from "stripe";


dotenv.config();

const app = express();

const allowedOrigin = "https://gizmo-o5jq.vercel.app";

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true, // 👈 allow cookies, authorization headers, etc.
  })
);


// Session setup
const key = process.env.SESSIONKEY || 'default_secret_key'; // Fallback if SESSIONKEY is not set
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-12-18.acacia" });


app.use(session({
  secret: key,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// Passport middleware for session handling
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.post(
  "/stripe/webhook",
  express.raw({ type: "application/json" }), // Ensures raw body is available
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;
    try {
      // ✅ Pass raw `req.body` as a Buffer (not a parsed JSON object)
      event = stripe.webhooks.constructEvent(req.body, sig!, endpointSecret!);
    } catch (err: any) {
      console.error("⚠️ Webhook signature verification failed:", err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;

    }

    // ✅ Handle checkout completion
    if (event?.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      try {
        if (!session.metadata || !session.metadata.UserId) {
          console.warn("⚠️ Metadata is missing, cannot process payment.");
          res.status(400).send("Metadata is required.");
          return;
        }

        const userId = session.metadata?.UserId;
        const sessionId = session.id;
        const totalAmount = session.amount_total;
        const currency = session.currency;
        var UserName = "";
        const User = await prisma.user.findUnique({
          where: { id: userId }
        });
        if (User) {
          UserName = User.username;
        }
        // ✅ Get line items
        const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);
        console.log(sessionId);
        console.log(lineItems);
        console.log(totalAmount ? totalAmount / 100 : 0);
        console.log("✅ Payment Successful:");

        //✅ Store transaction in DB(adjust based on your DB)
        const transaction = await prisma.transaction.create({
          data: { userId, price: totalAmount ? totalAmount / 100 : 0, paymentStatus: "COMPLETED", sessionId: sessionId }
        });

        // console.log("✅ Transaction stored in DB.",transaction);
      } catch (err) {
        console.error("❌ Error storing transaction:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
    }

    res.json({ received: true });
  }
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// Use authRoutes for /auth routes
app.use("/auth", authRoutes);



// Use testRoutes for other routes
app.use("/", testRoutes);


prisma.$connect()
  .then(() => console.log("DB connected"))
  .catch((err) => console.error("DB connection failed:", err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
