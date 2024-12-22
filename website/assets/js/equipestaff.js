document.addEventListener("DOMContentLoaded", () => {
    // URL da API
    const apiURL = "https://dash.legendarycommunity.com.br/api/api_buscar_staffs.php";

    // Função para buscar os dados da API
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

    // Função para popular os dados no HTML
    const populateStaff = (staffData) => {
        // Seleciona as listas de cargos no HTML
        const founderList = document.querySelector(".fundador");
        const adminList = document.querySelector(".administrador");
        const modList = document.querySelector(".moderador");
        const helperList = document.querySelector(".ajudante");

        // Limpa as listas antes de adicionar os dados
        founderList.innerHTML = "";
        adminList.innerHTML = "";
        modList.innerHTML = "";
        helperList.innerHTML = "";

        // Itera sobre os dados da equipe
        staffData.forEach((staff) => {
            const { username, cargo, color } = staff;

            // Cria o item da lista para cada membro da equipe
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <img src="http://cravatar.eu/head/${username}/128.png" alt="${username}">
                <h1>${username}</h1>
                <h2 class="${color}">${cargo}</h2>
            `;

            // Adiciona o item à lista correspondente com base no cargo
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

    // Chama a função para buscar os dados ao carregar a página
    fetchStaffData();
});
