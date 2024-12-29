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
        getHistoricoEmprestimos(userid);
        getHistoricoDevolucoes(userid);
        getHistoricoAdvertencia(userid);
        getHistoricoMensagens(userid)
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
                                        <th>ID Ticket</th>
                                        <th>Username</th>
                                        <th>Titulo</th>
                                        <th>Print</th>
                                        <th>Status</th>
                                    </tr>
                                </thead><tbody>`;

                if (Array.isArray(data)) {
                    data.forEach(ticket => {
                        const statusInfo = getStatusInfo(ticket.status);
                        htmlContent += `<tr>
                                            <td>${ticket.id_ticket}</td>
                                            <td>${ticket.username}</td>
                                            <td>${ticket.titulo}</td>
                                            <td><button class="eye-button" onclick="showImage('${ticket.print}', event)">👁️</button></td>
                                            <td>
                                                <span title="${statusInfo.title}">${statusInfo.emoji}</span>
                                            </td>
                                        </tr>`;
                    });
                } else {
                    htmlContent += '<tr><td colspan="5">Nenhum ticket encontrado.</td></tr>';
                }

                htmlContent += '</tbody></table>';
                document.querySelector('.form-lista-de-ticket').innerHTML = htmlContent;
            }
        })
        .catch(error => {
            document.querySelector('.form-lista-de-ticket').innerHTML = `<p>Erro ao carregar os dados. Tente novamente mais tarde.</p>`;
        });
}

function getDiscordUsername(userId) {
    const apiUrl = `https://dash.legendarycommunity.com.br/api/api_buscar_discord.php?userid=${userId}`;

    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => data.username)
        .catch(error => {
            console.error('Erro ao buscar nome do usuário no Discord:', error);
            return 'Desconhecido';
        });
}

function getHistoricoMensagens(userid) {
    const apiUrl = `https://dash.legendarycommunity.com.br/api/api_buscar_mensagem_user.php?userid=${userid}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(async data => {
            if (data.error) {
                document.querySelector('.form-lista-de-mensagens').innerHTML = `<p>${data.error}</p>`;
            } else {

                const getStatusInfo = (status) => {
                    switch (status) {
                        case 'Player':
                            return { emoji: '👨‍💼', title: 'Mensagem de Player' };
                        case 'Staff':
                            return { emoji: '👨‍🎓', title: 'Mensagem da Staff' };
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
                                        <th>Mensagem</th>
                                        <th>Status</th>
                                    </tr>
                                </thead><tbody>`;

                if (Array.isArray(data)) {
                    for (const mensagem of data) {
                        const statusInfo = getStatusInfo(mensagem.status);
                        let title = statusInfo.title;

                        if (mensagem.status === 'Player' || mensagem.status === 'Staff') {
                            const username = await getDiscordUsername(mensagem.enviador);
                            title += ` - Enviado por: ${username}`;
                        }

                        htmlContent += `<tr>
                                            <td>${mensagem.resposta}</td>
                                            <td>
                                                <span title="${title}">${statusInfo.emoji}</span>
                                            </td>
                                        </tr>`;
                    }
                } else {
                    htmlContent += '<tr><td colspan="5">Nenhum ticket encontrado.</td></tr>';
                }

                htmlContent += '</tbody></table>';
                document.querySelector('.form-lista-de-mensagens').innerHTML = htmlContent;
            }
        })
        .catch(error => {
            document.querySelector('.form-lista-de-mensagens').innerHTML = `<p>Erro ao carregar os dados. Tente novamente mais tarde.</p>`;
        });
}


function getHistoricoEmprestimos(userid) {
    const apiUrl = `https://dash.legendarycommunity.com.br/api/api_buscar_emprestimo_user.php?userid=${userid}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na API: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const container = document.querySelector('.form-lista-de-emprestimos');

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
                    case 'Concluido':
                        return { emoji: '✅', title: 'Empréstimo Pago' };
                    case 'Reprovado':
                        return { emoji: '❌', title: 'Empréstimo Cancelado' };
                    case 'Em Analise':
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
                            <th>Cidadão</th>
                            <th>Agiota</th>
                            <th>Valor</th>
                            <th>Parcelas</th>
                            <th>Data</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            data.forEach(emprestimo => {
                const statusInfoEmprestimo = getStatusInfoEmprestimo(emprestimo.status);
                htmlContent += `
                    <tr>
                        <td>${emprestimo.username}</td>
                        <td>${emprestimo.agiota}</td>
                        <td>${formatarBRL(emprestimo.price)}</td>
                        <td>${emprestimo.parcelas}</td>
                        <td>${emprestimo.data}</td>
                        <td>
                            <span title="${statusInfoEmprestimo.title}">${statusInfoEmprestimo.emoji}</span>
                        </td>
                    </tr>`;
            });

            htmlContent += '</tbody></table>';
            container.innerHTML = htmlContent;
        })
        .catch(error => {
            const container = document.querySelector('.form-lista-de-emprestimos');
            container.innerHTML = `<p class="error">Erro ao carregar os dados: ${error.message}</p>`;
        });
}


function getHistoricoDevolucoes(userid) {
    const apiUrl = `https://dash.legendarycommunity.com.br/api/api_buscar_devolution_user.php?userid=${userid}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na API: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const container = document.querySelector('.form-lista-de-devolucoes');

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
            const container = document.querySelector('.form-lista-de-devolucoes');
            container.innerHTML = `<p class="error">Erro ao carregar os dados: ${error.message}</p>`;
        });
}


