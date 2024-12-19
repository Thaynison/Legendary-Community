document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://dash.legendarycommunity.com.br/api/api_buscar_rarity_itens.php";
    
    let alertBox = null; // Variável para armazenar o alerta único

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
            showAlert("Não foi possível carregar os itens. Tente novamente mais tarde.", "error");
        }
    }

    function showAlert(message, type = "info") {
        // Verifica se já existe um alerta na página
        if (!alertBox) {
            alertBox = document.createElement('div');
            alertBox.classList.add('alert', type);

            const closeButton = document.createElement('button');
            closeButton.classList.add('close-btn');
            closeButton.textContent = '×';
            closeButton.onclick = () => alertBox.classList.remove('show'); // Fecha o alerta ao clicar

            alertBox.appendChild(closeButton);
            document.body.appendChild(alertBox);
        }

        // Atualiza o conteúdo do alerta
        alertBox.innerHTML = message;
        alertBox.appendChild(closeButton); // Re-add o botão de fechar (caso tenha sido removido)

        // Mostra o alerta
        alertBox.classList.add('show');

        // Adiciona evento de mouseover para que o alerta não desapareça enquanto o mouse estiver sobre ele
        alertBox.addEventListener('mouseover', () => {
            alertBox.classList.add('show');
        });
    }

    function hideAlert() {
        if (alertBox) {
            alertBox.classList.remove('show');
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
                if (!alertBox) { // Só cria um alerta se não houver um visível
                    const lore = decodeURIComponent(button.getAttribute("data-lore"));
                    showAlert(lore, "info"); // Mostra o alerta customizado com a lore
                }
            });

            button.addEventListener("mouseout", function () {
                hideAlert(); // Esconde o alerta quando o mouse sair do item
            });

            produtosUl.appendChild(li);
        });
    }

    fetchRarityItems();
});
