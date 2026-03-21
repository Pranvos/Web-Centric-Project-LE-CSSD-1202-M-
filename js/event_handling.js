document.addEventListener('DOMContentLoaded', function() {

// popup
function showCustomAlert(message) {
    // alert box
    let alertBox = document.createElement('div');
    alertBox.className = 'custom-alert';
    alertBox.innerText = message;
    
    // Add to body
    document.body.appendChild(alertBox);
    
    setTimeout(function() {alertBox.remove();}, 1500);
    
    // remove on click
    alertBox.addEventListener('click', function() {
        alertBox.remove();
    });
}

const addToCartButtons = document.querySelectorAll('button[type="button"]');

addToCartButtons.forEach(function(button) {
    button.addEventListener('click', function(event) {
        console.log('Mouse button used:', event.button);
        
        let btn = event.target;
        
        if (btn.innerText.includes('Add to Cart') && !btn.innerText.includes('Added')) {
            btn.innerText = 'Added to Cart ✓';
            btn.style.backgroundColor = "green";
            btn.style.color = 'white';
            btn.disabled = false;
            btn.style.cursor = 'pointer';
            btn.setAttribute('data-added', 'true');
            
            showCustomAlert('Item added to cart now');
        } else if (btn.innerText.includes('Added to Cart')) {
            btn.innerText = 'Add to Cart';
            btn.style.backgroundColor = '';
            btn.style.color = '';
            btn.disabled = false;
            btn.style.cursor = 'pointer';
            btn.removeAttribute('data-added');
        }
    });
    
    // Mouseover listener
    button.addEventListener('mouseover', function(event) {
        event.target.style.transform = 'scale(1.05)';
    });
    
    // Mouseout listener
    button.addEventListener('mouseout', function(event) {
        event.target.style.transform = 'scale(1)';
    });
});


// Hit 'C' on keyboard to view cart items count
document.addEventListener('keydown', function(event) {
    if (event.key === 'c' || event.key === 'C') {
        let itemsInCart = document.querySelectorAll('button[data-added="true"]').length;
        if (itemsInCart > 0) {
            showCustomAlert('Items in cart: ' + itemsInCart);
        } else {
            showCustomAlert('Cart is empty');
        }
        console.log('Cart items count:', itemsInCart);
    }
});

// Checkout link handler
let checkoutLinks = document.querySelectorAll('a[href="checkout.html"]');
checkoutLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
        let itemsAdded = document.querySelectorAll('button[data-added="true"]');
        if (itemsAdded.length === 0) {
            event.preventDefault();
            showCustomAlert('Please add items to cart before checkout');
        }
    });
});

// Form submission handler
let form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function(event) {
        let nameInput = document.getElementById('name');
        if (nameInput && !nameInput.value.trim()) {
            event.preventDefault();
            showCustomAlert('Please provide a name before placing order');
        }
    });
}
});