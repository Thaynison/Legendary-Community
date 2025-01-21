// LOGIN SYSTEM
const CLIENT_ID = '1254263114619162734';
// const REDIRECT_URI = 'http://127.0.0.1:5500/dashboard.html';
const REDIRECT_URI = 'https://www.legendarycommunity.com.br/dashboard.html';

function loginWithDiscord() {
    window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=token&scope=identify`;
}

function redirecionarParaloja() {
    const username = document.getElementById('username').textContent;
    const userid = document.getElementById('userid').textContent;
    const avatar = document.getElementById('avatar').src;

  window.location.href = `loja.html?username=${encodeURIComponent(username)}&userid=${encodeURIComponent(userid)}&avatar=${encodeURIComponent(avatar)}`;
}

function redirecionarParaTermos() {
    const username = document.getElementById('username').textContent;
    const userid = document.getElementById('userid').textContent;
    const avatar = document.getElementById('avatar').src;

  window.location.href = `termos.html?username=${encodeURIComponent(username)}&userid=${encodeURIComponent(userid)}&avatar=${encodeURIComponent(avatar)}`;
}

function redirecionarParaInstalacoes() {
    const username = document.getElementById('username').textContent;
    const userid = document.getElementById('userid').textContent;
    const avatar = document.getElementById('avatar').src;

  window.location.href = `instalacoes.html?username=${encodeURIComponent(username)}&userid=${encodeURIComponent(userid)}&avatar=${encodeURIComponent(avatar)}`;
}

function redirecionarParaLaunchers() {
    const username = document.getElementById('username').textContent;
    const userid = document.getElementById('userid').textContent;
    const avatar = document.getElementById('avatar').src;

  window.location.href = `launchers.html?username=${encodeURIComponent(username)}&userid=${encodeURIComponent(userid)}&avatar=${encodeURIComponent(avatar)}`;
}

function redirecionarParaTexturePack() {
    const username = document.getElementById('username').textContent;
    const userid = document.getElementById('userid').textContent;
    const avatar = document.getElementById('avatar').src;

  window.location.href = `texturepack.html?username=${encodeURIComponent(username)}&userid=${encodeURIComponent(userid)}&avatar=${encodeURIComponent(avatar)}`;
}

function redirecionarParaTutoriais() {
    const username = document.getElementById('username').textContent;
    const userid = document.getElementById('userid').textContent;
    const avatar = document.getElementById('avatar').src;

  window.location.href = `tutoriais.html?username=${encodeURIComponent(username)}&userid=${encodeURIComponent(userid)}&avatar=${encodeURIComponent(avatar)}`;
}


function redirecionarParaModpack() {
    const username = document.getElementById('username').textContent;
    const userid = document.getElementById('userid').textContent;
    const avatar = document.getElementById('avatar').src;

  window.location.href = `modpack.html?username=${encodeURIComponent(username)}&userid=${encodeURIComponent(userid)}&avatar=${encodeURIComponent(avatar)}`;
}

function redirecionarParaVotar() {
    const username = document.getElementById('username').textContent;
    const userid = document.getElementById('userid').textContent;
    const avatar = document.getElementById('avatar').src;

  window.location.href = `votar.html?username=${encodeURIComponent(username)}&userid=${encodeURIComponent(userid)}&avatar=${encodeURIComponent(avatar)}`;
}

function redirecionarParaVotar() {
    const username = document.getElementById('username').textContent;
    const userid = document.getElementById('userid').textContent;
    const avatar = document.getElementById('avatar').src;

  window.location.href = `votar.html?username=${encodeURIComponent(username)}&userid=${encodeURIComponent(userid)}&avatar=${encodeURIComponent(avatar)}`;
}

function redirecionarParaDashboard() {
    const username = document.getElementById('username').textContent;
    const userid = document.getElementById('userid').textContent;
    const avatar = document.getElementById('avatar').src;

  window.location.href = `dashboard.html?username=${encodeURIComponent(username)}&userid=${encodeURIComponent(userid)}&avatar=${encodeURIComponent(avatar)}`;
}

function redirecionarParaPerfil() {
    const username = document.getElementById('username').textContent;
    const userid = document.getElementById('userid').textContent;
    const avatar = document.getElementById('avatar').src;

  window.location.href = `perfil.html?username=${encodeURIComponent(username)}&userid=${encodeURIComponent(userid)}&avatar=${encodeURIComponent(avatar)}`;
}

function CodigoPenalWithDiscord() {
    window.location.href = `relicario.html`;
}

// RARITY

function redirecionarParaIndex() {

window.location.href = `index.html`;
}

// RARITY

function redirecionarParaRarity() {
  const username = document.getElementById('username').textContent;
  const userid = document.getElementById('userid').textContent;
  const avatar = document.getElementById('avatar').src;

window.location.href = `rarity.html?username=${encodeURIComponent(username)}&userid=${encodeURIComponent(userid)}&avatar=${encodeURIComponent(avatar)}`;
}

// INFO BAN

function redirecionarParaInfoBan() {
  const username = document.getElementById('username').textContent;
  const userid = document.getElementById('userid').textContent;
  const avatar = document.getElementById('avatar').src;

window.location.href = `infoban.html?username=${encodeURIComponent(username)}&userid=${encodeURIComponent(userid)}&avatar=${encodeURIComponent(avatar)}`;
}

// INFO PUBLICAÇÕES

function redirecionarParaPublicacoes() {
  // const username = document.getElementById('username').textContent;
  // const userid = document.getElementById('userid').textContent;
  // const avatar = document.getElementById('avatar').src;

window.location.href = `posts.html`;
}

// PRODUTOS 

function redirecionarPara_vip_warrior() {
    const username = document.getElementById('username').textContent;
    const userid = document.getElementById('userid').textContent;
    const avatar = document.getElementById('avatar').src;

  window.location.href = `products/vip_warrior.html?username=${encodeURIComponent(username)}&userid=${encodeURIComponent(userid)}&avatar=${encodeURIComponent(avatar)}`;
}

function redirecionarPara_vip_wizzard() {
    const username = document.getElementById('username').textContent;
    const userid = document.getElementById('userid').textContent;
    const avatar = document.getElementById('avatar').src;

  window.location.href = `products/vip_wizzard.html?username=${encodeURIComponent(username)}&userid=${encodeURIComponent(userid)}&avatar=${encodeURIComponent(avatar)}`;
}

function redirecionarPara_vip_king() {
    const username = document.getElementById('username').textContent;
    const userid = document.getElementById('userid').textContent;
    const avatar = document.getElementById('avatar').src;

  window.location.href = `products/vip_king.html?username=${encodeURIComponent(username)}&userid=${encodeURIComponent(userid)}&avatar=${encodeURIComponent(avatar)}`;
}

function redirecionarPara_vip_eterno_30() {
    const username = document.getElementById('username').textContent;
    const userid = document.getElementById('userid').textContent;
    const avatar = document.getElementById('avatar').src;

  window.location.href = `products/vip_eterno_30.html?username=${encodeURIComponent(username)}&userid=${encodeURIComponent(userid)}&avatar=${encodeURIComponent(avatar)}`;
}

function redirecionarPara_vip_eterno_60() {
    const username = document.getElementById('username').textContent;
    const userid = document.getElementById('userid').textContent;
    const avatar = document.getElementById('avatar').src;

  window.location.href = `products/vip_eterno_60.html?username=${encodeURIComponent(username)}&userid=${encodeURIComponent(userid)}&avatar=${encodeURIComponent(avatar)}`;
}

function redirecionarPara_vip_eterno_90() {
    const username = document.getElementById('username').textContent;
    const userid = document.getElementById('userid').textContent;
    const avatar = document.getElementById('avatar').src;

  window.location.href = `products/vip_eterno_90.html?username=${encodeURIComponent(username)}&userid=${encodeURIComponent(userid)}&avatar=${encodeURIComponent(avatar)}`;
}

function redirecionarPara_vip_eterno() {
    const username = document.getElementById('username').textContent;
    const userid = document.getElementById('userid').textContent;
    const avatar = document.getElementById('avatar').src;

  window.location.href = `products/vip_eterno.html?username=${encodeURIComponent(username)}&userid=${encodeURIComponent(userid)}&avatar=${encodeURIComponent(avatar)}`;
}

function redirecionarPara_100000_money() {
    const username = document.getElementById('username').textContent;
    const userid = document.getElementById('userid').textContent;
    const avatar = document.getElementById('avatar').src;

  window.location.href = `products/100000_money.html?username=${encodeURIComponent(username)}&userid=${encodeURIComponent(userid)}&avatar=${encodeURIComponent(avatar)}`;
}

function redirecionarPara_500000_money() {
    const username = document.getElementById('username').textContent;
    const userid = document.getElementById('userid').textContent;
    const avatar = document.getElementById('avatar').src;

  window.location.href = `products/500000_money.html?username=${encodeURIComponent(username)}&userid=${encodeURIComponent(userid)}&avatar=${encodeURIComponent(avatar)}`;
}

function redirecionarPara_1000000_money() {
    const username = document.getElementById('username').textContent;
    const userid = document.getElementById('userid').textContent;
    const avatar = document.getElementById('avatar').src;

  window.location.href = `products/1000000_money.html?username=${encodeURIComponent(username)}&userid=${encodeURIComponent(userid)}&avatar=${encodeURIComponent(avatar)}`;
}

function redirecionarPara_5000000_money() {
    const username = document.getElementById('username').textContent;
    const userid = document.getElementById('userid').textContent;
    const avatar = document.getElementById('avatar').src;

  window.location.href = `products/5000000_money.html?username=${encodeURIComponent(username)}&userid=${encodeURIComponent(userid)}&avatar=${encodeURIComponent(avatar)}`;
}

function redirecionarPara_fly() {
    const username = document.getElementById('username').textContent;
    const userid = document.getElementById('userid').textContent;
    const avatar = document.getElementById('avatar').src;

  window.location.href = `products/fly.html?username=${encodeURIComponent(username)}&userid=${encodeURIComponent(userid)}&avatar=${encodeURIComponent(avatar)}`;
}

function redirecionarPara_bank() {
    const username = document.getElementById('username').textContent;
    const userid = document.getElementById('userid').textContent;
    const avatar = document.getElementById('avatar').src;

  window.location.href = `products/bank.html?username=${encodeURIComponent(username)}&userid=${encodeURIComponent(userid)}&avatar=${encodeURIComponent(avatar)}`;
}

function redirecionarPara_echest() {
    const username = document.getElementById('username').textContent;
    const userid = document.getElementById('userid').textContent;
    const avatar = document.getElementById('avatar').src;

  window.location.href = `products/echest.html?username=${encodeURIComponent(username)}&userid=${encodeURIComponent(userid)}&avatar=${encodeURIComponent(avatar)}`;
}

function redirecionarPara_craft() {
    const username = document.getElementById('username').textContent;
    const userid = document.getElementById('userid').textContent;
    const avatar = document.getElementById('avatar').src;

  window.location.href = `products/craft.html?username=${encodeURIComponent(username)}&userid=${encodeURIComponent(userid)}&avatar=${encodeURIComponent(avatar)}`;
}

function redirecionarPara_caixa_avancada() {
    const username = document.getElementById('username').textContent;
    const userid = document.getElementById('userid').textContent;
    const avatar = document.getElementById('avatar').src;

  window.location.href = `products/caixa_avancada.html?username=${encodeURIComponent(username)}&userid=${encodeURIComponent(userid)}&avatar=${encodeURIComponent(avatar)}`;
}

function redirecionarPara_caixa_drops() {
    const username = document.getElementById('username').textContent;
    const userid = document.getElementById('userid').textContent;
    const avatar = document.getElementById('avatar').src;

  window.location.href = `products/caixa_drops.html?username=${encodeURIComponent(username)}&userid=${encodeURIComponent(userid)}&avatar=${encodeURIComponent(avatar)}`;
}

function redirecionarParaSuporte() {
  const username = document.getElementById('username').textContent;
  const userid = document.getElementById('userid').textContent;
  const avatar = document.getElementById('avatar').src;

window.location.href = `suporte.html?username=${encodeURIComponent(username)}&userid=${encodeURIComponent(userid)}&avatar=${encodeURIComponent(avatar)}`;
}

function redirecionarPara_Painel_Inventory() {
  const username = document.getElementById('username').textContent;
  const userid = document.getElementById('userid').textContent;
  const avatar = document.getElementById('avatar').src;

window.location.href = `inventario.html?username=${encodeURIComponent(username)}&userid=${encodeURIComponent(userid)}&avatar=${encodeURIComponent(avatar)}`;
}


function redirecionarPara_PainelStaff() {
  const username = document.getElementById('username').textContent;
  const userid = document.getElementById('userid').textContent;
  const avatar = document.getElementById('avatar').src;
  fetch(`https://dash.legendarycommunity.com.br/api/api_staff1.php?userid=${userid}`)
      .then(response => response.json())
      .then(data => {
          if (data && data.length > 0) {
              const uuid = data[0].uuid;
              fetch(`https://dash.legendarycommunity.com.br/api/api_staff2.php?uuid=${uuid}`)
                  .then(response => response.json())
                  .then(data => {
                      if (data.is_fundador) {
                          window.location.href = `painelstaff.html?username=${encodeURIComponent(username)}&userid=${encodeURIComponent(userid)}&avatar=${encodeURIComponent(avatar)}`;
                      } else {
                          document.querySelector('.avisos4').style.display = 'flex';
                          setTimeout(function() {
                              document.querySelector('.avisos4').style.display = 'none';
                          }, 5000);
                      }
                  });
          }
      });
}

