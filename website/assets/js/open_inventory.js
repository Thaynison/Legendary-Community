window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const username = params.get('username');
    const userid = params.get('userid');
    const avatar = params.get('avatar');
    document.getElementById('username').textContent = username || "Jogador Desconhecido";
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


fetch(`https://dash.legendarycommunity.com.br/api/api_buscar_inventario_user.php?userid=${userid}`)
.then(response => response.json())
.then(data => {
    if (data.error) {
        console.error("Erro:", data.error);
        return;
    }
    renderInventory(data.inventory);
})
.catch(error => console.error("Erro ao buscar inventário:", error));

function renderInventory(inventory) {
    const container = document.getElementById('inventory-container');
    container.innerHTML = '';

    for (let i = 0; i < 36; i++) {
        const slotData = inventory[i] || null;
        const slot = document.createElement('div');
        slot.classList.add('slot');

        if (slotData) {
            const img = document.createElement('img');
            img.src = getItemImage(slotData.type);
            slot.appendChild(img);

            const tooltip = document.createElement('div');
            tooltip.classList.add('tooltip');
            tooltip.innerHTML = `
                <strong>${slotData.display_name || slotData.type}</strong><br>
                ${slotData.lore ? slotData.lore.join("<br>") : ""}
            `;
            slot.appendChild(tooltip);
        }

        container.appendChild(slot);
    }
}

function getItemImage(type) {
return `https://mc-heads.net/item/${type}.png`; 
}