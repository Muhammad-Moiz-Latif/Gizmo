"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session")); // Add this line
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const authRoutes_1 = require("./routes/authRoutes");
const userRoutes_1 = require("./routes/userRoutes");
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const stripe_1 = __importDefault(require("stripe"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const allowedOrigins = [
    "http://localhost:5173",
];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true, // 👈 allow cookies, authorization headers, etc.
}));
// Session setup
const key = process.env.SESSIONKEY || 'default_secret_key'; // Fallback if SESSIONKEY is not set
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-12-18.acacia" });
app.use((0, express_session_1.default)({
    secret: key,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));
// Passport middleware for session handling
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((0, cookie_parser_1.default)());
app.post("/stripe/webhook", express_1.default.raw({ type: "application/json" }), // Ensures raw body is available
async (req, res) => {
    var _a;
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event;
    try {
        // ✅ Pass raw `req.body` as a Buffer (not a parsed JSON object)
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    }
    catch (err) {
        console.error("⚠️ Webhook signature verification failed:", err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
    // ✅ Handle checkout completion
    if ((event === null || event === void 0 ? void 0 : event.type) === "checkout.session.completed") {
        const session = event.data.object;
        try {
            if (!session.metadata || !session.metadata.UserId) {
                console.warn("⚠️ Metadata is missing, cannot process payment.");
                res.status(400).send("Metadata is required.");
                return;
            }
            const userId = (_a = session.metadata) === null || _a === void 0 ? void 0 : _a.UserId;
            const sessionId = session.id;
            const totalAmount = session.amount_total;
            const currency = session.currency;
            var UserName = "";
            const User = await userRoutes_1.prisma.user.findUnique({
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
            const transaction = await userRoutes_1.prisma.transaction.create({
                data: { userId, price: totalAmount ? totalAmount / 100 : 0, paymentStatus: "COMPLETED", sessionId: sessionId }
            });
            // console.log("✅ Transaction stored in DB.",transaction);
        }
        catch (err) {
            console.error("❌ Error storing transaction:", err);
            res.status(500).send("Internal Server Error");
            return;
        }
    }
    res.json({ received: true });
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Use authRoutes for /auth routes
app.use("/auth", authRoutes_1.router);
// Use testRoutes for other routes
app.use("/", userRoutes_1.router);
userRoutes_1.prisma.$connect()
    .then(() => console.log("DB connected"))
    .catch((err) => console.error("DB connection failed:", err));
const port = 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
//# sourceMappingURL=index.js.map