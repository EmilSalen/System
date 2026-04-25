const STORAGE_KEY = "pc_store_cart";

export let cart = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

export function addToCart(product) {
  // Check if product already in cart, increment quantity if so
  const existingIndex = cart.findIndex(item => item.id === product.id);
  if (existingIndex !== -1) {
    cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  renderCart();
  updateCartCount();

  // Trigger add to cart animations
  const cartButton = document.querySelector(".cart-button");
  const cartCount = document.getElementById("cartCount");

  // Remove animation classes first to reset
  cartButton.classList.remove("cart-button-bounce");
  cartCount.classList.remove("cart-badge-pulse");

  // Force browser reflow
  void cartButton.offsetWidth;

  // Add animation classes
  cartButton.classList.add("cart-button-bounce");
  cartCount.classList.add("cart-badge-pulse");

  // Remove classes after animation completes
  setTimeout(() => {
    cartButton.classList.remove("cart-button-bounce");
    cartCount.classList.remove("cart-badge-pulse");
  }, 450);

  // Show confirmation modal
  if (window.openAddCartConfirm) {
    window.openAddCartConfirm(product);
  }
}

export function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const countElement = document.getElementById("cartCount");
  if (countElement) {
    countElement.textContent = totalItems;
  }
  
  // Update cart page items count
  const cartItemsCount = document.getElementById("cartItemsCount");
  if (cartItemsCount) {
    const itemLabel = cart.length === 1 ? 'item' : 'items';
    cartItemsCount.textContent = `${cart.length} ${itemLabel}`;
  }
}

