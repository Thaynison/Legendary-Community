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
        // Verifica se lore é uma string, caso contrário, assume que já é um array
        if (typeof lore === 'string') {
            lore = lore.split('\n'); // Se for string, divide por novas linhas
        }

        return lore.map(line => {
            if (line.trim() === "") return ""; // Remove linhas vazias
            return `<p>${line.replace(/&([0-9a-fk-or])/g, '<span style="color:$1">')}&nbsp;</p>`; // Converte as cores do item
        }).join(''); // Junta as linhas formatadas em uma única string
    }

    function displayItems(items) {
        const produtosUl = document.querySelector(".produtos");
        produtosUl.innerHTML = ""; // Limpa a lista antes de adicionar os itens

        items.forEach(item => {
            const li = document.createElement("li");

            const loreFormatted = formatLore(item.lore); // Formata a lore

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
            button.addEventListener("mouseover", function () {
                const lore = decodeURIComponent(button.getAttribute("data-lore"));
                alert(lore);
            });

            produtosUl.appendChild(li);
        });
    }

    fetchRarityItems();
});