function getHistoricoAdvertencia(userid) {
    const apiUrl = `https://dash.legendarycommunity.com.br/api/api_buscar_advertencia_user.php?userid=${userid}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na API: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const container = document.querySelector('.form-lista-de-advertencias');

            if (data.error) {
                container.innerHTML = `<p class="error">${data.error}</p>`;
                return;
            }

            if (!Array.isArray(data) || data.length === 0) {
                container.innerHTML = `<p class="info">Nenhuma devolução encontrado.</p>`;
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
            const container = document.querySelector('.form-lista-de-advertencias');
            container.innerHTML = `<p class="error">Erro ao carregar os dados: ${error.message}</p>`;
        });
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
    closeButton.style.backgroundColor = '#11203b'; // Fundo rosa
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
        closeButton.style.backgroundColor = '#11203b'; // Retorna ao fundo original
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
    closeButton.style.backgroundColor = '#11203b'; // Fundo rosa
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
        closeButton.style.backgroundColor = '#11203b'; // Retorna ao fundo original
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
        case 'register-ticket':
            contentArea.innerHTML = `
                <form class="form-register-ticket">
                    <div class="form-field">
                        <label for="userid">Copie seu ID Account Discord ao lado:</label>
                        <input type="text" id="userid" name="userid" placeholder="Cole seu ID Account Discord" required>
                    </div>
                    <div class="form-field">
                        <label for="username">Informar Nome do Minecraft:</label>
                        <input type="text" id="username" name="username" placeholder="Digite o nome do Minecraft" required>
                    </div>
                    <div class="form-field">
                        <label for="titulo">Informar Titulo do Ticket:</label>
                        <input type="text" id="titulo" name="titulo" placeholder="Digite o Titulo do Ticket" maxlength="45" required>
                    </div>
                    <div class="form-field">
                        <label for="descricao">Informar Descrição do Ticket:</label>
                        <textarea id="descricao" name="descricao" placeholder="Informar Descrição do Ticket" required></textarea>
                    </div>
                    <div class="form-field">
                        <label for="print">Anexar Print:</label>
                        <input type="url" id="print" name="print" placeholder="Anexar a URL da Print" required>
                        <a href="https://imgur.com/" target="_blank"><i class="fas fa-gamepad"></i> Site para upar foto</a>
                    </div>
                    <button type="submit" class="button is-primary" id="submitBtn">Abrir Ticket</button>
                </form>
            `;
            const form2 = document.querySelector('.form-register-ticket');
            const submitBtn = document.getElementById('submitBtn');
            let isSubmitting = false;  // Flag to prevent multiple submissions
        
            form2.addEventListener('submit', function(event) {
                event.preventDefault();
        
                // Prevent multiple submissions
                if (isSubmitting) return;
        
                isSubmitting = true;  // Set flag to true
                submitBtn.disabled = true;  // Disable the submit button to prevent multiple clicks
        
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
                })
                .finally(() => {
                    isSubmitting = false;  // Reset flag
                    submitBtn.disabled = false;  // Re-enable the submit button
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
        case 'lista-de-emprestimos':
            contentArea.innerHTML = `
                <form class="form-lista-de-emprestimos">
                    <p>Carregando histórico de emprestimos...</p>
                </form>
            `;
            // Garantir que os tickets sejam carregados quando o conteúdo for trocado
            const userid2 = document.getElementById('userid2').textContent;
            if (userid2) {
                getHistoricoEmprestimos(userid2);
            }
            break;
        case 'lista-de-devolucoes':
            contentArea.innerHTML = `
                <form class="form-lista-de-devolucoes">
                    <p>Carregando histórico de devoluções...</p>
                </form>
            `;
            // Garantir que os tickets sejam carregados quando o conteúdo for trocado
            const userid3 = document.getElementById('userid2').textContent;
            if (userid3) {
                getHistoricoDevolucoes(userid3);
            }
            break;
        case 'lista-de-advertencias':
            contentArea.innerHTML = `
                <form class="form-lista-de-advertencias">
                    <p>Carregando histórico de advertências...</p>
                </form>
            `;
            // Garantir que os tickets sejam carregados quando o conteúdo for trocado
            const userid4 = document.getElementById('userid2').textContent;
            if (userid4) {
                getHistoricoAdvertencia(userid4);
            }
            break;
            case 'lista-de-mensagens':
                contentArea.innerHTML = `
                    <form class="form-lista-de-mensagens">
                        <p>Carregando histórico de mensagens...</p>
                    </form>
                `;
                // Garantir que os tickets sejam carregados quando o conteúdo for trocado
                const userid5 = document.getElementById('userid2').textContent;
                if (userid5) {
                    getHistoricoMensagens(userid5);
                }
                break;
        default:
            contentArea.innerHTML = "<p>Escolha uma opção.</p>";
    }
}
