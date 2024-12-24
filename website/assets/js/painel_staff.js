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
        getHistoricoDevolutionsSTAFF();
        getHistoricoEmprestimosSTAFF();
        getHistoricoAdvertenciaSTAFF();
        getHistoricoBansSTAFF();
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

function getHistoricoDevolutionsSTAFF() {
    const apiUrl = `https://dash.legendarycommunity.com.br/api/api_buscar_devolution.php`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na API: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const container = document.querySelector('.form-list-devolutions');

            if (data.error) {
                container.innerHTML = `<p class="error">${data.error}</p>`;
                return;
            }

            if (!Array.isArray(data) || data.length === 0) {
                container.innerHTML = `<p class="info">Nenhuma devolução encontrado.</p>`;
                return;
            }

            // Função para mapear o status para emojis e títulos
            const getStatusInfoDevolucao = (status) => {
                switch (status) {
                    case 'Concluido':
                        return { emoji: '✅', title: 'Devolução Concluída' };
                    case 'Reprovado':
                        return { emoji: '❌', title: 'Devolução Reprovada' };
                    case 'Em Analise':
                        return { emoji: '🔎', title: 'Devolução Em Análise' };
                    default:
                        return { emoji: '❓', title: 'Devolução Desconhecida' };
                }
            };

            let htmlContent = `
                <table class="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>ID Ticket</th>
                            <th>Username</th>
                            <th>Descrição</th>
                            <th>Print</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            data.forEach(devolucao => {
                const statusInfodevolucao = getStatusInfoDevolucao(devolucao.status);
                htmlContent += `
                    <tr>
                        <td>${devolucao.id_ticket}</td>
                        <td>${devolucao.username}</td>
                        <td>${devolucao.descricao}</td>
                        <td>
                            <button class="eye-button" onclick="showImageDevolution('${devolucao.print}', event)">👁️</button>
                        </td>
                        <td>
                            <span title="${statusInfodevolucao.title}">${statusInfodevolucao.emoji}</span>
                        </td>
                    </tr>`;
            });

            htmlContent += '</tbody></table>';
            container.innerHTML = htmlContent;
        })
        .catch(error => {
            const container = document.querySelector('.form-list-devolutions');
            container.innerHTML = `<p class="error">Erro ao carregar os dados: ${error.message}</p>`;
        });
}

function getHistoricoEmprestimosSTAFF() {
    const apiUrl = `https://dash.legendarycommunity.com.br/api/api_buscar_emprestimo.php`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na API: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const container = document.querySelector('.form-list-emprestimo');

            if (data.error) {
                container.innerHTML = `<p class="error">${data.error}</p>`;
                return;
            }

            if (!Array.isArray(data) || data.length === 0) {
                container.innerHTML = `<p class="info">Nenhuma devolução encontrada.</p>`;
                return;
            }

            // Função para mapear o status para emojis e títulos
            const getStatusInfoEmprestimo = (status) => {
                switch (status) {
                    case 'Empréstimo Pago':
                        return { emoji: '✅', title: 'Empréstimo Pago' };
                    case 'Empréstimo Cancelado':
                        return { emoji: '❌', title: 'Empréstimo Cancelado' };
                    case 'Empréstimo Em Pagamento':
                        return { emoji: '🧭', title: 'Empréstimo Em Pagamento' };
                    default:
                        return { emoji: '❓', title: 'Empréstimo Desconhecido' };
                }
            };

            // Função para formatar valores em BRL
            const formatarBRL = (valor) => {
                return new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(valor);
            };

            let htmlContent = `
                <table class="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>Agiota</th>
                            <th>Cidadão</th>
                            <th>Valor</th>
                            <th>Parcelas</th>
                            <th>Parcelas Pg</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            data.forEach(emprestimo => {
                const statusInfoEmprestimo = getStatusInfoEmprestimo(emprestimo.status);
                htmlContent += `
                    <tr>
                        <td>${emprestimo.agiota}</td>
                        <td>${emprestimo.username}</td>
                        <td>${formatarBRL(emprestimo.price)}</td>
                        <td>${emprestimo.parcelas}</td>
                        <td>${emprestimo.parcelas_pagas}</td>
                        <td>
                            <span title="${statusInfoEmprestimo.title}">${statusInfoEmprestimo.emoji}</span>
                        </td>
                    </tr>`;
            });

            htmlContent += '</tbody></table>';
            container.innerHTML = htmlContent;
        })
        .catch(error => {
            const container = document.querySelector('.form-list-emprestimo');
            container.innerHTML = `<p class="error">Erro ao carregar os dados: ${error.message}</p>`;
        });
}

function getHistoricoAdvertenciaSTAFF() {
    const apiUrl = `https://dash.legendarycommunity.com.br/api/api_buscar_advertencia.php`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na API: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const container = document.querySelector('.form-list-advertencia');

            if (data.error) {
                container.innerHTML = `<p class="error">${data.error}</p>`;
                return;
            }

            if (!Array.isArray(data) || data.length === 0) {
                container.innerHTML = `<p class="info">Nenhuma advertência encontrada.</p>`;
                return;
            }

            // Função para mapear o status para emojis e títulos
            const getStatusInfoAdvertencia = (status) => {
                switch (status) {
                    case 'Advertência 1x':
                        return { emoji: '1️⃣', title: 'Advertência 1x' };
                    case 'Advertência 2x':
                        return { emoji: '2️⃣', title: 'Advertência 2x' };
                    case 'Advertência 3x':
                        return { emoji: '3️⃣', title: 'Advertência 3x' };
                    default:
                        return { emoji: '❓', title: 'Advertência Desconhecido' };
                }
            };

            let htmlContent = `
                <table class="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>ID Ticket</th>
                            <th>Nick</th>
                            <th>Descrição</th>
                            <th>Regra</th>
                            <th>Data</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            data.forEach(advertencia => {
                const statusInfoAdvertencia = getStatusInfoAdvertencia(advertencia.status);
                htmlContent += `
                    <tr>
                        <td>${advertencia.id_ticket}</td>
                        <td>${advertencia.username}</td>
                        <td>${advertencia.descricao}</td>
                        <td>${advertencia.regra}</td>
                        <td>${advertencia.data}</td>
                        <td>
                            <span title="${statusInfoAdvertencia.title}">${statusInfoAdvertencia.emoji}</span>
                        </td>
                    </tr>`;
            });

            htmlContent += '</tbody></table>';
            container.innerHTML = htmlContent;
        })
        .catch(error => {
            const container = document.querySelector('.form-list-advertencia');
            container.innerHTML = `<p class="error">Erro ao carregar os dados: ${error.message}</p>`;
        });
}

function getHistoricoBansSTAFF() {
    const apiUrl = `https://dash.legendarycommunity.com.br/api/api_buscar_ban.php`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na API: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const container = document.querySelector('.form-list-ban');

            if (data.error) {
                container.innerHTML = `<p class="error">${data.error}</p>`;
                return;
            }

            if (!Array.isArray(data) || data.length === 0) {
                container.innerHTML = `<p class="info">Nenhum ban encontrado.</p>`;
                return;
            }

            let htmlContent = `
                <table class="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>IP Ban</th>
                            <th>Nick</th>
                            <th>Descrição</th>
                            <th>Print</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            data.forEach(ban => {
                htmlContent += `
                    <tr>
                        <td>${ban.ip_ban}</td>
                        <td>${ban.username}</td>
                        <td>${ban.motivo}</td>
                        <td><button class="eye-button" onclick="showImageBan('${ban.print}', event)">👁️</button></td>
                    </tr>`;
            });

            htmlContent += '</tbody></table>';
            container.innerHTML = htmlContent;
        })
        .catch(error => {
            const container = document.querySelector('.form-list-ban');
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


function showImageDevolution(imageUrl) {
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

function showImageBan(imageUrl) {
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
                        <button type="submit" class="button is-primary" id="submitBtn2">Registrar Banimento</button>
                    </form>
            `;
            const form = document.querySelector('.form-register-ban');
            const submitBtn2 = document.getElementById('submitBtn2');
            let isSubmitting2 = false;  // Flag to prevent multiple submissions

            form.addEventListener('submit', function(event) {
                event.preventDefault();

                // Prevent multiple submissions
                if (isSubmitting2) return;

                isSubmitting2 = true;  // Set flag to true
                submitBtn2.disabled = true;  // Disable the submit button to prevent multiple clicks
                                
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
                })
                .finally(() => {
                    isSubmitting2 = false;  // Reset flag
                    submitBtn2.disabled = false;  // Re-enable the submit button
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
                        <button type="submit" class="button is-primary" id="submitBtn3">Registrar Venda</button>
                    </form>
            `;
            const form2 = document.querySelector('.form-register-sale');
            const submitBtn3 = document.getElementById('submitBtn3');
            let isSubmitting3 = false;  // Flag to prevent multiple submissions

            form2.addEventListener('submit', function(event) {
                event.preventDefault();

                // Prevent multiple submissions
                if (isSubmitting3) return;

                isSubmitting3 = true;  // Set flag to true
                submitBtn3.disabled = true;  // Disable the submit button to prevent multiple clicks

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
                })
                .finally(() => {
                    isSubmitting3 = false;  // Reset flag
                    submitBtn3.disabled = false;  // Re-enable the submit button
                });
            });
            break;
        case 'register-rarity':
            contentArea.innerHTML = `
                <form class="form-register-rarity">
                    <div class="form-field">
                        <label for="item">Informar Nome do Item:</label>
                        <input type="text" id="item" name="item" placeholder="Digite o Nome do Item" required>
                    </div>
                    <div class="form-field">
                        <label for="lore">Informar Lore do Item:</label>
                        <textarea id="lore" name="lore" placeholder="Digite a Lore do Item" rows="10" required></textarea>
                    </div>
                    <div class="form-field">
                        <label for="price">Informar Valor do Item:</label>
                        <input type="number" id="price" name="price" placeholder="Digite o valor do Item" required>
                    </div>
                    <div class="form-field">
                        <label for="print">Informar Print do Item:</label>
                        <input type="url" id="print" name="print" placeholder="Insira a Print do Item" required>
                    </div>
                    <div class="form-field">
                        <label for="rarity">Selecionar Raridade:</label>
                        <select id="rarity" name="rarity" required>
                            <option value="Comum">Comum</option>
                            <option value="Raro">Raro</option>
                            <option value="Épico">Épico</option>
                            <option value="Lendário">Lendário</option>
                            <option value="Divino">Divino</option>
                        </select>
                    </div>
                    <button type="submit" class="button is-primary" id="submitBtn">Criar Rarity</button>
                </form>
            `;
            const form3 = document.querySelector('.form-register-rarity');
            const submitBtn = document.getElementById('submitBtn');
            let isSubmitting = false;  // Flag to prevent multiple submissions

            form3.addEventListener('submit', function(event) {
                event.preventDefault();


                // Prevent multiple submissions
                if (isSubmitting) return;

                isSubmitting = true;  // Set flag to true
                submitBtn.disabled = true;  // Disable the submit button to prevent multiple clicks
        
                                
                const formData = new FormData(form3);
                fetch('https://dash.legendarycommunity.com.br/api/api_registrar_rarity.php', {
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
                        form3.reset();
                    } else if (data.error) {
                        document.querySelector('.avisos4').style.display = 'flex';
                        setTimeout(function() {
                            document.querySelector('.avisos4').style.display = 'none';
                        }, 5000);
                        form3.reset();
                    }
                })
                .catch(error => {
                    document.querySelector('.avisos4').style.display = 'flex';
                    setTimeout(function() {
                        document.querySelector('.avisos4').style.display = 'none';
                    }, 5000);
                    form3.reset();
                })
                .finally(() => {
                    isSubmitting = false;  // Reset flag
                    submitBtn.disabled = false;  // Re-enable the submit button
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
            contentArea.innerHTML = `
                <form class="form-create-post">
                    <div class="form-field">
                        <label for="titulo">Informar Tituto da Publicação:</label>
                        <input type="text" id="titulo" name="titulo" placeholder="Digite o Titulo da Publicação" required>
                    </div>
                    <div class="form-field">
                        <label for="descricao">Informar Descrição da Publicação:</label>
                        <textarea id="descricao" name="descricao" placeholder="Digite a Descrição da Publicação" rows="10" required></textarea>
                    </div>
                    <div class="form-field">
                        <label for="print">Informar Print da Publicação:</label>
                        <input type="url" id="print" name="print" placeholder="Insira a Print da Publicação" required>
                    </div>
                    <div class="form-field">
                        <label for="autor">Informar Autor da Publicação:</label>
                        <input type="text" id="autor" name="autor" placeholder="Insira o Nome do Autor da Publicação" required>
                    </div>
                    <button type="submit" class="button is-primary" id="submitBtn4">Criar Publicação</button>
                </form>
            `;
            const form4 = document.querySelector('.form-create-post');
            const submitBtn4 = document.getElementById('submitBtn4');
            let isSubmitting4 = false;  // Flag to prevent multiple submissions

            form4.addEventListener('submit', function(event) {
                event.preventDefault();


                // Prevent multiple submissions
                if (isSubmitting4) return;

                isSubmitting4 = true;  // Set flag to true
                submitBtn4.disabled = true;  // Disable the submit button to prevent multiple clicks
        
                                
                const formData = new FormData(form4);
                fetch('https://dash.legendarycommunity.com.br/api/api_registrar_post.php', {
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
                        form4.reset();
                    } else if (data.error) {
                        document.querySelector('.avisos4').style.display = 'flex';
                        setTimeout(function() {
                            document.querySelector('.avisos4').style.display = 'none';
                        }, 5000);
                        form4.reset();
                    }
                })
                .catch(error => {
                    document.querySelector('.avisos4').style.display = 'flex';
                    setTimeout(function() {
                        document.querySelector('.avisos4').style.display = 'none';
                    }, 5000);
                    form4.reset();
                })
                .finally(() => {
                    isSubmitting4 = false;  // Reset flag
                    submitBtn4.disabled = false;  // Re-enable the submit button
                });
            });
            break;
        case 'create-devolutions':
            contentArea.innerHTML = `
                <form class="form-create-devolutions">
                    <div class="form-field">
                        <label for="userid">Informar ID discord do Membro:</label>
                        <input type="text" id="userid" name="userid" placeholder="Digite o ID discord do Membro" required>
                    </div>
                    <div class="form-field">
                        <label for="username">Informar nick do membro no Minecraft:</label>
                        <input type="text" id="username" name="username" placeholder="Digite o nick do membro no Minecraft" required>
                    </div>
                    <div class="form-field">
                        <label for="id_ticket">Selecionar Ticket Referente:</label>
                        <select id="id_ticket" name="id_ticket" required>
                            <option value="">Carregando...</option>
                        </select>
                    </div>
                    <div class="form-field">
                        <label for="descricao">Informar Descrição da Devolução:</label>
                        <textarea id="descricao" name="descricao" placeholder="Digite a Descrição da Devolução" rows="6" required></textarea>
                    </div>
                    <div class="form-field">
                        <label for="print">Informar Print da Devolução:</label>
                        <input type="url" id="print" name="print" placeholder="Insira a Print da Devolução" required>
                    </div>
                    <button type="submit" class="button is-primary" id="submitBtn5">Criar Devolução</button>
                </form>
            `;

            const loadTicketsDev = async () => {
                const ticketSelect = document.getElementById('id_ticket');
                try {
                    const response = await fetch('https://dash.legendarycommunity.com.br/api/api_tickets.php');
                    const tickets = await response.json();
                    ticketSelect.innerHTML = '<option value="">Selecione um Ticket</option>';
                    tickets.forEach(ticket => {
                        const option = document.createElement('option');
                        option.value = ticket.id_ticket;
                        option.textContent = `${ticket.id_ticket} | ${ticket.descricao}`;
                        ticketSelect.appendChild(option);
                    });
                } catch (error) {
                    console.error('Erro ao carregar tickets:', error);
                    ticketSelect.innerHTML = '<option value="">Erro ao carregar tickets</option>';
                }
            };
            loadTicketsDev();
            
            const form5 = document.querySelector('.form-create-devolutions');
            const submitBtn5 = document.getElementById('submitBtn5');
            let isSubmitting5 = false;  // Flag to prevent multiple submissions

            form5.addEventListener('submit', function(event) {
                event.preventDefault();


                // Prevent multiple submissions
                if (isSubmitting5) return;

                isSubmitting5 = true;  // Set flag to true
                submitBtn5.disabled = true;  // Disable the submit button to prevent multiple clicks
        
                                
                const formData = new FormData(form5);
                fetch('https://dash.legendarycommunity.com.br/api/api_registrar_devolution.php', {
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
                        form5.reset();
                    } else if (data.error) {
                        document.querySelector('.avisos4').style.display = 'flex';
                        setTimeout(function() {
                            document.querySelector('.avisos4').style.display = 'none';
                        }, 5000);
                        form5.reset();
                    }
                })
                .catch(error => {
                    document.querySelector('.avisos4').style.display = 'flex';
                    setTimeout(function() {
                        document.querySelector('.avisos4').style.display = 'none';
                    }, 5000);
                    form5.reset();
                })
                .finally(() => {
                    isSubmitting5 = false;  // Reset flag
                    submitBtn5.disabled = false;  // Re-enable the submit button
                });
            });
            break;
        case 'list-devolutions':
            contentArea.innerHTML = `
                <form class="form-list-devolutions">
                    <p>Carregando histórico de devoluções...</p>
                </form>`;
            getHistoricoDevolutionsSTAFF();
            break;
        case 'register-emprestimo':
            contentArea.innerHTML = `
                <form class="form-register-emprestimo">
                    <div class="form-field">
                        <label for="userid">Informar ID do Discord:</label>
                        <input type="text" id="userid" name="userid" placeholder="Informar ID do Discord" required>
                    </div>
                    <div class="form-field">
                        <label for="username">Informar Nick do Minecraft</label>
                        <input type="text" id="username" name="username" placeholder="Digite o Nick do Minecraft" required>
                    </div>
                    <div class="form-field">
                        <label for="userid2">Informar ID do Discord do Agiota:</label>
                        <input type="text" id="userid2" name="userid2" placeholder="Digite o ID do Discord do Agiota" required>
                    </div>
                    <div class="form-field">
                        <label for="agiota">Informar Nick do Minecraft do Agiota</label>
                        <input type="text" id="agiota" name="agiota" placeholder="Digite o Nick do Minecraft do Agiota" required>
                    </div>
                    <div class="form-field">
                        <label for="price">Informar Valor do Emprestimo</label>
                        <input type="number" id="price" name="price" placeholder="Digite o Valor do Emprestimo" required>
                    </div>
                    <div class="form-field">
                        <label for="parcelas">Informar Valor de Parcelas</label>
                        <input type="number" id="parcelas" name="parcelas" placeholder="Digite o Valor de Parcelas" required>
                    </div>
                    <button type="submit" class="button is-primary" id="submitBtn6">Registrar Emprestimo</button>
                </form>
            `;
            
            const form6 = document.querySelector('.form-register-emprestimo');
            const submitBtn6 = document.getElementById('submitBtn6');
            let isSubmitting6 = false;  // Flag to prevent multiple submissions
        
            form6.addEventListener('submit', function(event) {
                event.preventDefault();
        
                if (isSubmitting6) return;
        
                isSubmitting6 = true;  
                submitBtn6.disabled = true; 
        
                const formData = new FormData(form6);
                fetch('https://dash.legendarycommunity.com.br/api/api_registrar_emprestimo.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        document.querySelector('.avisos5').style.display = 'flex';
                        setTimeout(() => {
                            document.querySelector('.avisos5').style.display = 'none';
                        }, 5000);
                        form6.reset();
                    } else if (data.error) {
                        document.querySelector('.avisos4').style.display = 'flex';
                        setTimeout(() => {
                            document.querySelector('.avisos4').style.display = 'none';
                        }, 5000);
                        form6.reset();
                    }
                })
                .catch(error => {
                    document.querySelector('.avisos4').style.display = 'flex';
                    setTimeout(() => {
                        document.querySelector('.avisos4').style.display = 'none';
                    }, 5000);
                    form6.reset();
                })
                .finally(() => {
                    isSubmitting6 = false;
                    submitBtn6.disabled = false;
                });
            });
            break;
        case 'list-emprestimo':
            contentArea.innerHTML = `
                <form class="form-list-emprestimo">
                    <p>Carregando histórico de devoluções...</p>
                </form>`;
            getHistoricoEmprestimosSTAFF();
            break;
        case 'register-advertencia':
            contentArea.innerHTML = `
                <form class="form-register-advertencia">
                    <div class="form-field">
                        <label for="userid">Informar ID do Discord:</label>
                        <input type="text" id="userid" name="userid" placeholder="Digite o User ID do Advertido" required>
                    </div>
                    <div class="form-field">
                        <label for="username">Informar Nome do Minecraft:</label>
                        <input type="text" id="username" name="username" placeholder="Digite o nome do Minecraft" required>
                    </div>
                    <div class="form-field">
                        <label for="descricao">Informar descricao da Advertência:</label>
                        <textarea id="descricao" name="descricao" placeholder="Descreva a advertência" rows="4" required></textarea>
                    </div>
                    <div class="form-field">
                        <label for="regra">Selecionar a Regra Descumprida:</label>
                        <select id="regra" name="regra" required>
                            <option value="">Carregando...</option>
                        </select>
                    </div>
                    <div class="form-field">
                        <label for="status">Selecionar Advertência:</label>
                        <select id="status" name="status" required>
                            <option value="Advertência 1x">Advertência 1x</option>
                            <option value="Advertência 2x">Advertência 2x</option>
                            <option value="Advertência 3x">Advertência 3x</option>
                        </select>
                    </div>
                    <div class="form-field">
                        <label for="id_ticket">Selecionar Ticket Referente:</label>
                        <select id="id_ticket" name="id_ticket" required>
                            <option value="">Carregando...</option>
                        </select>
                    </div>
                    <button type="submit" class="button is-primary" id="submitBtn8">Registrar Advertência</button>
                </form>
            `;
        
            const loadTickets = async () => {
                const ticketSelect = document.getElementById('id_ticket');
                try {
                    const response = await fetch('https://dash.legendarycommunity.com.br/api/api_tickets.php');
                    const tickets = await response.json();
                    ticketSelect.innerHTML = '<option value="">Selecione um Ticket</option>';
                    tickets.forEach(ticket => {
                        const option = document.createElement('option');
                        option.value = ticket.id_ticket;
                        option.textContent = `${ticket.id_ticket} | ${ticket.descricao}`;
                        ticketSelect.appendChild(option);
                    });
                } catch (error) {
                    console.error('Erro ao carregar tickets:', error);
                    ticketSelect.innerHTML = '<option value="">Erro ao carregar tickets</option>';
                }
            };
            loadTickets();

            const loadRegras = async () => {
                const regraSelect = document.getElementById('regra');
                try {
                    const response = await fetch('https://dash.legendarycommunity.com.br/api/api_buscar_regras.php');
                    const regras = await response.json();
                    regraSelect.innerHTML = '<option value="">Selecione uma Regra</option>';
                    regras.forEach(regra => {
                        const option = document.createElement('option');
                        option.value = regra.titulo;
                        option.textContent = `${regra.titulo}`;
                        regraSelect.appendChild(option);
                    });
                } catch (error) {
                    console.error('Erro ao carregar regras:', error);
                    regraSelect.innerHTML = '<option value="">Erro ao carregar regras</option>';
                }
            };
            loadRegras();
        
            const form8 = document.querySelector('.form-register-advertencia');
            const submitBtn8 = document.getElementById('submitBtn8');
            let isSubmitting8 = false;  // Flag to prevent multiple submissions
        
            form8.addEventListener('submit', function(event) {
                event.preventDefault();
        
                if (isSubmitting8) return;
        
                isSubmitting8 = true;  
                submitBtn8.disabled = true; 
        
                const formData = new FormData(form8);
                fetch('https://dash.legendarycommunity.com.br/api/api_registrar_advertencia.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        document.querySelector('.avisos5').style.display = 'flex';
                        setTimeout(() => {
                            document.querySelector('.avisos5').style.display = 'none';
                        }, 5000);
                        form8.reset();
                    } else if (data.error) {
                        document.querySelector('.avisos4').style.display = 'flex';
                        setTimeout(() => {
                            document.querySelector('.avisos4').style.display = 'none';
                        }, 5000);
                        form8.reset();
                    }
                })
                .catch(error => {
                    document.querySelector('.avisos4').style.display = 'flex';
                    setTimeout(() => {
                        document.querySelector('.avisos4').style.display = 'none';
                    }, 5000);
                    form8.reset();
                })
                .finally(() => {
                    isSubmitting8 = false;
                    submitBtn8.disabled = false;
                });
            });
            break;
        case 'list-advertencia':
            contentArea.innerHTML = `
                <form class="form-list-advertencia">
                    <p>Carregando histórico de advertências...</p>
                </form>`;
            getHistoricoAdvertenciaSTAFF();
            break;
        case 'list-ban':
            contentArea.innerHTML = `
                <form class="form-list-ban">
                    <p>Carregando histórico de bans...</p>
                </form>`;
            getHistoricoBansSTAFF();
            break;
        case 'atualizar-emprestimo':
            contentArea.innerHTML = `
                <form class="form-atualizar-emprestimo">
                    
                    <div class="form-field">
                        <label for="id_emprestimo">Selecionar Emprestimo Referente:</label>
                        <select id="id_emprestimo" name="id_emprestimo" required>
                            <option value="">Carregando...</option>
                        </select>
                    </div>

                    <div class="form-field">
                        <label for="parcelas_pagas">Informar Parcela Paga:</label>
                        <input type="number" id="parcelas_pagas" name="parcelas_pagas" placeholder="Digite a parcela paga" required>
                    </div>

                    <div class="form-field">
                        <label for="status">Selecionar Status:</label>
                        <select id="status" name="status" required>
                            <option value="Empréstimo Pago">Empréstimo Pago</option>
                            <option value="Empréstimo Cancelado">Empréstimo Cancelado</option>
                            <option value="Empréstimo Em Pagamento">Empréstimo Em Pagamento</option>
                        </select>
                    </div>

                    <button type="submit" class="button is-primary" id="submitBtn9">Atualizar Emprestimo</button>
                </form>
            `;
                   
            const formatarBRL = (valor) => {
                return new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(valor);
            };

            const loadEmprestimo = async () => {
                const emprestimoSelect = document.getElementById('id_emprestimo');
                try {
                    const response = await fetch('https://dash.legendarycommunity.com.br/api/api_buscar_emprestimo.php');
                    const emprestimos = await response.json();
                    emprestimoSelect.innerHTML = '<option value="">Selecione o Emprestimo</option>';
                    emprestimos.forEach(emprestimo => {
                        const option = document.createElement('option');
                        option.value = emprestimo.id_emprestimo;
                        option.textContent = `${emprestimo.id_emprestimo} | ${formatarBRL(emprestimo.price)} | ${emprestimo.status} | Parcelas: | ${emprestimo.parcelas_pagas}/${emprestimo.parcelas}`;
                        emprestimoSelect.appendChild(option);
                    });
                } catch (error) {
                    console.error('Erro ao carregar emprestimo:', error);
                    emprestimoSelect.innerHTML = '<option value="">Erro ao carregar emprestimos</option>';
                }
            };
            loadEmprestimo();

            const form9 = document.querySelector('.form-atualizar-emprestimo');
            const submitBtn9 = document.getElementById('submitBtn9');
            let isSubmitting9 = false;  // Flag to prevent multiple submissions
        
            form9.addEventListener('submit', function(event) {
                event.preventDefault();
        
                if (isSubmitting9) return;
        
                isSubmitting9 = true;  
                submitBtn9.disabled = true; 
        
                const formData = new FormData(form9);
                fetch('https://dash.legendarycommunity.com.br/api/api_update_emprestimo.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        document.querySelector('.avisos5').style.display = 'flex';
                        setTimeout(() => {
                            document.querySelector('.avisos5').style.display = 'none';
                        }, 5000);
                        form9.reset();
                    } else if (data.error) {
                        document.querySelector('.avisos4').style.display = 'flex';
                        setTimeout(() => {
                            document.querySelector('.avisos4').style.display = 'none';
                        }, 5000);
                        form9.reset();
                    }
                })
                .catch(error => {
                    document.querySelector('.avisos4').style.display = 'flex';
                    setTimeout(() => {
                        document.querySelector('.avisos4').style.display = 'none';
                    }, 5000);
                    form9.reset();
                })
                .finally(() => {
                    isSubmitting9 = false;
                    submitBtn9.disabled = false;
                });
            });
            break;
        default:
            contentArea.innerHTML = "<p>Escolha uma opção.</p>";
    }
}