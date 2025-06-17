document.addEventListener('DOMContentLoaded', () => {
    // Cart functionality
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartToggle = document.getElementById('cart-toggle');
    const cartSidebar = document.getElementById('cart-sidebar');
    
    // Sample product data
    const products = [
        {
            id: 1,
            name: 'Wireless Headphones',
            price: 199.99,
            description: 'High-quality noise-canceling wireless headphones',
            image: 'headphones.jpg'
        },
        {
            id: 2,
            name: 'Smart Watch',
            price: 299.99,
            description: 'Fitness tracking and smart notifications',
            image: 'smartwatch.jpg'
        }
    ];

    // Render products
    const productGrid = document.querySelector('.product-grid');
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        productGrid.appendChild(productCard);
    });

    // Cart functions
    function updateCartCount() {
        document.getElementById('cart-count').textContent = cart.length;
    }

    function updateCartDisplay() {
        const cartItems = document.querySelector('.cart-items');
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            total += product.price * item.quantity;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <h4>${product.name}</h4>
                <p>Quantity: 
                    <button class="quantity-btn" data-id="${product.id}" data-action="decrease">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" data-id="${product.id}" data-action="increase">+</button>
                </p>
                <p>$${(product.price * item.quantity).toFixed(2)}</p>
                <button class="remove-btn" data-id="${product.id}">Remove</button>
            `;
            cartItems.appendChild(cartItem);
        });

        document.getElementById('cart-total').textContent = total.toFixed(2);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Event listeners
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.id);
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ id: productId, quantity: 1 });
            }
            
            updateCartCount();
            updateCartDisplay();
        }

        if (e.target.classList.contains('quantity-btn')) {
            const productId = parseInt(e.target.dataset.id);
            const action = e.target.dataset.action;
            const item = cart.find(item => item.id === productId);

            if (action === 'increase') {
                item.quantity++;
            } else if (action === 'decrease' && item.quantity > 1) {
                item.quantity--;
            }
            
            updateCartDisplay();
        }

        if (e.target.classList.contains('remove-btn')) {
            const productId = parseInt(e.target.dataset.id);
            cart = cart.filter(item => item.id !== productId);
            updateCartCount();
            updateCartDisplay();
        }
    });

    // Cart toggle
    cartToggle.addEventListener('click', () => {
        cartSidebar.classList.toggle('active');
        cartToggle.setAttribute('aria-expanded', cartSidebar.classList.contains('active'));
    });

    document.getElementById('cart-close').addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        cartToggle.setAttribute('aria-expanded', 'false');
    });

    // Initialize cart
    updateCartCount();
    updateCartDisplay();
});