export function renderCart() {
  const container = document.getElementById("cartItemsContainer") || document.getElementById("cartItems");
  if (!container) return;
  
  container.innerHTML = "";
  container.setAttribute("role", "list");

  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <p class="cart-empty-message">Your cart is empty</p>
        <p class="cart-empty-subtext">Add items to continue checkout</p>
      </div>
    `;
    
    const cartTotal = document.getElementById("cartTotal");
    const cartSubtotal = document.getElementById("cartSubtotal");
    const deliveryFee = document.getElementById("deliveryFee");
    
    if (cartTotal) cartTotal.textContent = "0";
    if (cartSubtotal) cartSubtotal.textContent = "0";
    if (deliveryFee) deliveryFee.textContent = "0";
    
    return;
  }

  cart.forEach((item, index) => {
    const quantity = item.quantity || 1;
    const itemTotal = item.price * quantity;
    total += itemTotal;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.setAttribute("role", "listitem");

    // Safely get values with fallbacks
    const productName = item.name || 'Unnamed Product';
    const productPrice = item.price || 0;
    const productImage = item.image || 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    const productDescription = item.description || '';

    div.innerHTML = `
      <div class="cart-item-row">
        <div class="cart-item-image">
          <img src="${productImage}" alt="${productName} thumbnail" class="cart-item-thumbnail">
        </div>
        
        <div class="cart-item-info">
          <p class="cart-item-name">${productName}</p>
          <p class="cart-item-description">${productDescription}</p>
          <p class="cart-item-price">₱${productPrice.toLocaleString()} each</p>
          
          <div class="cart-item-controls">
            <div class="cart-item-quantity" role="group" aria-label="Quantity controls">
              <button onclick="decrementQuantity(${index})" aria-label="Decrease quantity of ${productName}">-</button>
              <span aria-label="Quantity: ${quantity}">${quantity}</span>
              <button onclick="incrementQuantity(${index})" aria-label="Increase quantity of ${productName}">+</button>
            </div>
          </div>
        </div>

        <div class="cart-item-actions">
          <button onclick="removeFromCart(${index})" class="remove-btn-small" aria-label="Remove ${productName} from cart">×</button>
          <p class="cart-item-total">₱${itemTotal.toLocaleString()}</p>
        </div>
      </div>
    `;

    container.appendChild(div);
  });

  // Update all summary totals
  const subtotalElement = document.getElementById("cartSubtotal");
  const totalElement = document.getElementById("cartTotal");
  const deliveryFee = document.getElementById("deliveryFee");
  
  if (subtotalElement) {
    subtotalElement.textContent = total.toLocaleString();
  }
  if (totalElement) {
    totalElement.textContent = total.toLocaleString();
  }
  if (deliveryFee) {
    deliveryFee.textContent = "0";
  }
}

export function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
  updateCartCount();
}

export function clearCart() {
  cart = [];
  saveCart();
  renderCart();
  updateCartCount();
}

export function incrementQuantity(index) {
  if (cart[index].stock && cart[index].quantity >= cart[index].stock) {
    alert("Maximum stock reached!");
    return;
  }
  cart[index].quantity = (cart[index].quantity || 1) + 1;
  saveCart();
  renderCart();
  updateCartCount();
}

export function decrementQuantity(index) {
  if (cart[index].quantity <= 1) {
    removeFromCart(index);
  } else {
    cart[index].quantity--;
    saveCart();
    renderCart();
    updateCartCount();
  }
}

// Expose to window for inline handlers
window.removeFromCart = removeFromCart;
window.incrementQuantity = incrementQuantity;
window.decrementQuantity = decrementQuantity;

export function getCartTotal() {
  return cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
}

// ==============================================
// RECOMMENDATION SYSTEM (ISOLATED FOR CART PAGE)
// ==============================================

function getAllProducts() {
  return [
    { id: 1, name: "Entry Level Gaming PC", price: 24999, image: "PCimages/EntryLevelGamingPc.jpg", category: "pc" },
    { id: 2, name: "ES Gaming Tower PC", price: 39999, image: "PCimages/EsgamingTowerPc.jpg", category: "pc" },
    { id: 3, name: "Cyborg Gaming PC", price: 54999, image: "PCimages/CyborgGaming.jpg", category: "pc" },
    { id: 4, name: "Office Desktop PC", price: 14999, image: "PCimages/OfficeDesktop.jpg", category: "pc" },
    { id: 5, name: "Gaming Piso WiFi", price: 12999, image: "PisoWifiimages/GamingPisoWifi.jpg", category: "wifi" },
    { id: 6, name: "Advance Gaming Piso WiFi", price: 18999, image: "PisoWifiimages/PisoWifiAdvanceGamingSetup.jpg", category: "wifi" },
    { id: 7, name: "Ordinary Piso WiFi", price: 8999, image: "PisoWifiimages/PisoWifiOrdinaryBuild.jpg", category: "wifi" }
  ];
}

function getRecommendedProducts() {
  const allProducts = getAllProducts();
  const cartProductIds = cart.map(item => item.id);
  
  // Filter out products already in cart
  let availableProducts = allProducts.filter(product => !cartProductIds.includes(product.id));
  
  if (cart.length === 0) {
    // Empty cart: show first 3 popular products
    return availableProducts.slice(0, 3);
  }
  
  // Analyze cart categories
  const hasPC = cart.some(item => item.category === "pc");
  const hasWiFi = cart.some(item => item.category === "wifi");
  
  if (hasPC && !hasWiFi) {
    // Only PC in cart: recommend PCs
    const pcProducts = availableProducts.filter(p => p.category === "pc");
    return pcProducts.slice(0, 3);
  } else if (hasWiFi && !hasPC) {
    // Only WiFi in cart: recommend WiFi
    const wifiProducts = availableProducts.filter(p => p.category === "wifi");
    return wifiProducts.slice(0, 3);
  } else {
    // Mixed cart: balanced mix
    const pcProducts = availableProducts.filter(p => p.category === "pc");
    const wifiProducts = availableProducts.filter(p => p.category === "wifi");
    return [...pcProducts.slice(0, 2), ...wifiProducts.slice(0, 1)].slice(0, 3);
  }
}

export function renderRecommendations() {
  const grid = document.getElementById("recommendGrid");
  if (!grid) return; // Only run on cart page
  
  grid.innerHTML = "";
  const recommendations = getRecommendedProducts();
  
  recommendations.forEach((product, index) => {
    const card = document.createElement("div");
    card.className = "recommend-card";
    card.style.animationDelay = `${index * 0.15}s`;
    
    card.innerHTML = `
      <div class="recommend-img">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </div>
      <div class="recommend-info">
        <h4>${product.name}</h4>
        <p class="recommend-price">₱${product.price.toLocaleString()}</p>
        <button class="recommend-btn" onclick='addToCart(${JSON.stringify(product).replace(/'/g, "\\'")})'>
          Add to Cart
        </button>
      </div>
    `;
    
    grid.appendChild(card);
  });
}

// Initialize recommendations on cart page load
document.addEventListener("DOMContentLoaded", function() {
  setTimeout(() => {
    renderRecommendations();
  }, 100);
});

// Auto-refresh recommendations when cart changes
const originalRenderCart = renderCart;
renderCart = function() {
  originalRenderCart();
  renderRecommendations();
};

// Checkout Functionality
export function proceedCheckout() {
  // Check if user is logged in
  const currentUser = localStorage.getItem("storeUsername");
  if (!currentUser) {
    // Show error message
    showCheckoutError("Please log in first to continue checkout");
    
    // FORCE REDIRECT - use window.setTimeout to ensure it executes in global scope
    window.setTimeout(function() {
      // Direct hard redirect - this will always work
      window.location.replace('index.html?openLogin=true');
    }, 1200); // 1.2 seconds
    
    return;
  }

  // Check if cart is empty
  if (cart.length === 0) {
    showCheckoutError("Your cart is empty");
    return;
  }

  // Get form values
  const deliveryAddress = document.getElementById("deliveryAddress").value.trim();
  const contactNumber = document.getElementById("contactNumber").value.trim();

  // Validate both fields
  if (!deliveryAddress && !contactNumber) {
    showCheckoutError("Please enter delivery address and contact number");
    return;
  }

  // Validate delivery address
  if (!deliveryAddress) {
    showCheckoutError("Please enter your delivery address");
    return;
  }

  // Validate contact number
  if (!contactNumber) {
    showCheckoutError("Please enter your contact number");
    return;
  }

  // All validations passed - show success modal
  showCheckoutSuccess();
}

function showCheckoutError(message) {
  // Prevent multiple overlays from stacking
  if (document.querySelector('.checkout-error-overlay.active')) {
    return;
  }
  
  const errorMessage = document.getElementById("checkoutErrorMessage");
  const errorOverlay = document.getElementById("checkoutErrorOverlay");
  const errorModal = document.querySelector(".checkout-error-modal");
  
  if (errorMessage) {
    errorMessage.textContent = message;
  }
  
  if (errorOverlay) {
    errorOverlay.classList.add('active');
    // Activate modal after overlay with slight delay for animation
    setTimeout(() => {
      if (errorModal) {
        errorModal.classList.add('active');
      }
    }, 50);
  }
}

function showCheckoutSuccess() {
  // Prevent multiple overlays from stacking
  if (document.querySelector('.checkout-success-overlay.active')) {
    return;
  }
  
  const successOverlay = document.getElementById("checkoutSuccessOverlay");
  const successModal = document.querySelector(".checkout-success-modal");
  
  if (successOverlay) {
    successOverlay.classList.add('active');
    // Activate modal after overlay with slight delay for animation
    setTimeout(() => {
      if (successModal) {
        successModal.classList.add('active');
      }
    }, 50);
  }
}

window.closeCheckoutError = function() {
  const errorOverlay = document.getElementById("checkoutErrorOverlay");
  const errorModal = document.querySelector(".checkout-error-modal");
  
  // First close modal
  if (errorModal) {
    errorModal.classList.remove('active');
  }
  
  // Then close overlay after modal animation
  setTimeout(() => {
    if (errorOverlay) {
      errorOverlay.classList.remove('active');
    }
  }, 200);
}

window.closeCheckoutSuccess = function() {
  const successOverlay = document.getElementById("checkoutSuccessOverlay");
  const successModal = document.querySelector(".checkout-success-modal");
  
  // First close modal
  if (successModal) {
    successModal.classList.remove('active');
  }
  
  // Then close overlay after modal animation
  setTimeout(() => {
    if (successOverlay) {
      successOverlay.classList.remove('active');
    }
    
    // Wait for UI to update before clearing cart
    setTimeout(() => {
      // Clear cart
      cart = [];
      saveCart();
      renderCart();
      updateCartCount();
      
      // Clear form fields
      document.getElementById("deliveryAddress").value = "";
      document.getElementById("contactNumber").value = "";
      
      // Reset delivery method
      const deliveryMethod = document.getElementById("deliveryMethod");
      if (deliveryMethod) {
        deliveryMethod.value = "0";
        if (typeof updateDeliveryTotals === 'function') {
          updateDeliveryTotals();
        }
      }
      
      // Redirect to homepage after everything is updated
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 200);
    }, 200);
  }, 300);
}

// Expose checkout function to window
window.proceedCheckout = proceedCheckout;
