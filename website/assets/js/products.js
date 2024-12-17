document.addEventListener("DOMContentLoaded", () => {
  const jsonFilePath = "../assets/json/products.json";
  const productsSelect = document.getElementById("products");
  const paymentSelect = document.querySelector("select[name='form_pagaments']");
  let productsData = {}; // Para armazenar os dados do JSON

  // Carregar JSON
  fetch(jsonFilePath)
    .then((response) => {
      if (!response.ok) throw new Error("Erro ao carregar o arquivo JSON.");
      return response.json();
    })
    .then((data) => {
      productsData = data.products; // Salvar os produtos para acesso posterior

      // Preencher o dropdown de produtos
      Object.entries(data.products).forEach(([key, product]) => {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = `${product.nome} - R$${product.valor}`;
        productsSelect.appendChild(option);
      });

      // Preencher o dropdown de formas de pagamento
      Object.entries(data.form_pagaments).forEach(([key, payment]) => {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = payment.title;
        paymentSelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Erro:", error));

  // Botão de enviar
  document.getElementById("send-button").addEventListener("click", function () {
    const usuario = document.getElementById("usuario").value;
    const productKey = document.getElementById("products").value;
    const formPagament = document.getElementById("form_pagaments").value;
  
    if (!productKey || !usuario || !formPagament) {
      showMessage("Por favor, preencha todos os campos.", "error");
      return;
    }
  
    // Obter os detalhes do produto selecionado
    const selectedProduct = productsData[productKey];
    const produtoNome = selectedProduct.nome;
    const produtoValor = parseFloat(selectedProduct.valor); // Conversão para número
    let produtoDescricao = selectedProduct.descricao; // Adicionando descrição do produto

    // Substituir %player% na descrição
    produtoDescricao = produtoDescricao.replace("%player%", usuario);

    if (isNaN(produtoValor)) {
      showMessage("Erro: Valor do produto inválido.", "error");
      return;
    }
  
    const webhookUrl =
      "https://discord.com/api/webhooks/1310835345377464372/NBd978vvgdL8i49WG0nVj6QXcnZjS_b5h5-RYhsLC35ZGsE-4Pmy-JiCbNtD7nX8Mqwk";

    const webhookUrlConsole =
      "https://discord.com/api/webhooks/1310846217407692811/8zWAO4IUBlwUtF0kIxccVbBCxNXkftk5ad3fMlYYX_ZgLxc3bSeMeApqDG_JTykmYSA2";
  
    // Payload para o webhook
    const payload = {
      username: "Legendary Site", // Nome do bot
      avatar_url: "https://i.imgur.com/rc1RZRu.png", // URL para o avatar do bot
      embeds: [
        {
          title: "Pagamento Aprovado!", // Título principal
          description: "Um novo pagamento foi registrado no sistema.",
          color: 3066993, // Cor da barra lateral (em hexadecimal: 0x2ECC71)
          fields: [
            {
              name: "👤 Usuário",
              value: usuario,
              inline: true, // Exibir lado a lado
            },
            {
              name: "🛒 Produto",
              value: produtoNome,
              inline: true,
            },
            {
              name: "💰 Valor",
              value: `R$${produtoValor.toFixed(2)}`,
              inline: true,
            },
            {
              name: "💳 Forma de Pagamento",
              value: formPagament,
              inline: false, // Exibir em uma linha completa
            },
            {
              name: "💻 Comando Para executar!",
              value: produtoDescricao,
              inline: false, // Exibir em uma linha completa
            },
          ],
          footer: {
            text: "Legendary Community",
            icon_url: "https://i.imgur.com/rc1RZRu.png", // Ícone no rodapé
          },
          timestamp: new Date().toISOString(), // Data e hora
        },
      ],
    };
  
    fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          showMessage("Dados enviados com sucesso!", "success");
        } else {
          showMessage("Falha ao enviar os dados.", "error");
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
        showMessage("Ocorreu um erro ao enviar os dados.", "error");
      });

    // Payload para o webhook do console
    const payloadConsole = {
      username: "Legendary Site", // Nome do bot
      avatar_url: "https://i.imgur.com/rc1RZRu.png", // URL para o avatar do bot
      content: `${produtoDescricao}`,
    };
  
    fetch(webhookUrlConsole, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payloadConsole),
    })
      .then((response) => {
        if (response.ok) {
          showMessage("Dados enviados com sucesso!", "success");
        } else {
          showMessage("Falha ao enviar os dados.", "error");
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
        showMessage("Ocorreu um erro ao enviar os dados.", "error");
      });
  });

  function showMessage(message, type) {
    const container = document.getElementById("message-container");
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;

    container.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 5000);
  }
});
