// Configuração inicial
let posts = [];
let currentBatch = 0; // Lote atual
const batchSize = 10; // Número de posts por lote

// Função para renderizar um lote de posts
function renderPostsBatch() {
    const criarDiv = document.querySelector('.criar-div');
    const start = currentBatch * batchSize;
    const end = start + batchSize;

    const batch = posts.slice(start, end);

    batch.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');

        // Estrutura do post
        postDiv.innerHTML = `
            <div class="article-thumbnail-posts" style="background-image:url(assets/img/2024-12-19_19.24.17.png)"></div>
            <div class="article-content">
                <h2 class="post-title">${post.titulo}</h2>
                <p>${post.descricao}</p>
                <ul class="list">
                    <li><i class="fas fa-user"></i> ${post.autor}</li>
                    <li><i class="fas fa-calendar"></i> ${post.data}</li>
                </ul>
            </div>
            <br>
        `;

        criarDiv.appendChild(postDiv);
    });

    currentBatch++;
}

// Função para buscar os dados da API
fetch('https://dash.legendarycommunity.com.br/api/api_buscar_posts.php')
    .then(response => response.json())
    .then(data => {
        if (Array.isArray(data) && data.length > 0) {
            posts = data; // Armazena os posts para carregamento em lotes
            renderPostsBatch(); // Carrega o primeiro lote

            // Observador para carregar mais posts ao rolar
            const observerTarget = document.querySelector('.observer-target');
            const observer = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    if (currentBatch * batchSize < posts.length) {
                        renderPostsBatch();
                    }
                }
            });

            observer.observe(observerTarget);
        } else {
            document.querySelector('.criar-div').innerHTML = "<p>Nenhuma publicação encontrada.</p>";
        }
    })
    .catch(error => {
        console.error('Erro ao carregar os dados:', error);
    });
