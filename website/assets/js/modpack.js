document.getElementById('downloadBtnVanilla').addEventListener('click', function() {
    fetch('https://api.github.com/repos/Thaynison/Legendary-Community/releases/latest')
        .then(response => response.json())
        .then(data => {
            const asset = data.assets[0];
            if (asset) {
                window.location.href = asset.browser_download_url;
            } else {
                alert('Nenhum arquivo disponível para download.');
            }
        })
        .catch(error => {
            console.error('Erro ao obter a última release:', error);
            alert('Erro ao obter a última release.');
        });
});

document.getElementById('downloadBtnIndustrial').addEventListener('click', function() {
    fetch('https://api.github.com/repos/Thaynison/Legendary-Community-Industrial/releases/latest')
        .then(response => response.json())
        .then(data => {
            const asset = data.assets[0];
            if (asset) {
                window.location.href = asset.browser_download_url;
            } else {
                alert('Nenhum arquivo disponível para download.');
            }
        })
        .catch(error => {
            console.error('Erro ao obter a última release:', error);
            alert('Erro ao obter a última release.');
        });
});

document.getElementById('downloadBtnTextureSurvival').addEventListener('click', function() {
    fetch('https://api.github.com/repos/Thaynison/LegendaryTexture/releases/latest')
        .then(response => response.json())
        .then(data => {
            const asset = data.assets[0];
            if (asset) {
                window.location.href = asset.browser_download_url;
            } else {
                alert('Nenhum arquivo disponível para download.');
            }
        })
        .catch(error => {
            console.error('Erro ao obter a última release:', error);
            alert('Erro ao obter a última release.');
        });
});