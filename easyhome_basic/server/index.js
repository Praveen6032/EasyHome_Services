const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { nanoid } = require('nanoid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Stripe = require('stripe');
const Razorpay = require('razorpay');

const STRIPE_KEY = process.env.STRIPE_KEY || '';
const RAZOR_KEY = process.env.RAZOR_KEY || '';
const RAZOR_SECRET = process.env.RAZOR_SECRET || '';
const stripe = STRIPE_KEY? Stripe(STRIPE_KEY) : null;
const razorInstance = (RAZOR_KEY && RAZOR_SECRET)? new Razorpay({key_id: RAZOR_KEY, key_secret: RAZOR_SECRET}) : null;
const path = require('path');
const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

// Serve frontend static files
app.use('/', express.static(path.join(__dirname, '..', 'public')));

// In-memory stores
let users = []; // {id,name,email,password,token}
let services = [
  {id:'salon',title:'Salon for Women',min_price:199,img:'https://img.freepik.com/free-photo/blonde-girl-getting-her-hair-done_23-2148108826.jpg?semt=ais_incoming&w=740&q=80'},
  {id:'spa',title:'Spa for Women',min_price:299,img:'https://plus.unsplash.com/premium_photo-1683134297492-cce5fc6dae31?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3BhfGVufDB8fDB8fHww'},
  {id:'massage',title:'Massage for Men',min_price:399,img:'https://img.freepik.com/free-photo/closeup-man-getting-head-massage-relaxing-with-eyes-closed-spa_637285-1721.jpg?semt=ais_incoming&w=740&q=80'},
  {id:'ac',title:'AC Repair',min_price:499,img:'https://www.shutterstock.com/image-photo/experienced-technician-inspecting-air-conditioning-600nw-2485364991.jpg'},
  {id:'clean',title:'Kitchen Cleaning',min_price:399,img:'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template,q_auto:low,f_auto/w_128,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1757512720453-11701e.jpeg'},
  {id:'painting',title:'Walls & Rooms Painting',min_price:599,img:'https://images.stockcake.com/public/e/6/3/e6355801-b4f1-41db-b73c-e3ec401c4884_large/room-painting-progress-stockcake.jpg'},
  {id:'plumbing',title:'Plumbing',min_price:299,img:'https://img.freepik.com/premium-photo/plumber-using-wrench-repair-water-pipe-sink_101448-3422.jpg?w=360'},
  {id:'electric',title:'Electrician',min_price:249,img:'https://www.shutterstock.com/image-photo/electrician-wiring-house-working-on-600nw-2505256693.jpg'},
  {id:'carpentry',title:'Carpentry',min_price:349,img:'https://5.imimg.com/data5/SELLER/Default/2022/11/PP/HH/FT/8825948/home-carpenter-service.jpg'},
  {id:'pest',title:'Pest Control',min_price:399,img:'https://thumbs.dreamstime.com/b/young-male-contractor-doing-pest-control-young-male-contractor-doing-pest-control-home-179381377.jpg'},
  {id:'sofa',title:'Sofa Cleaning',min_price:299,img:'https://cdn.pixabay.com/photo/2022/07/27/12/57/sofa-7347875_1280.jpg'},
  {id:'car',title:'Car Cleaning',min_price:199,img:'https://branfordcarwashandexpresslube.com/wp-content/uploads/2025/02/clean-car-vacuum-today-170814-tease.jpg'},
  {id:'appliance',title:'Appliance Repair',min_price:349,img:'https://i-media.vyaparify.com/vcards/blogs/79813/home-appliances-repairing.jpg'},
  {id:'garden',title:'Gardening',min_price:199,img:'https://agedcareguide-assets.imgix.net/news/articles/wp/guidegardening.jpg?fm=pjpg&w=700&format=auto&q=65'}
];
let bookings = []; // {id,service,name,phone,address,date,slot,status}

// Routes
app.get('/api/services', (req, res) => {
  res.json(services);
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if(!email || !password) return res.status(400).json({message:'email and password required'});
  if(users.find(u=>u.email===email)) return res.status(409).json({message:'User exists'});
  const id = 'U' + nanoid(6);
  const hashed = bcrypt.hashSync(password, 10);
  const verifyToken = nanoid(12);
  const user = { id, name: name || '', email, password: hashed, verified: false, verifyToken };
  users.push(user);
  // In production send verifyToken via email. Here we log it for demo.
  console.log('Verify token for', email, verifyToken);
  res.status(201).json({id: user.id, email: user.email, verifyToken});
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u=>u.email===email);
  if(!user) return res.status(401).json({message:'invalid credentials'});
  const ok = bcrypt.compareSync(password, user.password);
  if(!ok) return res.status(401).json({message:'invalid credentials'});
  const token = jwt.sign({id:user.id,email:user.email}, process.env.JWT_SECRET || 'dev_jwt_secret', {expiresIn:'7d'});
  user.token = token;
  res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});


