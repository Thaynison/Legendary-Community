function copyToClipboard() {
    var input = document.getElementById("ip");
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("IP copiado: " + input.value);
}

document.addEventListener("copy", function (event) {
    if (event.target.id !== "ip") {
        event.preventDefault();
    }
});
