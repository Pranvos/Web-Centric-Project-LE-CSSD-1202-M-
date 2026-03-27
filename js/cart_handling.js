document.addEventListener('DOMContentLoaded', function() {
    const games = [
        { id: 're', name: 'Resident Evil Biohazard', price: 19.99, image: 'images/resident-evil.png', description: 'Experience the ultimate survival horror.' },
        { id: 'rdr', name: 'Red Dead Redemption 2', price: 14.99, image: 'images/red-dead-cover.png', description: 'An epic western adventure.' },
        { id: 'cod', name: 'Call of Duty: Black Ops 7', price: 29.99, image: 'images/black-ops-cover.png', description: 'The latest installment in the Black Ops series.' },
        { id: 'rs', name: 'Rock Simulator', price: 24.99, image: 'images/rock-simulator-cover.png', description: 'Experience the thrill of rock climbing.' },
        { id: 'er', name: 'Elden Ring', price: 59.99, image: 'images/elder-ring-cover.png', description: 'A dark fantasy action RPG.' },
        { id: 'hk', name: 'Hollow Knight', price: 14.99, image: 'images/hollow-knight-cover.png', description: 'A challenging metroidvania adventure.' }
    ];

    const addToCartButtons = document.querySelectorAll('button[id^="re"], button[id^="rdr"], button[id^="cod"], button[id^="rs"], button[id^="er"], button[id^="hk"]');
    
    addToCartButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Handle add to cart functionality
            let itemId = button.id; // Get the ID of the clicked button
            let item = games.find(game => game.id === itemId); // Find the corresponding game
            localStorage.setItem(item.id, JSON.stringify(item)); // Store the item in localStorage
        });
    });

    // Update the cart display
    let items = Object.keys(localStorage).filter(key => ['re', 'rdr', 'cod', 'rs', 'er', 'hk'].includes(key)).map(key => JSON.parse(localStorage.getItem(key)));
    let itemsInCart = Object.keys(localStorage).filter(key => ['re', 'rdr', 'cod', 'rs', 'er', 'hk'].includes(key)).length;
    if (itemsInCart > 0 && location.pathname === '/cart.html') {
        document.getElementById('shoppingCartH2').innerText = 'Your Shopping Cart';
        document.getElementById('shoppingCartP').style.display = 'none';
        let cartSection = document.getElementById('cart');
        let hr = document.createElement('hr');
        let hr2 = document.createElement('hr');
        for (let item of items) {
            let cartItem = document.createElement('div');
            let div = document.createElement('div');
            let div2 = document.createElement('div');
            let itemDescription = document.createElement('p');
            let itemPrice = document.createElement('p');
            let itemImage = document.createElement('img');
            let removeButton = document.createElement('button');

            div.style.display = 'flex';
            div.style.flexDirection = 'column';
            div.style.justifyContent = 'space-between';
            div2.style.display = 'flex';
            div2.style.justifyContent = 'space-between';
            div2.style.gap = '20px';
            itemDescription.innerHTML = `<strong>${item.name}</strong><br><br>${item.description}`;
            itemDescription.style.textAlign = 'left';
            itemPrice.innerText = `$${item.price.toFixed(2)}`;
            itemImage.src = item.image;
            itemImage.alt = `${item.name} Cover`;
            itemImage.style.width = '30vw';
            itemImage.style.maxWidth = '200px';
            cartItem.classList.add('cart-item');
            removeButton.innerText = 'Remove';
            removeButton.addEventListener('click', function() {
                localStorage.removeItem(item.id); 
                location.reload(); 
            });

            div2.appendChild(itemImage);
            div2.appendChild(itemDescription);
            div.appendChild(itemPrice);
            div.appendChild(removeButton);
            cartItem.appendChild(div2);
            cartItem.appendChild(div);
            cartSection.appendChild(cartItem);
        }
        let mainElement = document.getElementById('cartMain');
        let div = document.createElement('div');
        div.style.display = 'flex';
        div.style.justifyContent = 'space-between';
        div.style.margin = '4vw 8vw';
        mainElement.appendChild(hr);
        mainElement.appendChild(div);

        let checkoutButton = document.createElement('button');
        checkoutButton.innerText = 'Proceed to Checkout';
        checkoutButton.style.marginTop = '20px';
        div.appendChild(checkoutButton);
        checkoutButton.addEventListener('click', function() {
            window.location.href = 'checkout.html';
        });

        let totalPrice = items.reduce((total, item) => total + item.price, 0);
        let totalPriceElement = document.createElement('p');
        totalPriceElement.style.fontWeight = 'bold';
        totalPriceElement.style.marginTop = '20px';
        totalPriceElement.innerText = `Subtotal (${itemsInCart} items): $${totalPrice.toFixed(2)}`;
        div.appendChild(totalPriceElement);
        
        mainElement.appendChild(hr2);
    }

    // Render order summary on checkout page
if (location.pathname.includes('checkout')) {
    let cartItems = Object.keys(localStorage)
        .filter(key => ['re', 'rdr', 'cod', 'rs', 'er', 'hk'].includes(key))
        .map(key => JSON.parse(localStorage.getItem(key)));

    let orderItemsList = document.getElementById('order-items-list');
    let orderTotal = document.getElementById('order-total');

    if (orderItemsList && orderTotal) {
        if (cartItems.length === 0) {
            orderItemsList.innerHTML = '<p style="color:#aaa;">No items in cart.</p>';
            orderTotal.textContent = 'Total: $0.00';
        } else {
            cartItems.forEach(function(item) {
                let row = document.createElement('div');
                row.style.display = 'flex';
                row.style.justifyContent = 'space-between';
                row.style.padding = '4px 0';
                row.innerHTML = '<span>' + item.name + '</span><span>$' + item.price.toFixed(2) + '</span>';
                orderItemsList.appendChild(row);
            });
            let subtotal = cartItems.reduce(function(sum, item) { return sum + item.price; }, 0);
            let taxRate = 0.13; 
            let tax = subtotal * taxRate;
            let grandTotal = subtotal + tax;

            let subtotalRow = document.createElement('div');
            subtotalRow.style.display = 'flex';
            subtotalRow.style.justifyContent = 'space-between';
            subtotalRow.style.padding = '4px 0';
            subtotalRow.innerHTML = '<span>Subtotal</span><span>$' + subtotal.toFixed(2) + '</span>';
            orderItemsList.appendChild(subtotalRow);

            let taxRow = document.createElement('div');
            taxRow.style.display = 'flex';
            taxRow.style.justifyContent = 'space-between';
            taxRow.style.padding = '4px 0';
            taxRow.innerHTML = '<span>Tax (13% HST)</span><span>$' + tax.toFixed(2) + '</span>';
            orderItemsList.appendChild(taxRow);

            orderTotal.textContent = 'Total: $' + grandTotal.toFixed(2);
        }
    }
}
});

