// window.addEventListener('DOMContentLoaded', () => {
//     const params = new URLSearchParams(window.location.search);
//     const username = params.get('username');
//     const userid = params.get('userid');
    
//     // const cleanUserId = userid ? userid.replace(/\D/g, '') : null;

//     // console.log(cleanUserId);

//     const avatar = params.get('avatar');
//     document.getElementById('username').textContent = username;
//     document.getElementById('username2').textContent = username;
//     document.getElementById('userid').textContent = userid;
//     document.getElementById('avatar').src = avatar;
//     document.getElementById('avatar2').src = avatar;

//     // if (cleanUserId) {
//     //     verificarBanimento(cleanUserId);
//     //     getHistoricoCompras(cleanUserId);
//     // } else {
//     //     document.querySelector('.status-approved').innerHTML = '<p>ID de usuário não encontrado.</p>';
//     // }
// });

window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const username = params.get('username');
    const userid = params.get('userid');
    const avatar = params.get('avatar');

    document.getElementById('username').textContent = username;
    document.getElementById('username2').textContent = username;
    document.getElementById('userid').textContent = userid;
    document.getElementById('avatar').src = avatar;
    document.getElementById('avatar2').src = avatar;

    // Chamando as funções após DOMContentLoaded
    if (userid) {
        verificarBanimento(userid);
        getHistoricoCompras(userid);
    } else {
        console.error('userid não encontrado nos parâmetros da URL.');
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
                document.querySelector('.status-approved').innerHTML = '<p class="status-approved" style="color: #a7288c";>ALLOWLIST APROVADA</p>';
            }
        })
        .catch(error => {
            console.error('Erro ao acessar a API:', error);
            document.querySelector('.status-approved').innerHTML = '<p>Erro ao verificar o status da conta.</p>';
        });
}

function getHistoricoCompras(userid) {
    const apiUrl = `https://dash.legendarycommunity.com.br/api/api.php?userid=${userid}`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.querySelector('.historio').innerHTML = `<p>${data.error}</p>`;
            } else {
                let htmlContent = '<table class="table is-fullwidth">';
                htmlContent += `<thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>Produto</th>
                                        <th>Valor</th>
                                        <th>Data da Compra</th>
                                    </tr>
                                </thead><tbody>`;
                
                // Verifique se "data" é um array
                if (Array.isArray(data)) {
                    data.forEach(compra => {
                        htmlContent += `<tr>
                                            <td>${compra.codigo}</td>
                                            <td>${compra.produto}</td>
                                            <td>R$ ${compra.valor}</td>
                                            <td>${compra.data_compra}</td>
                                        </tr>`;
                    });
                } else {
                    htmlContent += '<tr><td colspan="2">Nenhuma compra encontrada.</td></tr>';
                }
                
                htmlContent += '</tbody></table>';
                document.querySelector('.historio').innerHTML = htmlContent;
            }
        })
        .catch(error => {
            document.querySelector('.historio').innerHTML = `<p>Erro ao carregar os dados. Tente novamente mais tarde.</p>`;
        });
}