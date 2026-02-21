/**
 * Portfolio Backend Server
 * ────────────────────────
 * Express API with optional MongoDB for storing contact-form submissions
 * and optional Nodemailer for sending confirmation emails.
 * Works in "demo mode" without MongoDB or email credentials.
 */

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import dns from 'dns';

// Force IPv4 for all DNS resolution (fixes Gmail SMTP ETIMEDOUT on IPv6)
dns.setDefaultResultOrder('ipv4first');

const app = express();
const PORT = process.env.PORT || 5000;

/* ──── Middleware ──── */
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, curl, etc.)
        if (!origin) return callback(null, true);
        // Allow any vercel.app subdomain, localhost, and the explicit FRONTEND_URL
        const allowed = [
            /\.vercel\.app$/,
            /localhost/,
        ];
        if (process.env.FRONTEND_URL) {
            allowed.push(new RegExp(process.env.FRONTEND_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
        }
        const isAllowed = allowed.some((pattern) => pattern.test(origin));
        callback(null, isAllowed || !process.env.FRONTEND_URL);
    },
    credentials: true,
}));
app.use(express.json());

/* ──── Optional MongoDB Connection ──── */
let Message = null;
let dbConnected = false;

async function connectDB() {
    const MONGO_URI = process.env.MONGODB_URI;
    if (!MONGO_URI) {
        console.log('⚠️  No MONGODB_URI set – running in demo mode (messages logged to console only)');
        return;
    }
    try {
        const mongoose = await import('mongoose');
        await mongoose.default.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 });
        console.log('✅ MongoDB connected');
        dbConnected = true;

        const messageSchema = new mongoose.default.Schema(
            {
                name: { type: String, required: true, trim: true },
                email: { type: String, required: true, trim: true },
                message: { type: String, required: true, trim: true },
            },
            { timestamps: true }
        );
        Message = mongoose.default.model('Message', messageSchema);
    } catch (err) {
        console.error('❌ MongoDB connection failed:', err.message);
        console.log('⚠️  Continuing in demo mode');
    }
}

/* ──── Optional Nodemailer Setup ──── */
let transporter = null;

async function setupEmail() {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log('⚠️  No EMAIL_USER/EMAIL_PASS set – email notifications disabled');
        return;
    }
    try {
        const nodemailer = await import('nodemailer');

        transporter = nodemailer.default.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: { rejectUnauthorized: false },
            connectionTimeout: 30000,
            greetingTimeout: 30000,
            socketTimeout: 30000,
        });

        // Verify the transporter can actually connect
        await transporter.verify();
        console.log('✅ Email transporter ready and verified');
    } catch (err) {
        console.error('❌ Email setup failed:', err.message);
        transporter = null; // Reset so we don't try to send with broken config
    }
}

/* ──── Routes ──── */

/** Health check */
app.get('/', (_req, res) => {
    res.json({
        status: 'ok',
        message: 'Portfolio API is running 🚀',
        mongodb: dbConnected ? 'connected' : 'demo mode',
    });
});

/** POST /api/contact – save message & optionally send email */
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Basic validation
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        console.log(`📩 New message from ${name} (${email}): ${message}`);

        // Save to MongoDB if available
        if (Message && dbConnected) {
            const newMessage = await Message.create({ name, email, message });
            console.log('💾 Saved to MongoDB:', newMessage._id);
        }

        // Send email if configured (non-blocking)
        if (transporter && process.env.EMAIL_USER) {
            try {
                await transporter.sendMail({
                    from: `"Abishake Portfolio" <${process.env.EMAIL_USER}>`,
                    to: process.env.EMAIL_USER,
                    replyTo: email,
                    subject: `New Portfolio Message from ${name}`,
                    html: `
            <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;background:#1e1b4b;color:#e2e8f0;border-radius:12px;">
              <h2 style="color:#818cf8;">📩 New Contact Message</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong></p>
              <p style="background:rgba(255,255,255,0.05);padding:16px;border-radius:8px;">${message}</p>
              <hr style="border-color:rgba(255,255,255,0.1);margin:20px 0;" />
              <p style="font-size:12px;color:#818cf8;">Sent from your portfolio website</p>
            </div>
          `,
                });
                console.log('📧 Confirmation email sent');
            } catch (emailErr) {
                console.error('⚠️ Email failed:', emailErr.message);
            }
        }

        res.status(201).json({
            success: true,
            message: 'Message received! I will get back to you soon.',
        });
    } catch (err) {
        console.error('❌ Contact error:', err.message);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
});

/* ──── Start Server ──── */
async function start() {
    await connectDB();
    await setupEmail();
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}

start();
