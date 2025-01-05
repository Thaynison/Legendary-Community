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

    } else {
        console.log("erro no userid")
    }
});

function changeContent(contentType) {
    var contentArea = document.getElementById("content-area");

    switch(contentType) {
        case 'open-inventario':
            contentArea.innerHTML = ``;
            break;
        case 'open-ender-chest':
            contentArea.innerHTML = ``;
            break;
        default:
            contentArea.innerHTML = "<p>Escolha uma opção.</p>";
    }
}
