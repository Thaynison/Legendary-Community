document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://dash.legendarycommunity.com.br/api/api_buscar_rarity_itens.php";

    async function fetchRarityItems() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
            }
            const items = await response.json();
            displayItems(items);
        } catch (error) {
            console.error("Erro ao buscar os itens:", error);
            alert("Não foi possível carregar os itens. Tente novamente mais tarde.");
        }
    }

    function displayItems(items) {
        const produtosUl = document.querySelector(".produtos");
        produtosUl.innerHTML = ""; // Limpa a lista antes de adicionar os itens

        items.forEach(item => {
            const li = document.createElement("li");

            li.innerHTML = `
                <img src="${item.print}" alt="${item.item}">
                <h1>${item.item}</h1>
                <h2>${item.price} <small>/mês</small></h2>
                <div class="buttons is-centered">
                    <a href="#" onclick="viewalertlore('${ticket.lore}', event)" class="button is-primary">
                        <span class="icon is-small"><i class="fas fa-eye"></i></span>
                    </a>
                </div>
            `;

            produtosUl.appendChild(li);
        });
    }

    // Inicializa a busca de itens
    fetchRarityItems();
});

function showImage(imageUrl) {
    
}