// Email verification endpoint (demo)
app.post('/api/auth/verify', (req, res) => {
  const { token } = req.body;
  if(!token) return res.status(400).json({message:'token required'});
  const user = users.find(u => u.verifyToken === token);
  if(!user) return res.status(400).json({message:'invalid token'});
  user.verified = true;
  delete user.verifyToken;
  res.json({ok:true, message:'email verified'});
});

app.get('/api/auth/me', (req, res) => {
  const auth = req.headers['authorization'] || '';
  const token = auth.replace('Bearer ', '').trim();
  const user = users.find(u=>u.token===token);
  if(!user) return res.status(401).json({message:'not authenticated'});
  res.json({ id: user.id, name: user.name, email: user.email });
});


// Forgot password - generate reset token (demo: token logged)
app.post('/api/auth/forgot', (req, res) => {
  const { email } = req.body;
  if(!email) return res.status(400).json({message:'email required'});
  const user = users.find(u => u.email === email);
  if(!user) return res.status(404).json({message:'user not found'});
  const resetToken = nanoid(12);
  user.resetToken = resetToken;
  // In production send resetToken via email/SMS. Here, we log it.
  console.log('Password reset token for', email, resetToken);
  res.json({ok:true, resetToken});
});

// Reset password using token
app.post('/api/auth/reset', (req, res) => {
  const { token, newPassword } = req.body;
  if(!token || !newPassword) return res.status(400).json({message:'token and newPassword required'});
  const user = users.find(u => u.resetToken === token);
  if(!user) return res.status(400).json({message:'invalid token'});
  user.password = bcrypt.hashSync(newPassword, 10);
  delete user.resetToken;
  res.json({ok:true, message:'password reset'});
});

app.post('/api/bookings', (req, res) => {
  const { service, name, phone, address, date, slot } = req.body;
  if(!service || !name || !phone || !date) return res.status(400).json({message:'Missing fields'});
  const id = 'B' + nanoid(8);
  const booking = { id, service, name, phone, address, date, slot, status: 'pending', price: 499 };
  bookings.push(booking);
  res.json({ bookingId: id, amount: booking.price });
});

app.get('/api/bookings', (req, res) => {
  // simple mine=true returns all bookings (demo). In prod, filter by user.
  res.json(bookings);
});

app.get('/api/admin/bookings', (req, res) => {
  res.json(bookings);
});

// Simple toggle (admin)


// Stripe Checkout (test-mode). Provide STRIPE_KEY in .env to enable real sessions.
app.post('/api/payments/stripe-checkout', async (req, res) => {
  const { bookingId, amount, currency='INR' } = req.body;
  if(!stripe){
    return res.status(200).json({demo:true, url:null, message:'Stripe key missing on server. Set STRIPE_KEY in env to enable.'});
  }
  try{
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{price_data:{currency:currency,product_data:{name:'Booking '+bookingId},unit_amount: amount},quantity:1}],
      mode: 'payment',
      success_url: (req.headers.origin || '') + '/bookings.html',
      cancel_url: (req.headers.origin || '') + '/booking.html?service=cancelled'
    });
    res.json({url: session.url});
  }catch(e){ console.error(e); res.status(500).json({error:e.message}); }
});

// Razorpay order creation (test-mode). Provide RAZOR_KEY and RAZOR_SECRET to enable.
app.post('/api/payments/razorpay-order', async (req, res) => {
  const { bookingId, amount, currency='INR' } = req.body;
  if(!razorInstance){
    return res.status(200).json({demo:true, message:'Razorpay keys missing on server. Set RAZOR_KEY and RAZOR_SECRET in env to enable.'});
  }
  try{
    const order = await razorInstance.orders.create({amount: amount, currency: currency, receipt: 'rcpt_'+bookingId});
    res.json({order});
  }catch(e){ console.error(e); res.status(500).json({error:e.message}); }
});

app.post('/api/admin/bookings/:id/toggle', (req, res) => {
  const id = req.params.id;
  bookings = bookings.map(b => b.id === id ? { ...b, status: b.status === 'pending' ? 'confirmed' : 'pending' } : b);
  res.json({ ok:true });
});

// Fallback to frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, () => console.log('EasyHome server running on', PORT));
