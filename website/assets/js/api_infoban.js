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
    const apiUrl = `https://dash.legendarycommunity.com.br/api/verificar_ban.php?userid=${userid}`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.banido) {
                document.querySelector('.status-approved').innerHTML = '<p class="status-approved" style="color: red";>ALLOWLIST BANIDA</p>';
                document.getElementById('ban-info').style.display = 'block';
            } else {
                document.querySelector('.status-approved').innerHTML = '<p class="status-approved">ALLOWLIST APROVADA</p>';
            }
        })
        .catch(error => {
            console.error('Erro ao acessar a API:', error);
            document.querySelector('.status-approved').innerHTML = '<p>Erro ao verificar o status da conta.</p>';
        });
}

function getHistoricoBan(userid) {
    const apiUrl = `https://dash.legendarycommunity.com.br/api/ban_verificado.php?userid=${userid}`;
    
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
    event.preventDefault();
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

    const img = document.createElement('img');
    img.src = imageUrl;
    img.style.maxWidth = '90%';
    img.style.maxHeight = '90%';

    const closeButton = document.createElement('button');
    closeButton.innerText = 'Fechar';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '20px';
    closeButton.style.right = '20px';
    closeButton.style.padding = '10px 20px';
    closeButton.style.backgroundColor = '#ff69b4'; // Fundo rosa
    closeButton.style.color = 'white'; // Cor da fonte branca
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '8px';
    closeButton.style.fontSize = '16px';
    closeButton.style.fontWeight = 'bold';
    closeButton.style.cursor = 'pointer';
    closeButton.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
    closeButton.style.transition = 'background-color 0.3s ease, transform 0.2s ease';

    closeButton.addEventListener('mouseover', () => {
        closeButton.style.backgroundColor = '#ff85c1'; // Tom mais claro ao passar o mouse
    });
    closeButton.addEventListener('mouseout', () => {
        closeButton.style.backgroundColor = '#ff69b4'; // Retorna ao fundo original
    });
    closeButton.addEventListener('mousedown', () => {
        closeButton.style.transform = 'scale(0.95)'; // Efeito de clique
    });
    closeButton.addEventListener('mouseup', () => {
        closeButton.style.transform = 'scale(1)'; // Volta ao tamanho original
    });

    closeButton.addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    modal.appendChild(img);
    modal.appendChild(closeButton);
    document.body.appendChild(modal);
}
