document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://dash.legendarycommunity.com.br/api/api_buscar_rarity_itens.php";

    const alertOverlay = document.querySelector(".alert-overlay");
    const alertMessage = document.getElementById("alert-message");
    const alertClose = document.getElementById("alert-close");

    function showAlert(message) {
        alertMessage.innerHTML = message;
        alertOverlay.style.display = "flex";
    }

    alertClose.addEventListener("click", () => {
        alertOverlay.style.display = "none";
    });

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
            showAlert("Não foi possível carregar os itens. Tente novamente mais tarde.");
        }
    }

    function formatLore(lore) {
        if (typeof lore === 'string') {
            lore = lore.split('\n');
        }
        return lore.map(line => `<p>${line}</p>`).join('');
    }

    function formatPrice(price) {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(price);
    }

    function displayItems(items) {
        const produtosUl = document.querySelector(".produtos");
        produtosUl.innerHTML = "";

        items.forEach(item => {
            const li = document.createElement("li");
            const loreFormatted = formatLore(item.lore);
            const formattedPrice = formatPrice(item.price);

            li.innerHTML = `
                <img src="${item.print}" alt="${item.item}">
                <h1>${item.item}</h1>
                <h2>${formattedPrice}</h2>
                <div class="buttons is-centered">
                    <a href="#" class="button is-primary" 
                       data-lore="${encodeURIComponent(loreFormatted)}">
                        <span class="icon is-small"><i class="fas fa-eye"></i></span>
                    </a>
                </div>
            `;

            const button = li.querySelector("a");
            button.addEventListener("mouseover", function () {
                const lore = decodeURIComponent(button.getAttribute("data-lore"));
                showAlert(lore);
            });

            produtosUl.appendChild(li);
        });
    }

    fetchRarityItems();
});
