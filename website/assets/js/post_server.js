// Função para buscar os dados da API
fetch('https://dash.legendarycommunity.com.br/api/api_buscar_posts.php')
    .then(response => response.json())
    .then(data => {
        // Verifica se há posts
        if (Array.isArray(data) && data.length > 0) {
            const criarDiv = document.querySelector('.criar-div');

            // Para cada post, cria uma nova div
            data.forEach(post => {
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

                // Adiciona o post à div principal
                criarDiv.appendChild(postDiv);
            });
        } else {
            // Exibe uma mensagem se não houver posts
            document.querySelector('.criar-div').innerHTML = "<p>Nenhuma publicação encontrada.</p>";
        }
    })
    .catch(error => {
        console.error('Erro ao carregar os dados:', error);
    });