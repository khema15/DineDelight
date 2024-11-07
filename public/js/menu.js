document.addEventListener('DOMContentLoaded', () => {
    let cart = [];
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartButtonContainer = document.getElementById('cart-button-container');
    const goToCartButton = document.getElementById('go-to-cart');
    const cartModal = document.getElementById('cart-modal');
    const cartItemsList = document.getElementById('cart-items-list');
    const proceedButton = document.getElementById('proceed-button');
    const detailsForm = document.getElementById('details-form');
    const cartDetailsForm = document.getElementById('cart-details-form');
    const closeButton = document.querySelector('.close-button');
    const closeCartButton = document.querySelector('.close-cart');

    function validateInputs(name, address, phone) {
        if (!name || !address || !phone) {
            alert('Please fill in all fields.');
            return false;
        }
        return true;
    }
    

    function renderCartItems() {
        cartItemsList.innerHTML = ''; // Clear previous items
        if (cart.length === 0) {
            cartItemsList.innerHTML = '<li>Your cart is empty.</li>';
        } else {
            cart.forEach((item, index) => {
                const listItem = document.createElement('li');
                listItem.textContent = `${index + 1}. ${item.name} - ₹${item.price}`;
                cartItemsList.appendChild(listItem);
            });
        }
    }
    

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const item = event.target.parentElement;
            const itemName = item.querySelector('.item-name').textContent;
            const itemPrice = item.querySelector('.item-price').textContent;
            cart.push({ name: itemName, price: itemPrice });

            if (cart.length > 0) {
                cartButtonContainer.style.display = 'block';
            }
        });
    });

    goToCartButton.addEventListener('click', () => {
        renderCartItems();
        cartModal.style.display = 'block';
    });

    closeCartButton.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    proceedButton.addEventListener('click', () => {
        cartModal.style.display = 'none';
        cartDetailsForm.style.display = 'block';
    });

    closeButton.addEventListener('click', () => {
        cartDetailsForm.style.display = 'none';
    });

    window.onclick = (event) => {
        if (event.target === cartModal || event.target === cartDetailsForm) {
            event.target.style.display = 'none';
        }
    };
    detailsForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent page reload
    
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;
    
        // Validate inputs
        if (!validateInputs(name, address, phone)) return;
    
        const orderDetails = { name, address, phone, cart };
        console.log('Order Details:', orderDetails); // For debugging
    
        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderDetails),
            });
    
            if (response.ok) {
                alert(`Your order has been placed!\n
                       Name: ${name}\n
                       Address: ${address}\n
                       Phone: ${phone}\n
                       Items: ${cart.map(item => item.name).join(', ')}\n
                       Total: ₹${cart.reduce((total, item) => total + parseFloat(item.price), 0)}`);
    
                // Reset form and cart
                detailsForm.reset();
                cart = [];
                cartDetailsForm.style.display = 'none';
            } else {
                alert('Failed to place the order. Please try again.');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Something went wrong. Please try again later.');
        }
    });
    
    });
