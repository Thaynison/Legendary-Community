function redirecionarPara_PainelStaff() {
    const username = document.getElementById('username').textContent;
    const userid = document.getElementById('userid').textContent;
    const avatar = document.getElementById('avatar').src;

    // Fazendo a requisição para a API1 para pegar o UUID do usuário
    fetch(`http://legendarycommunity.com.br:9955/dashboard/API/api_staff1.php?userid=${userid}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                // Assumindo que o primeiro resultado tem o UUID
                const uuid = data[0].uuid;

                // Fazendo a requisição para a API2 para verificar o grupo principal
                fetch(`http://legendarycommunity.com.br:9955/dashboard/API/api_staff2.php?uuid=${uuid}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.is_fundador) {
                            // Redireciona para o painel staff
                            window.location.href = `painelstaff.html?username=${encodeURIComponent(username)}&userid=${encodeURIComponent(userid)}&avatar=${encodeURIComponent(avatar)}`;
                        } else {
                            // Exibe aviso de falta de permissão
                            document.querySelector('.avisos4').style.display = 'flex';
                            setTimeout(function() {
                                document.querySelector('.avisos4').style.display = 'none';
                            }, 5000);
                        }
                    });
            }
        });
}