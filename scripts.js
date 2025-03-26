// Função para transição ao clicar no botão de entrada
document.querySelector('.entry-button').addEventListener('click', function(e) {
    e.preventDefault(); // Evita o redirecionamento imediato
    document.body.classList.add('fade-out'); // Adiciona classe para animação

    // Aguarda o fim da animação para redirecionar
    setTimeout(() => {
        window.location.href = this.href;
    }, 500); // Tempo deve coincidir com a animação no CSS
});

// Adiciona classe ao carregar a página para animação de entrada
window.addEventListener('load', () => {
    document.body.classList.add('fade-in');
});