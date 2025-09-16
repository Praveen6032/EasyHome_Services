
EasyHome — Full-stack starter (Basic Auth + Booking Flow)

How to run locally:
1. Open a terminal and go to the server folder:
   cd easyhome_basic/server
2. Install dependencies:
   npm install
3. Start the server:
   node index.js
4. Open http://localhost:3000 in your browser

Notes:
- This is a demo starter. Users and bookings are stored in memory (volatile).
- For production: add hashed passwords, JWT, persistent DB (Mongo/Postgres), and payment integrations.


Server env (optional):
- JWT_SECRET=your_jwt_secret
- STRIPE_KEY=sk_test_xxx (optional for Stripe test)
- RAZOR_KEY=rzp_test_xxx (optional)
- RAZOR_SECRET=rzp_test_secret (optional)

If you set STRIPE_KEY or RAZOR keys, the payment endpoints will attempt to create real test-mode sessions/orders.


Additional pages:
- /forgot.html to request password reset (token logged to server console in demo)
- /reset.html to reset password with token
- /verify.html to verify email with token (token logged on registration)

Payments:
- To enable Stripe/Razorpay test integrations, set STRIPE_KEY, RAZOR_KEY, RAZOR_SECRET in server/.env and restart server.
- Booking flow supports optional payment selection at checkout (Stripe/Razorpay). If server not configured, demo messages will appear.
