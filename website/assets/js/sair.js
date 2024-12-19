document.getElementById('logout-button').addEventListener('click', function () {
    localStorage.removeItem('discord_access_token');
    sessionStorage.removeItem('discord_access_token');
    const currentUrl = window.location.href.split('#')[0];
    window.history.replaceState(null, null, currentUrl);
    window.location.href = 'index.html';
});