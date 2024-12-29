document.addEventListener("DOMContentLoaded", () => {
    const apiURL = "https://dash.legendarycommunity.com.br/api/api_buscar_staffs.php";

    const fetchStaffData = async () => {
        try {
            const response = await fetch(apiURL, { method: "GET" });
            if (!response.ok) {
                throw new Error(`Erro na API: ${response.status}`);
            }

            const staffData = await response.json();
            populateStaff(staffData);
        } catch (error) {
            console.error("Erro ao buscar dados da API:", error);
        }
    };

    const populateStaff = (staffData) => {
        const founderList = document.querySelector(".fundador");
        const adminList = document.querySelector(".administrador");
        const modList = document.querySelector(".moderador");
        const helperList = document.querySelector(".ajudante");

        founderList.innerHTML = "";
        adminList.innerHTML = "";
        modList.innerHTML = "";
        helperList.innerHTML = "";

        // Cria tooltip (caixa flutuante) para exibir as descrições
        const tooltip = document.createElement("div");
        tooltip.className = "tooltip";
        document.body.appendChild(tooltip);

        // Estilo básico para a tooltip
        const tooltipStyle = `
            .tooltip {
                position: absolute;
                padding: 8px;
                background-color: rgba(0, 0, 0, 0.8);
                color: #fff;
                border-radius: 5px;
                font-size: 12px;
                text-align: center;
                display: none;
                pointer-events: none;
                z-index: 1000;
                transform: translateX(-50%);
            }
        `;
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = tooltipStyle;
        document.head.appendChild(styleSheet);

        staffData.forEach((staff) => {
            const { username, cargo, color, descricao } = staff;

            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <img src="http://cravatar.eu/head/${username}/128.png" alt="${username}">
                <h1>${username}</h1>
                <h2 class="${color}">${cargo}</h2>
            `;

            // Adiciona eventos de mouse para exibir a descrição
            const imgElement = listItem.querySelector("img");
            imgElement.addEventListener("mouseover", (event) => {
                tooltip.textContent = descricao; // Exibe a descrição
                tooltip.style.display = "block";
                const rect = imgElement.getBoundingClientRect();
                tooltip.style.left = `${rect.left + rect.width / 2}px`;
                tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`; // 10px acima da imagem
            });

            imgElement.addEventListener("mouseout", () => {
                tooltip.style.display = "none";
            });

            switch (cargo.toLowerCase()) {
                case "fundador":
                    founderList.appendChild(listItem);
                    break;
                case "administrador":
                    adminList.appendChild(listItem);
                    break;
                case "moderador":
                    modList.appendChild(listItem);
                    break;
                case "ajudante":
                    helperList.appendChild(listItem);
                    break;
                default:
                    console.warn(`Cargo desconhecido: ${cargo}`);
            }
        });
    };

    fetchStaffData();
});
