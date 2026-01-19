"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdminToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAdminToken = (req, res, next) => {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.AdminToken; // Get token from cookies
    if (!token) {
        console.log("No admin token found. Unauthorized.");
        res.status(401).json({ message: "Unauthorized - Please log in as Admin" });
        return;
    }
    try {
        const secretKey = "Thisisthejwtsecretfornow"; // Move to .env in production
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        console.log("Admin Token Verified:", decoded);
        next();
    }
    catch (error) {
        console.error("Token verification failed:", error);
        res.status(403).json({ message: "Forbidden - Invalid token" });
        return;
    }
};
exports.verifyAdminToken = verifyAdminToken;
//# sourceMappingURL=authMiddleware.js.map