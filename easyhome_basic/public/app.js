
/* EasyHome frontend API wrapper (basic auth + booking) */
const API_BASE = '/api';
const AUTH_KEY = 'eh_token';

async function fetchApi(path, opts={}){
  const headers = opts.headers || {};
  const token = localStorage.getItem(AUTH_KEY);
  if(token) headers['Authorization'] = 'Bearer ' + token;
  if(!headers['Content-Type']) headers['Content-Type'] = 'application/json';
  opts.headers = headers;
  try{
    const res = await fetch(API_BASE + path, opts);
    const body = await res.json().catch(()=>null);
    return {status: res.status, body};
  }catch(e){ console.warn('API error', e); return {status:0, body:null, error:e}; }
}

// Auth
async function register(payload){ return await fetchApi('/auth/register', {method:'POST', body: JSON.stringify(payload)}); }
async function login(email, password){ const r = await fetchApi('/auth/login',{method:'POST', body: JSON.stringify({email,password})}); if(r && r.status===200 && r.body && r.body.token){ localStorage.setItem(AUTH_KEY, r.body.token); } return r; }
async function me(){ return await fetchApi('/auth/me'); }
async function logout(){ localStorage.removeItem(AUTH_KEY); window.location.href='index.html'; }

// Services & Bookings
async function fetchServices(){ const r = await fetchApi('/services'); if(r && r.status===200) return r.body; return []; }
async function createBooking(payload){ return await fetchApi('/bookings',{method:'POST', body: JSON.stringify(payload)}); }
async function getMyBookings(){ const r = await fetchApi('/bookings?mine=true'); if(r && r.status===200) return r.body; return []; }
async function getAllBookingsAdmin(){ const r = await fetchApi('/admin/bookings'); if(r && r.status===200) return r.body; return []; }

window.EHAPI = { register, login, me, logout, fetchServices, createBooking, getMyBookings, getAllBookingsAdmin, api: fetchApi };


// Payment helpers
async function createStripeCheckout(bookingId, amount){ const r = await fetch('/api/payments/stripe-checkout',{method:'POST',headers:{'Content-Type':'application/json'},body: JSON.stringify({bookingId, amount})}); return await r.json(); }
async function createRazorpayOrder(bookingId, amount){ const r = await fetch('/api/payments/razorpay-order',{method:'POST',headers:{'Content-Type':'application/json'},body: JSON.stringify({bookingId, amount})}); return await r.json(); }

window.EHAPI.createStripeCheckout = createStripeCheckout;
window.EHAPI.createRazorpayOrder = createRazorpayOrder;
