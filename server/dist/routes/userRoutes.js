"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.router = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client_1 = require("@prisma/client");
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const stripe_1 = __importDefault(require("stripe"));
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
    throw new Error("Stripe secret key is not defined");
}
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-12-18.acacia" });
exports.router = (0, express_1.Router)();
exports.prisma = new client_1.PrismaClient();
const cloudinary = require('cloudinary').v2;
// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        //@ts-ignore
        folder: 'devices', // The folder in Cloudinary where files will be stored
        allowed_formats: ['jpeg', 'png', 'jpg'], // Allowed file formats
    },
});
const upload = (0, multer_1.default)({ storage });
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        //the default route
        exports.router.get('/', (req, res) => {
            res.send('Im a fucking genius I am');
        });
        // Status route to check server health
        exports.router.get('/status', (req, res) => {
            res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
        });
        exports.router.get('/AdminDashboard/getData', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const Users = yield exports.prisma.user.findMany();
                const Devices = yield exports.prisma.user.findMany();
                const Orders = yield exports.prisma.order.findMany();
                const totalPrice = Orders.reduce((sum, item) => sum + item.totalPrice, 0);
                if (Users && Devices && Orders && totalPrice) {
                    res.status(200).json({ Users, Devices, Orders, totalPrice });
                }
            }
            catch (error) {
            }
        }));
        exports.router.get('/AdminDashboard/GetDevices', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const devices = yield exports.prisma.device.findMany();
                const categories = yield exports.prisma.category.findMany();
                const fixedDevices = devices.map(device => (Object.assign(Object.assign({}, device), { SerialNumber: device.SerialNumber.toString() })));
                res.status(200).json({ fixedDevices, categories });
            }
            catch (error) {
                console.error('Error fetching devices:', error);
                res.status(500).json({ error: 'An error occurred while fetching devices' });
            }
        }));
        exports.router.get('/UserDashboard/:UserId/Wishlist/Get', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { UserId } = req.params;
            const User = yield exports.prisma.user.findUnique({
                where: { id: UserId }
            });
            if (User) {
                res.status(200).json({ User: User.WishListDevices });
            }
        }));
        exports.router.get('/UserDashboard/:UserId/Cart/Set', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { UserId } = req.params;
            const Cart = yield exports.prisma.cart.findMany({
                where: { userId: UserId }
            });
            if (Cart) {
                res.status(200).json({ Cart });
            }
        }));
        exports.router.get('/AdminDashboard/GetDevice/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const devices = yield exports.prisma.device.findUnique({
                    where: { DeviceId: req.params.id }
                });
                const categories = yield exports.prisma.category.findUnique({
                    where: {
                        CategoryId: devices === null || devices === void 0 ? void 0 : devices.categoryid
                    }
                });
                const fixedDevices = Object.assign(Object.assign({}, devices), { SerialNumber: devices === null || devices === void 0 ? void 0 : devices.SerialNumber.toString() });
                res.status(200).json({ fixedDevices, categories });
            }
            catch (error) {
                console.error('Error fetching devices:', error);
                res.status(500).json({ error: 'An error occurred while fetching devices' });
            }
        }));
        exports.router.get('/UserDashboard/:UserId/Device/:DeviceId/Get', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { UserId, DeviceId } = req.params;
            const User = yield exports.prisma.user.findUnique({
                where: { id: UserId }
            });
            if (User) {
                const getReview = yield exports.prisma.review.findUnique({
                    where: {
                        userId_deviceId: {
                            userId: UserId, // Replace with the actual userId
                            deviceId: DeviceId, // Replace with the actual deviceId
                        },
                    },
                });
                if (getReview) {
                    res.status(200).json({ getReview, UserImg: User.img, UserUsername: User.username });
                }
                else {
                    res.status(200).json({ UserImg: User.img, UserUsername: User.username });
                }
            }
        }));
        exports.router.post('/AdminLogin', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { password } = req.body;
            if (password != 'iamadmin') {
                res.status(401).json({ message: "Invalid Password" });
            }
            ;
            const token = jsonwebtoken_1.default.sign("Thisisthepayloadfornow", "Thisisthejwtsecretfornow");
            res.cookie("AdminToken", token, {
                httpOnly: true, // Prevents JS access
                sameSite: "strict", // Prevents CSRF attacks
                secure: process.env.NODE_ENV === "production", // Ensure same attributes as when setting the cookie
                maxAge: 60 * 60 * 1000, // 1 hour expiration
            });
            res.json({ message: "Login successful" });
        }));
        exports.router.get('/AdminLogout', (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.clearCookie('AdminToken');
            res.status(200).json({ message: "Logged out successfully" });
        }));
        exports.router.post('/UserLogin', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            const checkUser = yield exports.prisma.user.findUnique({
                where: {
                    username: username
                }
            });
            console.log(checkUser);
            // Create JWT payload excluding sensitive information
            const payload = {
                id: checkUser === null || checkUser === void 0 ? void 0 : checkUser.id,
                username: checkUser === null || checkUser === void 0 ? void 0 : checkUser.username
            };
            if (checkUser) {
                const check = yield bcrypt_1.default.compare(password, checkUser.password);
                if (check) {
                    // Sign token
                    const token = jsonwebtoken_1.default.sign(payload, "SECRET_KEY", { expiresIn: '1h' });
                    // Set cookie with token
                    res.cookie('authToken', token);
                    res.json({ message: 'User has logged in successfully', user: { id: checkUser.id, username: checkUser.username } });
                    console.log('User has logged in successfully');
                }
                else {
                    res.json({ message: "Incorrect info" });
                }
            }
        }));
        exports.router.post('/Signup', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { username, email, password } = req.body;
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashedPassword = yield bcrypt_1.default.hash(password, salt);
            const user = yield exports.prisma.user.create({
                data: {
                    username: username,
                    password: hashedPassword,
                    identifier: email,
                    authType: 'EMAIL',
                    img: ""
                }
            });
            res.json(user);
        }));
        // Profile route to mimic a protected resource
        exports.router.get('/profile', (req, res) => {
            res.send('This is a user profile page. Authentication required.');
        });
        exports.router.get('/UserDashboard/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const User = yield exports.prisma.user.findUnique({
                where: {
                    id: id
                }, include: {
                    transactions: true
                }
            });
            if (User) {
                res.status(200).json({ UserInfo: User });
            }
            else {
                res.status(400).json({ message: "No user found" });
            }
        }));
        exports.router.get('/AdminDashboard/Users', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const AllUsers = yield exports.prisma.user.findMany();
            if (AllUsers) {
                res.json(AllUsers);
            }
        }));
        exports.router.get('/AdminDashboard/getCategory', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const allCategories = yield exports.prisma.category.findMany();
            if (allCategories) {
                res.json(allCategories);
            }
        }));
        exports.router.post('/AdminDashboard/AddDevice', upload.array('images'), (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('hello');
                const { name, model, brand, quantity, category, price, description, condition, serialNumber, specifications } = req.body;
                // Handle file uploads to Cloudinary
                const files = req.files; // Now TypeScript recognizes `files`
                console.log(req.body);
                console.log(req.files);
                const imageUrls = [];
                if (files && Array.isArray(files)) {
                    for (const file of files) {
                        imageUrls.push(file.path); // Cloudinary provides the file's URL
                    }
                }
                // The rest of your logic remains the same
                const parsedSpecifications = JSON.parse(specifications);
                const parsedQuantity = parseInt(quantity, 10);
                const parsedPrice = parseFloat(price);
                const newDevice = yield exports.prisma.device.create({
                    data: {
                        DeviceName: name,
                        Model: model,
                        Brand: brand,
                        Quantity: parsedQuantity,
                        Category: {
                            connect: { CategoryName: category }
                        },
                        Price: parsedPrice,
                        Description: description,
                        Condition: condition,
                        SerialNumber: serialNumber,
                        Specifications: parsedSpecifications,
                        Images: imageUrls,
                        status: "PENDING"
                    }
                });
                console.log(newDevice);
                const device = Object.assign(Object.assign({}, newDevice), { SerialNumber: newDevice.SerialNumber.toString() });
                res.status(200).json({ message: 'Device added successfully', device });
            }
            catch (error) {
                console.error('Error storing device:', error);
                res.status(500).json({ error: 'An error occurred while adding the device.' });
            }
        }));
        exports.router.post('/AdminDashboard/UpdateDevice/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { DeviceName, category, Quantity, Price, Description, Brand, Specifications, Images } = req.body;
            const getDevice = yield exports.prisma.device.update({
                where: { DeviceId: id },
                data: {
                    DeviceName,
                    Quantity,
                    Price,
                    Description,
                    Brand,
                    Specifications,
                    Images,
                    Category: {
                        connect: { CategoryName: category }
                    },
                }
            });
            if (getDevice) {
                res.json({ message: "Device has been updated sucessfully" });
            }
        }));
        exports.router.post('/AdminDashboard/AddCategory', upload.single('images'), (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { CategoryName, Description } = req.body;
            const Image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
            const AddCategory = yield exports.prisma.category.create({
                data: {
                    CategoryName: CategoryName,
                    Description: Description,
                    //@ts-ignore
                    Image: Image
                }
            });
            if (AddCategory) {
                res.status(200).json(AddCategory);
            }
        }));
        // Route to delete a category
        exports.router.post('/AdminDashboard/DeleteCategory/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const deletedCategory = yield exports.prisma.category.delete({
                    where: { CategoryId: id },
                });
                res.status(200).json({ message: "Deleted category successfully" });
            }
            catch (error) {
                console.error("Error deleting category:", error);
                res.status(500).json({ error: "Failed to delete category." });
            }
        }));
        exports.router.post('/AdminDashboard/DeleteDevice/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const deletedDevice = yield exports.prisma.device.delete({
                    where: { DeviceId: id },
                });
                res.status(200).json(deletedDevice);
            }
            catch (error) {
                console.error("Error deleting device:", error);
                res.status(500).json({ error: "Failed to delete device." });
            }
        }));
        exports.router.post("/UserDashboard/:UserId/WishList/Add", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { UserId } = req.params;
                const { productId } = req.body;
                const checkuser = yield exports.prisma.user.findUnique({ where: { id: UserId } });
                if (checkuser === null || checkuser === void 0 ? void 0 : checkuser.WishListDevices.includes(productId)) {
                    res.status(200).json({ message: "Device already exists in the wishlist." });
                }
                else {
                    const user = yield exports.prisma.user.update({
                        where: { id: UserId },
                        data: {
                            WishListDevices: { push: productId },
                        },
                    });
                    res.status(200).json({ message: "Device added to wishlist", user });
                }
            }
            catch (error) {
                console.error("Error adding device to wishlist:", error);
                res.status(500).json({ error: "Failed to add device to wishlist." });
            }
        }));
        exports.router.post("/UserDashboard/:UserId/WishList/Delete", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { UserId } = req.params;
                const { productId } = req.body;
                const device = yield exports.prisma.device.findUnique({ where: { DeviceId: productId } });
                const checkuser = yield exports.prisma.user.findUnique({ where: { id: UserId } });
                if (!device) {
                    res.status(404).json({ message: "Device not found in the database." });
                    return;
                }
                if (!checkuser) {
                    res.status(404).json({ message: "User not found in the database." });
                    return;
                }
                if (checkuser.WishListDevices.includes(productId)) {
                    const newWishlist = checkuser.WishListDevices.filter((item) => item !== productId);
                    const user = yield exports.prisma.user.update({
                        where: { id: UserId },
                        data: {
                            WishListDevices: newWishlist,
                        },
                    });
                    res.status(200).json({ message: "Device removed from wishlist", user });
                }
                else {
                    res.status(400).json({ message: "Device not found in the user's wishlist." });
                }
            }
            catch (error) {
                console.error("Error removing device from wishlist:", error);
                res.status(500).json({ error: "Failed to remove device from wishlist." });
            }
        }));
        exports.router.post("/UserDashboard/:UserId/Cart/Add", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { UserId } = req.params;
                const { DeviceId } = req.body;
                // Check if the user exists
                const user = yield exports.prisma.user.findUnique({ where: { id: UserId }, include: { CartDevices: true } });
                if (!user) {
                    res.status(404).json({ error: "User not found." });
                    return;
                }
                // Check if the device is already in the cart
                const existingCartItem = yield exports.prisma.cart.findUnique({
                    where: { DeviceId_userId: {
                            DeviceId: DeviceId,
                            userId: UserId
                        } },
                });
                let updatedCartItem;
                if (existingCartItem) {
                    // If the device exists in the cart, increment the quantity
                    const updatedCartItem = yield exports.prisma.cart.update({
                        where: { DeviceId_userId: {
                                DeviceId: existingCartItem.DeviceId,
                                userId: existingCartItem.userId
                            } },
                        data: {
                            Quantity: existingCartItem.Quantity + 1,
                        }
                    });
                    res.status(200).json(updatedCartItem);
                    return;
                }
                else {
                    // If the device is not in the cart, create a new entry
                    updatedCartItem = yield exports.prisma.cart.create({
                        data: {
                            DeviceId: DeviceId,
                            Quantity: 1,
                            userId: UserId,
                        },
                    });
                    res.status(200).json(updatedCartItem);
                }
            }
            catch (error) {
                console.error("Error adding device to cart:", error);
                res.status(500).json({ error: "Failed to add device to cart." });
                return;
            }
        }));
        exports.router.post('/UserDashboard/:UserId/Cart/Remove', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("Remove route hit"); // Debugging log
            const { UserId } = req.params;
            const { DeviceId } = req.body;
            try {
                const checkUser = yield exports.prisma.user.findUnique({
                    where: { id: UserId },
                    include: { CartDevices: true },
                });
                if (!checkUser) {
                    res.status(404).json({ error: "User not found" });
                    return;
                }
                const deviceInCart = checkUser.CartDevices.find((item) => item.DeviceId === DeviceId);
                if (!deviceInCart) {
                    res.status(404).json({ error: "Device not found in cart" });
                    return;
                }
                yield exports.prisma.cart.delete({
                    where: {
                        DeviceId_userId: {
                            DeviceId,
                            userId: UserId,
                        },
                    },
                });
                const newCart = yield exports.prisma.cart.findMany();
                res.status(200).json({ message: "Device removed", newCart });
            }
            catch (error) {
                console.error("Error removing device:", error);
                res.status(500).json({ error: "Failed to remove device" });
            }
        }));
        exports.router.post('/UserDashboard/:UserId/Cart/Update', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { UserId } = req.params;
            const { DeviceId, Quantity } = req.body;
            const checkUser = yield exports.prisma.user.findUnique({
                where: { id: UserId }
            });
            if (checkUser) {
                const existingCart = yield exports.prisma.cart.findUnique({
                    where: { DeviceId_userId: { DeviceId, userId: UserId } }
                });
                if (!existingCart) {
                    res.status(404).json({ message: "Cart item not found" });
                    return;
                }
                yield exports.prisma.cart.update({
                    where: { DeviceId_userId: {
                            DeviceId: DeviceId,
                            userId: UserId
                        } },
                    data: {
                        Quantity: Quantity
                    }
                });
                const updatedCart = yield exports.prisma.cart.findMany();
                console.log({ updatedCart: updatedCart });
                res.status(200).json(updatedCart);
            }
            ;
        }));
        exports.router.post('/UserDashboard/:UserId/Device/:DeviceId/Create', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { UserId, DeviceId } = req.params;
            const { rating, review, date } = req.body;
            const checkReview = yield exports.prisma.review.findUnique({
                where: {
                    userId_deviceId: {
                        userId: UserId,
                        deviceId: DeviceId
                    }
                }
            });
            if (checkReview) {
                const updateReview = yield exports.prisma.review.update({
                    where: {
                        userId_deviceId: {
                            userId: UserId,
                            deviceId: DeviceId
                        }
                    },
                    data: {
                        rating: rating,
                        description: review,
                    }
                });
                res.status(200).json(updateReview);
            }
            else {
                const Createreview = yield exports.prisma.review.create({
                    data: {
                        rating: rating,
                        description: review,
                        user: { connect: { id: UserId } },
                        device: { connect: { DeviceId: DeviceId } }
                    }
                });
                if (Createreview) {
                    console.log(Createreview);
                    res.status(200).json(Createreview);
                }
                else {
                    res.status(500);
                }
            }
        }));
        exports.router.post('/UserDashboard/:UserId/Cart/Clear', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { UserId } = req.params;
            try {
                yield exports.prisma.cart.deleteMany({
                    where: { userId: UserId }
                });
                const currentCart = yield exports.prisma.user.findUnique({
                    where: { id: UserId },
                    include: { CartDevices: true }
                });
                res.status(200).json({ message: "Cart Deleted", currentCart: currentCart });
            }
            catch (error) {
                console.error("Error clearing cart:", error);
                res.status(500).json({ error: "Failed to clear cart." });
            }
        }));
        exports.router.post("/dashboard/:UserId/create-checkout-session", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const products = req.body;
                const { UserId } = req.params;
                if (!Array.isArray(products) || products.length === 0) {
                    res.status(400).json({ error: "Invalid product data" });
                    return;
                }
                const lineItems = products.map((product) => {
                    var _a;
                    return ({
                        price_data: {
                            currency: "usd",
                            product_data: {
                                name: product.DeviceName,
                                images: ((_a = product.Images) === null || _a === void 0 ? void 0 : _a.length) > 0 ? [product.Images[0]] : [], // Use the first image
                            },
                            unit_amount: Math.round(Number(product.Price) * 100), // Convert to cents
                        },
                        quantity: Number(product.Quantity), // Ensure it's a number
                    });
                });
                const session = yield stripe.checkout.sessions.create({
                    payment_method_types: ["card"],
                    line_items: lineItems,
                    mode: "payment",
                    success_url: `http://localhost:5173/success/${UserId}/{CHECKOUT_SESSION_ID}`,
                    cancel_url: `http://localhost:5173/dashboard/${UserId}`,
                    metadata: { UserId }
                });
                res.json({ id: session.id });
            }
            catch (error) {
                console.error("Error creating Checkout Session:", error);
                res.status(500).json({ error: error.message });
            }
        }));
        exports.router.get('/transactionData/:sessionId', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { sessionId } = req.params;
            const data = yield exports.prisma.transaction.findUnique({
                where: { sessionId: sessionId }
            });
            if (data) {
                const User = yield exports.prisma.user.findUnique({
                    where: { id: data.userId }
                });
                if (User) {
                    console.log(data, User);
                    res.status(200).send({ data, User });
                }
            }
            ;
        }));
    });
}
main()
    .catch((e) => {
    console.error(e.message);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.prisma.$disconnect();
}));
