// routes/paymentRoutes.js

const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/create-order", async (req, res) => {
    const { amount, currency, receipt } = req.body;

    try {
        const options = {
            amount: amount * 100, // amount in smallest currency unit (paise for INR)
            currency: currency,
            receipt: receipt,
        };

        const order = await razorpay.orders.create(options);
        res.status(200).json({
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            key_id: process.env.RAZORPAY_KEY_ID, // Send key_id to the frontend
        });
    } catch (error) {
        console.error("Error in creating order:", error);
        res.status(500).json({
            success: false,
            message: "Unable to create order. Please try again.",
        });
    }
});

router.post("/verify-payment", (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);

    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === razorpay_signature) {
        res.status(200).json({
            success: true,
            message: "Payment verified successfully",
        });
    } else {
        res.status(400).json({
            success: false,
            message: "Payment verification failed",
        });
    }
});

module.exports = router;
