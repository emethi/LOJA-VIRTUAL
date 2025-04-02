document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    let total = 0;

    // Mostrar/esconder detalhes do produto
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', () => {
            const details = button.nextElementSibling;
            details.classList.toggle('hidden');
        });
    });

    // Adicionar ao carrinho
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            cart.push({ name, price });
            updateCart();
        });
    });

    // Atualizar carrinho
    function updateCart() {
        const cartItems = document.querySelector('.cart-items');
        cartItems.innerHTML = '';
        total = 0;

        cart.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <span>${item.name} - R$ ${item.price.toFixed(2)}</span>
                <button class="remove-item" data-index="${index}">Remover</button>
            `;
            cartItems.appendChild(itemDiv);
            total += item.price;
        });

        document.getElementById('cart-total').textContent = `R$ ${total.toFixed(2)}`;
        document.getElementById('cart-count').textContent = cart.length;

        // Adicionar evento de remoção
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', () => {
                const index = parseInt(button.getAttribute('data-index'));
                cart.splice(index, 1);
                updateCart();
            });
        });
    }

    // Abrir/fechar carrinho
    const cartToggle = document.getElementById('cart-toggle');
    const cartLabel = document.getElementById('cart-label');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const closeCart = document.getElementById('close-cart');

    cartToggle.addEventListener('click', () => {
        cartSidebar.classList.toggle('hidden');
        cartSidebar.classList.toggle('active');
    });

    cartLabel.addEventListener('click', () => {
        cartSidebar.classList.toggle('hidden');
        cartSidebar.classList.toggle('active');
    });

    closeCart.addEventListener('click', () => {
        cartSidebar.classList.add('hidden');
        cartSidebar.classList.remove('active');
    });

    // Prosseguir com pedido
    document.getElementById('checkout-btn').addEventListener('click', () => {
        window.location.href = 'https://pagamento.pagbank.com/checkout?total=' + total;
    });

    // Suavizar rolagem para seções
    document.querySelectorAll('.category-nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
});