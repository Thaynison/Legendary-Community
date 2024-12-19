window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const username = params.get('username');
    const userid = params.get('userid');
    const avatar = params.get('avatar');
    document.getElementById('username').textContent = username;
    document.getElementById('username2').textContent = username;
    document.getElementById('userid').textContent = userid;
    document.getElementById('userid2').textContent = userid;
    document.getElementById('avatar').src = avatar;
    document.getElementById('avatar2').src = avatar;

    document.getElementById('userid2').value = userid;

    if (userid) {
        getHistoricoTickets(userid);
    } else {
        console.log("erro no userid")
    }
});

function getHistoricoTickets(userid) {
    const apiUrl = `https://dash.legendarycommunity.com.br/api/ticks_verificado.php?userid=${userid}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.querySelector('.form-lista-de-ticket').innerHTML = `<p>${data.error}</p>`;
            } else {

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

                let htmlContent = '<table class="table is-fullwidth">';
                htmlContent += `<thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Username</th>
                                        <th>Descrição</th>
                                        <th>Print</th>
                                    </tr>
                                </thead><tbody>`;

                if (Array.isArray(data)) {
                    data.forEach(tickets => {
                        const statusInfo = getStatusInfo(ticket.status);
                        htmlContent += `<tr>
                                            <td>${tickets.id_ticket}</td>
                                            <td>${tickets.username}</td>
                                            <td>${tickets.descricao}</td>
                                            <td><button class="eye-button" onclick="showImage('${tickets.print}', event)">👁️</button></td>
                                            <td>
                                                <span title="${statusInfo.title}">${statusInfo.emoji}</span>
                                            </td>
                                        </tr>`;
                    });
                } else {
                    htmlContent += '<tr><td colspan="2">Nenhum ban encontrado.</td></tr>';
                }

                htmlContent += '</tbody></table>';
                document.querySelector('.form-lista-de-ticket').innerHTML = htmlContent;
            }
        })
        .catch(error => {
            document.querySelector('.form-lista-de-ticket').innerHTML = `<p>Erro ao carregar os dados. Tente novamente mais tarde.</p>`;
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
        case 'register-ticket':
            contentArea.innerHTML = `
                <form class="form-register-ticket">
                    <div class="form-field">
                        <label for="userid">Informar ID Account Discord:</label>
                        <input type="text" id="userid" name="userid" placeholder="Digite o User ID do Discord" required>
                    </div>
                    <div class="form-field">
                        <label for="username">Informar Nome do Minecraft:</label>
                        <input type="text" id="username" name="username" placeholder="Digite o nome do Minecraft" required>
                    </div>
                    <div class="form-field">
                        <label for="descricao">Informar Descrição do Ticket:</label>
                        <textarea id="descricao" name="descricao" placeholder="Informar Descrição do Ticket" required></textarea>
                    </div>
                    <div class="form-field">
                        <label for="print">Anexar Print:</label>
                        <input type="url" id="print" name="print" placeholder="Anexar Print" required>
                    </div>
                    <button type="submit" class="button is-primary">Abrir Ticket</button>
                </form>
            `;
            const form2 = document.querySelector('.form-register-ticket');
            form2.addEventListener('submit', function(event) {
                event.preventDefault();
                const formData = new FormData(form2);
                fetch('https://dash.legendarycommunity.com.br/api/api_registrar_ticket.php', {
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
        case 'lista-de-ticket':
            contentArea.innerHTML = `
                <form class="form-lista-de-ticket">
                    <p>Carregando histórico de tickets...</p>
                </form>
            `;
            // Garantir que os tickets sejam carregados quando o conteúdo for trocado
            const userid = document.getElementById('userid2').textContent;
            if (userid) {
                getHistoricoTickets(userid);
            }
            break;
        case 'create-post':
            contentArea.innerHTML = "<h2>Criar Publicação</h2><p>Informações Em Breve.</p>";
            break;
        default:
            contentArea.innerHTML = "<p>Escolha uma opção.</p>";
    }
}
