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

    function formatLore(lore) {
        if (typeof lore === 'string') {
            lore = lore.split('\n');
        }

        return lore.map(line => {
            if (line.trim() === "") return ""; 
            return `<p>${line.replace(/&([0-9a-fk-or])/g, '<span style="color:$1">')}&nbsp;</p>`;
        }).join('');
    }

    function displayItems(items) {
        const produtosUl = document.querySelector(".produtos");
        produtosUl.innerHTML = ""; 

        items.forEach(item => {
            const li = document.createElement("li");

            const loreFormatted = formatLore(item.lore); 

            li.innerHTML = `
                <img src="${item.print}" alt="${item.item}">
                <h1>${item.item}</h1>
                <h2>${item.price} <small>/mês</small></h2>
                <div class="buttons is-centered">
                    <a href="#" class="button is-primary" 
                       data-lore="${encodeURIComponent(loreFormatted)}">
                        <span class="icon is-small"><i class="fas fa-eye"></i></span>
                    </a>
                </div>
            `;

            const button = li.querySelector("a");
            button.addEventListener("mouseover", function (event) {
                const lore = decodeURIComponent(button.getAttribute("data-lore"));
                const tooltip = document.createElement('div');
                tooltip.classList.add('lore-tooltip');
                tooltip.innerHTML = lore;

                // Posiciona o tooltip
                tooltip.style.top = `${event.clientY + 10}px`;
                tooltip.style.left = `${event.clientX + 10}px`;

                document.body.appendChild(tooltip);

                // Remove o tooltip quando o mouse sai
                button.addEventListener('mouseout', function () {
                    tooltip.remove();
                });
            });

            produtosUl.appendChild(li);
        });
    }

    fetchRarityItems();
});
