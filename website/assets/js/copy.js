const style = document.createElement("style");
style.innerHTML = `
    body {
        user-select: none; /* Bloqueia seleção de texto */
        -webkit-user-select: none; /* Compatibilidade com navegadores baseados em WebKit */
    }
`;
document.head.appendChild(style);

document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey && e.key === 'c') || (e.ctrlKey && e.key === 'x')) {
        e.preventDefault();
    }
});

document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

function copyToClipboard() {
    var input = document.getElementById("ip");

    input.select();
    input.setSelectionRange(0, 99999);

    document.execCommand("copy");
}

function copyToClipboardUserid() {
    var input = document.getElementById("userid2");

    input.select();
    input.setSelectionRange(0, 99999);

    document.execCommand("copy");
}
