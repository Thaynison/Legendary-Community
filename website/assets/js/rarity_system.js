document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://dash.legendarycommunity.com.br/api/api_buscar_rarity_itens.php";
    const alertOverlay = document.querySelector(".alert-overlay");
    const alertMessage = document.getElementById("alert-message");
    const alertClose = document.getElementById("alert-close");
    let cachedItems = []; // Cache para itens carregados

    // Mostrar alerta
    function showAlert(message) {
        alertMessage.innerHTML = message;
        alertOverlay.style.display = "flex";
    }

    alertClose.addEventListener("click", () => {
        alertOverlay.style.display = "none";
    });

    // Função para buscar os itens com cache
    async function fetchRarityItems() {
        if (cachedItems.length > 0) {
            // Se já temos os itens em cache, apenas os exibe
            displayItems(cachedItems);
            return;
        }

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
            }
            const items = await response.json();
            cachedItems = items; // Cache os itens
            displayItems(items);
        } catch (error) {
            console.error("Erro ao buscar os itens:", error);
            showAlert("Não foi possível carregar os itens. Tente novamente mais tarde.");
        }
    }

    // Função para formatar o lore do item
    function formatLore(lore) {
        if (typeof lore === 'string') {
            lore = lore.split('\n');
        }
        return lore.map(line => `<p>${line}</p>`).join('');
    }

    // Formatar preço
    function formatPrice(price) {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(price);
    }

    // Obter cor da raridade
    function getRarityColor(rarity) {
        const rarityColors = {
            "Comum": "#545454",
            "Raro": "#ffbd59",
            "Épico": "#8c52ff",
            "Lendário": "#ff009d",
            "Divino": "#5ce1e6"
        };
        return rarityColors[rarity] || "#000000"; // cor padrão
    }

    // Ordenar os itens pela raridade e preço
    function sortItemsByRarityAndPrice(items) {
        const rarityOrder = ["Divino", "Lendário", "Épico", "Raro", "Comum"];
        
        return items.sort((a, b) => {
            // Primeiro, ordena pela raridade
            const rarityComparison = rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
            if (rarityComparison !== 0) {
                return rarityComparison;
            }

            // Se as raridades são iguais, ordena pelo preço (menor para maior)
            return a.price - b.price;
        });
    }

    // Exibir os itens
    function displayItems(items) {
        const produtosUl = document.querySelector(".produtos");
        produtosUl.innerHTML = "";

        // Ordena os itens pela raridade e preço
        const sortedItems = sortItemsByRarityAndPrice(items);

        sortedItems.forEach(item => {
            const li = document.createElement("li");
            const loreFormatted = formatLore(item.lore);
            const formattedPrice = formatPrice(item.price);
            const rarityColor = getRarityColor(item.rarity);

            li.innerHTML = `
                <img src="${item.print}" alt="${item.item}">
                <h1>${item.item}</h1>
                <h2>${formattedPrice}</h2>
                <h2 style="color: ${rarityColor};">${item.rarity}</h2>
                <div class="buttons is-centered">
                    <a href="#" class="button is-primary" 
                       data-lore="${encodeURIComponent(loreFormatted)}">
                        <span class="icon is-small"><i class="fas fa-eye"></i></span>
                    </a>
                </div>
            `;

            // Event listener para mostrar o lore
            const button = li.querySelector("a");
            button.addEventListener("mouseover", function () {
                const lore = decodeURIComponent(button.getAttribute("data-lore"));
                showAlert(lore);
            });

            produtosUl.appendChild(li);
        });
    }

    // Inicia o carregamento dos itens
    fetchRarityItems();
});
