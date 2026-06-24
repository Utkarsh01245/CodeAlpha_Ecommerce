let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let token = localStorage.getItem('token');
let registerMode = false;

async function loadProducts() {
  const res = await fetch('/api/products');
  const products = await res.json();
  document.getElementById('products').innerHTML = products.map(p => `
    <div class="card">
      <div class="emoji">${p.image}</div>
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <strong>$${p.price.toFixed(2)}</strong>
      <button onclick='addToCart(${JSON.stringify(p)})'>Add to Cart</button>
    </div>
  `).join('');
}

function addToCart(p) {
  const item = cart.find(i => i.id === p.id);
  if (item) item.qty++;
  else cart.push({ id: p.id, name: p.name, price: p.price, qty: 1 });
  saveCart();
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  document.getElementById('cart-count').textContent =
    cart.reduce((s, i) => s + i.qty, 0);
}

function openCart() {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  document.getElementById('cart-items').innerHTML = cart.map(i =>
    `<div>${i.name} x${i.qty} — $${(i.price * i.qty).toFixed(2)}</div>`
  ).join('') || '<p>Cart is empty</p>';
  document.getElementById('cart-total').textContent = total.toFixed(2);
  document.getElementById('cart-modal').classList.remove('hidden');
}

async function checkout() {
  if (!token) return alert('Please log in first');
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const res = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    body: JSON.stringify({ items: cart, total })
  });
  const data = await res.json();
  if (data.orderId) {
    alert(`Order #${data.orderId} placed! Total: $${total.toFixed(2)}`);
    cart = []; saveCart(); closeModals();
  } else alert(data.error);
}

function openAuth() { document.getElementById('auth-modal').classList.remove('hidden'); }
function closeModals() {
  document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
}
function toggleAuthMode() {
  registerMode = !registerMode;
  document.getElementById('auth-title').textContent = registerMode ? 'Register' : 'Login';
}

async function submitAuth() {
  const body = {
    name: document.getElementById('auth-name').value,
    email: document.getElementById('auth-email').value,
    password: document.getElementById('auth-password').value
  };
  const url = registerMode ? '/api/auth/register' : '/api/auth/login';
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const data = await res.json();
  if (data.token) {
    token = data.token;
    localStorage.setItem('token', token);
    document.getElementById('user-info').textContent = `Hi, ${data.name}`;
    closeModals();
  } else {
    document.getElementById('auth-msg').textContent = data.error;
  }
}

loadProducts();
saveCart();
