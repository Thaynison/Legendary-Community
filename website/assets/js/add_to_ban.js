function submitFormData() {
    const formData = new FormData();
    formData.append("userid", document.getElementById("user-id").value);
    formData.append("ip_ban", document.getElementById("banned-ip").value);
    formData.append("discord_ban", document.getElementById("discord-name").value);
    formData.append("minecraft_name", document.getElementById("minecraft-name").value);
    formData.append("print_link", document.getElementById("print-link").value);
    formData.append("ban_reason", document.getElementById("ban-reason").value);

    // Enviar os dados para a API
    fetch('https://legendarycommunity.com.br/dashboard/API/api_registrar_ban.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.success); // Exibe sucesso
        } else if (data.error) {
            alert(data.error); // Exibe erro
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

// Adicionar o evento de envio no formulário
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário tradicional
    submitFormData();
});
