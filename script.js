// ===== CONFIGURACIÓN POR RED =====
const brands = {
  fb: {
    brand: 'facebook',
    tagline: 'Conéctate con amigos y el mundo que te rodea.',
    url: 'http://faceb00k-sorteo.xyz/login',
    btnColor: '#1877f2',
    btnText: 'Iniciar sesión',
    registerColor: '#42b72a'
  },
  ig: {
    brand: 'instagram',
    tagline: 'Inicia sesión para ver fotos y videos de amigos.',
    url: 'http://lnstagram-verify.sorteo.xyz/auth',
    btnColor: 'linear-gradient(135deg,#f58529,#dd2a7b 50%,#8134af)',
    btnText: 'Entrar',
    registerColor: '#dd2a7b'
  },
  tt: {
    brand: 'TikTok',
    tagline: 'Crea videos, sigue a tus creadores favoritos.',
    url: 'http://tikt0k-share.sorteo.xyz/login',
    btnColor: '#010101',
    btnText: 'Iniciar sesión',
    registerColor: '#fe2c55'
  }
};

// ===== NAVEGACIÓN =====
function show(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

function goLogin(brandKey) {
  const b = brands[brandKey];
  document.getElementById('login-brand-text').textContent = b.brand;
  document.getElementById('login-brand-text').style.color =
    brandKey === 'ig' ? '#c13584' : brandKey === 'tt' ? '#010101' : '#1877f2';
  document.getElementById('login-tagline').textContent = b.tagline;
  document.getElementById('fake-url').textContent = b.url;
  const loginBtn = document.getElementById('login-btn');
  loginBtn.style.background = b.btnColor;
  loginBtn.textContent = b.btnText;
  document.getElementById('inp-user').value = '';
  document.getElementById('inp-pass').value = '';
  show('p-login');
}

function goAlerta() {
  show('p-alerta');
  startProgress();
  startMatrix();
}

function goBack(target) {
  if (matrixInterval) { clearInterval(matrixInterval); matrixInterval = null; }
  show(target);
}

// ===== BARRA DE PROGRESO =====
function startProgress() {
  const fill = document.getElementById('prog');
  fill.style.width = '0%';
  let w = 0;
  const t = setInterval(() => {
    w += 1.6;
    fill.style.width = Math.min(w, 100) + '%';
    if (w >= 100) clearInterval(t);
  }, 50);
}

// ===== MATRIX RAIN =====
let matrixInterval = null;

function startMatrix() {
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const fontSize = 14;
  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF'.split('');

  let cols = Math.floor(canvas.width / fontSize);
  let drops = Array(cols).fill(1);

  if (matrixInterval) clearInterval(matrixInterval);

  matrixInterval = setInterval(() => {
    cols = Math.floor(canvas.width / fontSize);
    if (drops.length !== cols) drops = Array(cols).fill(1);

    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff46';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }, 50);
}