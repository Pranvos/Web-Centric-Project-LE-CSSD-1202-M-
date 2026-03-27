document.addEventListener('DOMContentLoaded', function() {

let popup = null; 
// popup
function showCustomAlert(message) {

    //Remove the previous message if one is shown
    if (popup) {
        popup.remove();
    }
    // alert box
    let alertBox = document.createElement('div');
    alertBox.className = 'custom-alert';
    alertBox.innerText = message;
    
    // Add to body
    document.body.appendChild(alertBox);

    popup = alertBox; 
    
    setTimeout(function() {alertBox.remove(); popup = null;}, 1500);
    
    // remove on click
    alertBox.addEventListener('click', function() {
        alertBox.remove();
        popup = null; 
    });
}

// Checkout link handler
let checkoutLinks = document.querySelectorAll('a[href="checkout.html"]');
checkoutLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
        let itemsAdded = Object.keys(localStorage).filter(key => ['re', 'rdr', 'cod', 'rs', 'er', 'hk'].includes(key)).map(key => JSON.parse(localStorage.getItem(key))).length;
        if (itemsAdded === 0) {
            event.preventDefault();
            showCustomAlert('Please add items to cart before checkout');
        }
    });
});

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
            btn.disabled = true; 
            
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
        event.target.classList.add('btn-scale');
    });
    
    // Mouseout listener
    button.addEventListener('mouseout', function(event) {
        event.target.classList.remove('btn-scale');
    });

});


// Hit 'C' on keyboard to view cart items count
document.addEventListener('keydown', function(event) {
    if (event.key === 'c' || event.key === 'C') {
        let itemsInCart = Object.keys(localStorage).filter(key => ['re', 'rdr', 'cod', 'rs', 'er', 'hk'].includes(key)).map(key => JSON.parse(localStorage.getItem(key))).length;
        if (itemsInCart > 0) {
            showCustomAlert('Items in cart: ' + itemsInCart);
        } else {
            showCustomAlert('Cart is empty');
        }
        console.log('Cart items count:', itemsInCart);
    }
});




// ==========================================
// NEW CODE FOR PHASE 3, PART 4 REQUIREMENTS
// ==========================================

// PART 4a: setInterval and setTimeout - Flash Sale Timer
function startFlashSale() {
    const timerDisplay = document.getElementById('flash-sale-timer');

    if (!timerDisplay) return; 

    const STORAGE_KEY = "flashSaleEnd"; 
    let endTime = localStorage.getItem(STORAGE_KEY); 

    //If no timer exists, set one
    if(!endTime){
        endTime = Date.now() + 3600 * 1000; //1 hour from now
        localStorage.setItem(STORAGE_KEY, endTime); 
    }
    else{
        endTime = parseInt(endTime); 
    }

        const intervalId = setInterval(function() {
            let timeRemaining = Math.floor((endTime - Date.now())/1000); 
            let minutes = Math.floor(timeRemaining / 60);
            let seconds = timeRemaining % 60;

            // Add leading zero if less than 10
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            timerDisplay.textContent = `🔥 Flash Sale ends in: ${minutes}:${seconds} 🔥`;

            if (timeRemaining <= 0) {
                clearInterval(intervalId); // Stop the interval
                localStorage.removeItem(STORAGE_KEY);
                timerDisplay.textContent = "Flash Sale Ended!";
                
                // Use setTimeout to remove the message after 3 seconds
                setTimeout(() => {
                    timerDisplay.style.display = 'none';
                }, 3000);
            }
            timeRemaining--;
        }, 1000); // Runs every 1000 milliseconds (1 second) [cite: 48]
    
}

// Start the timer when the page loads
startFlashSale();

// PART 4b: window.scroll() - Back to Top Button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerText = '↑ Top';
backToTopBtn.id = 'backToTopBtn';

document.body.appendChild(backToTopBtn);

// Show button when user scrolls down
window.addEventListener('scroll', function() {
    if (window.scrollY > 200) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

// Scroll back to top when clicked
backToTopBtn.addEventListener('click', function() {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    }); // [cite: 49]
});


const messages = [
    "Free shipping on orders over $50!",
    "Secure checkout guaranteed!",
    "Rated #1 by our customers!"
];

let messageIndex = 0;

function rotateMessages() {
    const banner = document.getElementById("promo-banner");
    if (!banner) return;

    banner.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
}

// Run every 3 seconds
setInterval(rotateMessages, 3000);

});
