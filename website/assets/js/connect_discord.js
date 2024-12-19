window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const username = params.get('username');
    const userid = params.get('userid');
    const avatar = params.get('avatar');
    document.getElementById('username').textContent = username;
    document.getElementById('userid').textContent = userid;
    document.getElementById('avatar').src = avatar;
});