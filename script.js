// Faça com que as transições sejam assíncronas através de: ajax, fetch e promises
function request(url) {
    document.getElementById('content').innerHTML = '';

    // Exibição do ícone de carregamento
    if (!document.getElementById('loading')) { 
        const imgLoading = document.createElement('img');
        imgLoading.id = 'loading';
        imgLoading.src = 'images/loading.gif';
        imgLoading.className = 'rounded mx-auto d-block';
        document.getElementById('content').appendChild(imgLoading);
    }

    // Utilizando fetch e promises para fazer a requisição
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Requisição finalizada, porém o conteúdo não foi encontrado. Erro ' + response.status);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('content').innerHTML = data;
        })
        .catch(error => {
            document.getElementById('content').innerHTML = error.message;
        })
        .finally(() => {
            // Remover o ícone de carregamento, se existir
            if (document.getElementById('loading')) {
                document.getElementById('loading').remove();
            }
        });
}


// class="sticky-top" do BS não funcionou
// Faz com que a barra de navegação se fixe no topo ao alterar a barra de rolagem
const navbar = document.querySelector('.navbar-bottom');

// Obtem a posição inicial da navegação
const navbarTop = navbar.offsetTop;

// Função para verificar a posição da navegação
function stickyNavigation() {
    // Verifica a posição atual de rolagem
    if (window.pageYOffset >= navbarTop) {
        // Se a posição de rolagem for maior ou igual à posição inicial da navegação, aplica a classe sticky
        navbar.classList.add('fixed-top');
    } else {
        // Caso contrário, remove a classe sticky
        navbar.classList.remove('fixed-top');
    }
}

// Adiciona um ouvinte de evento de rolagem para chamar a função stickyNavigation
window.addEventListener('scroll', stickyNavigation);