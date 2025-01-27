//
//  COPIAR IP
//
var ip = document.querySelector('#ip');
var ipSpan = ip.querySelector('span');
var ipTextarea = ip.querySelector('textarea');
ip.addEventListener('click', function () {
  ip.classList.add('is-active');
  setTimeout(() => {
    ip.classList.remove('is-active');
  }, 1500);

  ipTextarea.classList.add('is-active');
  ipTextarea.value = ipSpan.innerHTML;
  ipTextarea.select();
  ipTextarea.setSelectionRange(0, 99999);
  document.execCommand("copy");
  ipTextarea.classList.remove('is-active');
});

//
//  STATUS DO SERVIDOR
//
$.getJSON('https://api.minetools.eu/ping/' + ipSpan.innerText + '/10119', function(data) {
  if (data.error) {
    $('#status').html('<i class="fas fa-times"></i> Servidor offline');
    $('#motd').html('-');
    $('#online').html('-');
    $('#players-list').html('<p>Não foi possível obter os jogadores.</p>');
  } else {
    $('#status').html('<i class="fas fa-check"></i> Servidor online');
    $('#motd').html(data.description.replace(/§(.+?)/gi, ''));
    $('#online').html(data.players.online);

    // Renderizar lista de jogadores
    if (data.players.sample) {
      let playerNames = data.players.sample.map(player => `
        <li>
          <img src="http://cravatar.eu/head/${player.name}/128.png" alt="${player.name}">
          <h1>${player.name}</h1>
          <h2 class="cor-a">Membro</h2>
        </li>
      `).join('');
      $('#players-list').html(playerNames);
    } else {
      $('#players-list').html('<p>Nenhum jogador online no momento.</p>');
    }
  }
});



//
//  MENU MOBILE
//
$('.navbar-burger').on('click', function() {
  document.querySelector('.navbar-menu').classList.toggle('is-active');
});