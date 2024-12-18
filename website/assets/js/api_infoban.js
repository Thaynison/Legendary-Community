window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const username = params.get('username');
    const userid = params.get('userid');
    
    const cleanUserId = userid ? userid.replace(/\D/g, '') : null;

    console.log(cleanUserId);

    const avatar = params.get('avatar');
    document.getElementById('username').textContent = username;
    document.getElementById('username2').textContent = username;
    document.getElementById('userid').textContent = cleanUserId;
    document.getElementById('avatar').src = avatar;
    document.getElementById('avatar2').src = avatar;

    if (cleanUserId) {
        verificarBanimento(cleanUserId);
        getHistoricoBan(cleanUserId);
    } else {
        document.querySelector('.status-approved').innerHTML = '<p>ID de usuário não encontrado.</p>';
    }
});

function verificarBanimento(userid) {
    const apiUrl = `http://legendarycommunity.com.br:9955/dashboard/API/verificar_ban.php?userid=${userid}`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.banido) {
                document.querySelector('.status-approved').innerHTML = '<p class="status-approved" style="color: red";>ALLOWLIST BANIDA</p>';
                document.getElementById('ban-info').style.display = 'block';
            } else {
                document.querySelector('.status-approved').innerHTML = '<p class="status-approved" style="color: #a7288c";>ALLOWLIST APROVADA</p>';
            }
        })
        .catch(error => {
            console.error('Erro ao acessar a API:', error);
            document.querySelector('.status-approved').innerHTML = '<p>Erro ao verificar o status da conta.</p>';
        });
}

function getHistoricoBan(userid) {
    const apiUrl = `http://legendarycommunity.com.br:9955/dashboard/API/ban_verificado.php?userid=${userid}`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.querySelector('.banimento').innerHTML = `<p>${data.error}</p>`;
            } else {
                let htmlContent = '<table class="table is-fullwidth">';
                htmlContent += `<thead>
                                    <tr>
                                        <th>IP</th>
                                        <th>Discord</th>
                                        <th>Username</th>
                                        <th>Motivo</th>
                                        <th>Print</th>
                                    </tr>
                                </thead><tbody>`;
                
                // Verifique se "data" é um array
                if (Array.isArray(data)) {
                    data.forEach(bans => {
                        htmlContent += `<tr>
                                            <td>${bans.ip_ban}</td>
                                            <td>${bans.discord_ban}</td>
                                            <td>${bans.username}</td>
                                            <td>${bans.motivo}</td>
                                            <td><button class="eye-button" onclick="showImage('${bans.print}')">👁️</button></td>
                                        </tr>`;
                    });
                } else {
                    htmlContent += '<tr><td colspan="2">Nenhum ban encontrado.</td></tr>';
                }
                
                htmlContent += '</tbody></table>';
                document.querySelector('.banimento').innerHTML = htmlContent;
            }
        })
        .catch(error => {
            document.querySelector('.banimento').innerHTML = `<p>Erro ao carregar os dados. Tente novamente mais tarde.</p>`;
        });
}

// Função para exibir a imagem
function showImage(imageUrl) {
    // Cria um modal para mostrar a imagem
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '9999';

    // Cria a imagem
    const img = document.createElement('img');
    img.src = imageUrl;
    img.style.maxWidth = '90%';
    img.style.maxHeight = '90%';

    // Cria um botão para fechar o modal
    const closeButton = document.createElement('button');
    closeButton.innerText = 'Fechar';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.padding = '10px';
    closeButton.style.backgroundColor = 'white';
    closeButton.style.border = 'none';
    closeButton.style.cursor = 'pointer';

    // Adiciona o evento para fechar o modal
    closeButton.addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    // Adiciona a imagem e o botão de fechar ao modal
    modal.appendChild(img);
    modal.appendChild(closeButton);

    // Adiciona o modal ao body
    document.body.appendChild(modal);
}
