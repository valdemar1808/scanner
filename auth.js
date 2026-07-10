// ===== Общая простая авторизация (для внутреннего инструмента) =====
// Три пользователя, логин и пароль совпадают.
const USERS = ["admin1", "admin2", "admin3"];

function currentUser(){
  return sessionStorage.getItem('wh_user');
}

function requireLogin(onReady){
  const existing = currentUser();
  if(existing){ onReady(existing); return; }
  renderLoginScreen(onReady);
}

function renderLoginScreen(onReady){
  const overlay = document.createElement('div');
  overlay.id = 'loginOverlay';
  overlay.style.cssText = `
    position:fixed; inset:0; background:#10151c; z-index:9999;
    display:flex; align-items:center; justify-content:center; padding:20px;
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;`;
  overlay.innerHTML = `
    <div style="width:100%; max-width:340px; background:#1a212b; border:1px solid #2c3644; border-radius:16px; padding:26px;">
      <div style="text-align:center; margin-bottom:18px;">
        <div style="display:inline-block; font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:#ff8a3d; background:rgba(255,138,61,.12); border:1px solid rgba(255,138,61,.35); padding:4px 10px; border-radius:999px; margin-bottom:10px;">Вход</div>
        <h1 style="color:#eef1f5; font-size:19px; margin:0;">Учёт оборудования</h1>
      </div>
      <label style="display:block; font-size:12px; text-transform:uppercase; color:#8b96a5; margin-bottom:6px;">Логин</label>
      <input id="loginUser" style="width:100%; padding:12px; border-radius:10px; border:1px solid #2c3644; background:#212a36; color:#eef1f5; font-size:15px; margin-bottom:14px; box-sizing:border-box;" placeholder="admin1" autocomplete="username">
      <label style="display:block; font-size:12px; text-transform:uppercase; color:#8b96a5; margin-bottom:6px;">Пароль</label>
      <input id="loginPass" type="password" style="width:100%; padding:12px; border-radius:10px; border:1px solid #2c3644; background:#212a36; color:#eef1f5; font-size:15px; margin-bottom:16px; box-sizing:border-box;" placeholder="••••••" autocomplete="current-password">
      <div id="loginErr" style="color:#ff5d5d; font-size:13px; margin-bottom:12px; display:none;">Неверный логин или пароль</div>
      <button id="loginBtn" style="width:100%; background:#ff8a3d; color:#1a1206; border:none; padding:13px; border-radius:12px; font-weight:700; font-size:15px; cursor:pointer;">Войти</button>
    </div>`;
  document.body.appendChild(overlay);

  function tryLogin(){
    const u = document.getElementById('loginUser').value.trim();
    const p = document.getElementById('loginPass').value.trim();
    const err = document.getElementById('loginErr');
    if(USERS.includes(u) && u === p){
      sessionStorage.setItem('wh_user', u);
      overlay.remove();
      onReady(u);
    } else {
      err.style.display = 'block';
    }
  }
  document.getElementById('loginBtn').addEventListener('click', tryLogin);
  overlay.querySelectorAll('input').forEach(inp=>{
    inp.addEventListener('keydown', e=>{ if(e.key === 'Enter') tryLogin(); });
  });
}

function logout(){
  sessionStorage.removeItem('wh_user');
  location.reload();
}

function renderUserBadge(containerId){
  const el = document.getElementById(containerId);
  if(!el) return;
  el.innerHTML = `<span style="color:#8b96a5;">Вы вошли как</span> <b style="color:#eef1f5;">${currentUser()}</b> · <a href="#" id="logoutLink" style="color:#ff8a3d; text-decoration:none; border-bottom:1px dashed #ff8a3d;">выйти</a>`;
  document.getElementById('logoutLink').addEventListener('click', e=>{ e.preventDefault(); logout(); });
}