function redirecionarParaEquipeStaff() {
  const username = document.getElementById('username').textContent;
  const userid = document.getElementById('userid').textContent;
  const avatar = document.getElementById('avatar').src; 

window.location.href = `equipestaff.html?username=${encodeURIComponent(username)}&userid=${encodeURIComponent(userid)}&avatar=${encodeURIComponent(avatar)}`;
}

function redirecionarParaEquipeStaff2() {

  window.location.href = `equipestaff2.html`;
}

function redirecionarEcho() {

  window.location.href = `https://echo.ac/`;
}

function redirecionarOcean() {

  window.location.href = `https://anticheat.ac/`;
}

function redirecionarTempOff() {
  const username = document.getElementById('username').textContent;
  const userid = document.getElementById('userid').textContent;
  const avatar = document.getElementById('avatar').src;

  window.location.href = `tempoff.html?username=${encodeURIComponent(username)}&userid=${encodeURIComponent(userid)}&avatar=${encodeURIComponent(avatar)}`;
}

function redirecionarParaRegras() {
  const username = document.getElementById('username').textContent;
  const userid = document.getElementById('userid').textContent;
  const avatar = document.getElementById('avatar').src;

window.location.href = `regras.html?username=${encodeURIComponent(username)}&userid=${encodeURIComponent(userid)}&avatar=${encodeURIComponent(avatar)}`;
}

function redirecionarParaRegras2() {

window.location.href = `regras2.html`;
}