window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const username = params.get('username');
    const userid = params.get('userid');
    const avatar = params.get('avatar');

    document.getElementById('username').textContent = username;
    document.getElementById('userid').textContent = userid;
    document.getElementById('avatar').src = avatar;

    if (userid) {
        getHistoricoTicketsSTAFF();
    } else {
        console.log("erro no userid")
    }

});

function getHistoricoTicketsSTAFF() {
    const apiUrl = `https://dash.legendarycommunity.com.br/api/api_tickets.php`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na API: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const container = document.querySelector('.form-list-tickets');

            if (data.error) {
                container.innerHTML = `<p class="error">${data.error}</p>`;
                return;
            }

            if (!Array.isArray(data) || data.length === 0) {
                container.innerHTML = `<p class="info">Nenhum ticket encontrado.</p>`;
                return;
            }

            // Função para mapear o status para emojis e títulos
            const getStatusInfo = (status) => {
                switch (status) {
                    case 'Concluido':
                        return { emoji: '✅', title: 'Ticket Concluído' };
                    case 'Reprovado':
                        return { emoji: '❌', title: 'Ticket Reprovado' };
                    case 'Em Analise':
                        return { emoji: '🔎', title: 'Ticket Em Análise' };
                    default:
                        return { emoji: '❓', title: 'Ticket Desconhecido' };
                }
            };

            let htmlContent = `
                <table class="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Descrição</th>
                            <th>Print</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            data.forEach(ticket => {
                const statusInfo = getStatusInfo(ticket.status);
                htmlContent += `
                    <tr>
                        <td>${ticket.id_ticket}</td>
                        <td>${ticket.username}</td>
                        <td>${ticket.descricao}</td>
                        <td>
                            <button class="eye-button" onclick="showImage('${ticket.print}', event)">👁️</button>
                        </td>
                        <td>
                            <span title="${statusInfo.title}">${statusInfo.emoji}</span>
                        </td>
                    </tr>`;
            });

            htmlContent += '</tbody></table>';
            container.innerHTML = htmlContent;
        })
        .catch(error => {
            const container = document.querySelector('.form-list-tickets');
            container.innerHTML = `<p class="error">Erro ao carregar os dados: ${error.message}</p>`;
        });
}


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
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.padding = '10px';
    closeButton.style.backgroundColor = 'white';
    closeButton.style.border = 'none';
    closeButton.style.cursor = 'pointer';
    closeButton.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    modal.appendChild(img);
    modal.appendChild(closeButton);
    document.body.appendChild(modal);
}

function changeContent(contentType) {
    var contentArea = document.getElementById("content-area");

    switch(contentType) {
        case 'register-ban':
            contentArea.innerHTML = `
                    <form class="form-register-ban">
                        <div class="form-field">
                            <label for="userid">Informar ID do Discord:</label>
                            <input type="text" id="userid" name="userid" placeholder="Digite o User ID" required>
                        </div>
                        <div class="form-field">
                            <label for="ip_ban">Informar IP Banido:</label>
                            <input type="text" id="ip_ban" name="ip_ban" placeholder="Digite o IP Banido" required>
                        </div>
                        <div class="form-field">
                            <label for="discord_ban">Informar Nome do Discord:</label>
                            <input type="text" id="discord_ban" name="discord_ban" placeholder="Digite o nome do Discord" required>
                        </div>
                        <div class="form-field">
                            <label for="username">Informar Nome do Minecraft:</label>
                            <input type="text" id="username" name="username" placeholder="Digite o nome do Minecraft" required>
                        </div>
                        <div class="form-field">
                            <label for="print">Informar Link do Print:</label>
                            <input type="url" id="print" name="print" placeholder="Cole o link do print" required>
                        </div>
                        <div class="form-field">
                            <label for="motivo">Informar Motivo do Banimento:</label>
                            <textarea id="motivo" name="motivo" placeholder="Descreva o motivo do banimento" rows="4" required></textarea>
                        </div>
                        <button type="submit" class="button is-primary">Registrar Banumento</button>
                    </form>
            `;
            const form = document.querySelector('.form-register-ban');
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                const formData = new FormData(form);
                fetch('https://dash.legendarycommunity.com.br/api/api_registrar_ban.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        document.querySelector('.avisos5').style.display = 'flex';
                        setTimeout(function() {
                            document.querySelector('.avisos5').style.display = 'none';
                        }, 5000);
                        form.reset();
                    } else if (data.error) {
                        document.querySelector('.avisos4').style.display = 'flex';
                        setTimeout(function() {
                            document.querySelector('.avisos4').style.display = 'none';
                        }, 5000);
                        form.reset();
                    }
                })
                .catch(error => {
                    document.querySelector('.avisos4').style.display = 'flex';
                    setTimeout(function() {
                        document.querySelector('.avisos4').style.display = 'none';
                    }, 5000);
                    form.reset();
                });
            });
            break;
        case 'register-sale':
            contentArea.innerHTML = `
                    <form class="form-register-sale">
                        <div class="form-field">
                            <label for="username">Informar Nome do Minecraft:</label>
                            <input type="text" id="username" name="username" placeholder="Digite o nome do Minecraft" required>
                        </div>
                        <div class="form-field">
                            <label for="userid">Informar ID do Discord:</label>
                            <input type="text" id="userid" name="userid" placeholder="Digite o User ID do Discord" required>
                        </div>
                        <div class="form-field">
                            <label for="codigo">Codigo do Produto:</label>
                            <input type="text" id="codigo" name="codigo" placeholder="Digite o codigo do Produto" required>
                        </div>
                        <div class="form-field">
                            <label for="produto">Informar Nome do Produto:</label>
                            <input type="text" id="produto" name="produto" placeholder="Digite o nome do Produto" required>
                        </div>
                        <div class="form-field">
                            <label for="valor">Informar Valor do Produto:</label>
                            <input type="number" id="valor" name="valor" placeholder="Digite o valor do Produto" required>
                        </div>
                        <div class="form-field">
                            <label for="data_compra">Informar Data da Compra:</label>
                            <input type="date" id="data_compra" name="data_compra" placeholder="Digite a data da Compra" required>
                        </div>
                        <button type="submit" class="button is-primary">Registrar Venda</button>
                    </form>
            `;
            const form2 = document.querySelector('.form-register-sale');
            form2.addEventListener('submit', function(event) {
                event.preventDefault();
                const formData = new FormData(form2);
                fetch('https://dash.legendarycommunity.com.br/api/api_registrar_venda.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        document.querySelector('.avisos5').style.display = 'flex';
                        setTimeout(function() {
                            document.querySelector('.avisos5').style.display = 'none';
                        }, 5000);
                        form2.reset();
                    } else if (data.error) {
                        document.querySelector('.avisos4').style.display = 'flex';
                        setTimeout(function() {
                            document.querySelector('.avisos4').style.display = 'none';
                        }, 5000);
                        form2.reset();
                    }
                })
                .catch(error => {
                    document.querySelector('.avisos4').style.display = 'flex';
                    setTimeout(function() {
                        document.querySelector('.avisos4').style.display = 'none';
                    }, 5000);
                    form2.reset();
                });
            });
            break;
        case 'list-tickets':
            contentArea.innerHTML = `
                <form class="form-list-tickets">
                    <p>Carregando histórico de tickets...</p>
                </form>`;
            getHistoricoTicketsSTAFF();
            break;
        case 'create-post':
            contentArea.innerHTML = "<h2>Criar Publicação</h2><p>Informações Em Breve.</p>";
            break;
        default:
            contentArea.innerHTML = "<p>Escolha uma opção.</p>";
    }
}