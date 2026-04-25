import { getProducts, saveOrder } from "./api.js";
import { addToCart, cart, renderCart, removeFromCart, clearCart, getCartTotal, updateCartCount } from "./cart.js";

// Get current user info for orders
function getCurrentUserInfo() {
  const currentUser = localStorage.getItem("storeUsername");
  let customerInfo = {
    customerName: 'Guest',
    username: '',
    customerEmail: '',
    customerPhone: '',
    address: ''
  };
  
  if (currentUser) {
    const users = JSON.parse(localStorage.getItem('storeUsers') || '{}');
    if (users[currentUser]) {
      const user = users[currentUser];
      customerInfo.customerName = (user.firstName || '') + ' ' + (user.lastName || '').trim();
      customerInfo.username = currentUser;
      customerInfo.customerEmail = user.email || '';
      customerInfo.customerPhone = user.phone || '';
      customerInfo.address = user.address || '';
    }
  }
  
  return customerInfo;
}

window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;

let allProducts = [];
let currentProducts = [];
let currentSelectedProduct = null;
let productQuantity = 1;

// CART OPEN/CLOSE WITH OVERLAY
window.openCart = function () {
  document.getElementById("cartModal").classList.add("active");
  document.getElementById("cartOverlay").classList.add("active");
  document.body.classList.add("cart-open");
  renderCart(); // Ensure cart content is rendered when opening
};

window.closeCart = function () {
  document.getElementById("cartModal").classList.remove("active");
  document.getElementById("cartOverlay").classList.remove("active");
  document.body.classList.remove("cart-open");
};

// Checkout modal functions
window.openCheckoutConfirm = function () {
  document.getElementById("checkoutConfirmOverlay").classList.add("active");
  document.getElementById("checkoutConfirmModal").classList.add("active");
};

window.closeCheckoutConfirm = function () {
  document.getElementById("checkoutConfirmOverlay").classList.remove("active");
  document.getElementById("checkoutConfirmModal").classList.remove("active");
};

// Empty cart modal functions
window.openEmptyCartModal = function () {
  document.getElementById("emptyCartOverlay").classList.add("active");
  document.getElementById("emptyCartModal").classList.add("active");
};

window.closeEmptyCartModal = function () {
  document.getElementById("emptyCartOverlay").classList.remove("active");
  document.getElementById("emptyCartModal").classList.remove("active");
};

window.proceedCheckout = function () {
  if (cart.length === 0) {
    openEmptyCartModal();
    return;
  }
  
  // Check if user is logged in
  if (!currentUser) {
    closeCart();
    openLoginModal();
    alert("Please login before proceeding to checkout");
    return;
  }

  // Open modern confirmation modal
  openCheckoutConfirm();
};

window.confirmCheckout = function () {
  closeCheckoutConfirm();
  
  // Get customer info
  const customerInfo = getCurrentUserInfo();
  
  // Create order with customer info
  const order = {
    customerName: customerInfo.customerName,
    username: customerInfo.username,
    customerEmail: customerInfo.customerEmail,
    customerPhone: customerInfo.customerPhone,
    items: cart.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity || 1,
      image: item.image
    })),
    total: getCartTotal(),
    paymentMethod: 'Cash',
    shippingAddress: customerInfo.address,
    orderStatus: 'Pending',
    paymentStatus: 'Unpaid'
  };

  saveOrder(order).then((result) => {
    if (result.success) {
      console.log('Order placed successfully:', result.order);
    }
    cart.length = 0;
    renderCart();
    updateCartCount();
    closeCart();
  });
};

// ===== PRODUCT MODAL FUNCTIONS =====
window.openProductModal = function (product) {
  currentSelectedProduct = product;
  productQuantity = 1;
  
  const modalImage = document.getElementById("modalProductImage");
  modalImage.src = product.image;
  document.getElementById("modalProductName").textContent = product.name;
  
  // Hide/Show elements based on product type
  const priceElement = document.getElementById("modalProductPrice");
  const quantitySelector = document.querySelector(".product-quantity-selector");
  const addCartBtn = document.querySelector(".product-add-cart-btn");
  const buyNowBtn = document.querySelector(".product-buy-now-btn");
  
  if (product.isCustom) {
    // Hide unwanted elements for Custom Build
    priceElement.style.display = 'none';
    quantitySelector.style.display = 'none';
    addCartBtn.style.display = 'none';
    
    // Customize Buy Now button to Start Build
    buyNowBtn.textContent = 'Start Build';
    buyNowBtn.onclick = function() {
      closeProductModal();
      openCustomBuildModal();
    };
    
    // Render only Description (no Specifications)
    let modalContent = `
      <div class="modal-section">
        <h4>Description</h4>
        <p>${product.fullDescription || product.description || product.shortDescription || ''}</p>
      </div>
    `;
    
    document.getElementById("modalProductDescription").innerHTML = modalContent;
  } else {
    // Show all elements for regular products
    priceElement.style.display = 'block';
    quantitySelector.style.display = 'flex';
    addCartBtn.style.display = 'block';
    
    // Reset Buy Now button
    buyNowBtn.textContent = 'Buy Now';
    buyNowBtn.onclick = modalBuyNow;
    
    priceElement.textContent = `₱${product.price.toLocaleString()}`;
    
    // Render Description and Specifications
    let modalContent = `
      <div class="modal-section">
        <h4>Description</h4>
        <p>${product.fullDescription || product.description || product.shortDescription || ''}</p>
      </div>
      <div class="modal-section">
        <h4>Specifications</h4>
        <ul>
    `;
    
    if (product.specs && product.specs.length > 0) {
      product.specs.forEach(spec => {
        modalContent += `<li>${spec}</li>`;
      });
    }
    
    modalContent += `
        </ul>
      </div>
    `;
    
    document.getElementById("modalProductDescription").innerHTML = modalContent;
    document.getElementById("productQuantity").textContent = productQuantity;
  }
  
  document.getElementById("productModal").classList.add("active");
  document.getElementById("productOverlay").classList.add("active");
  
  // Initialize zoom functionality
  initImageZoom();
};

window.closeProductModal = function () {
  document.getElementById("productModal").classList.remove("active");
  document.getElementById("productOverlay").classList.remove("active");
  currentSelectedProduct = null;
  productQuantity = 1;
};

window.increaseQuantity = function () {
  productQuantity++;
  document.getElementById("productQuantity").textContent = productQuantity;
};

window.decreaseQuantity = function () {
  if (productQuantity > 1) {
    productQuantity--;
    document.getElementById("productQuantity").textContent = productQuantity;
  }
};

window.modalAddToCart = function () {
  if (currentSelectedProduct) {
    for (let i = 0; i < productQuantity; i++) {
      addToCart(currentSelectedProduct);
    }
    closeProductModal();
  }
};

window.modalBuyNow = function () {
  if (currentSelectedProduct) {
    for (let i = 0; i < productQuantity; i++) {
      addToCart(currentSelectedProduct);
    }
    closeProductModal();
    openCart();
  }
};

// ===== SLIDESHOW CONTROLLER =====
let slideIndex = 1;

function showSlides(n) {
  const slides = document.getElementsByClassName("slide-item");
  const dots = document.getElementsByClassName("slide-dot");

  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }

  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  slides[slideIndex - 1].classList.add("active");
  dots[slideIndex - 1].classList.add("active");
}

function changeSlide(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function autoAdvanceSlides() {
  showSlides(slideIndex += 1);
}

// Auto-advance slideshow every 5 seconds
setInterval(autoAdvanceSlides, 5000);

// Initialize slideshow
document.addEventListener("DOMContentLoaded", function() {
  showSlides(slideIndex);
  updateCartCount();
});

window.filterProducts = function () {
  const search = document.getElementById("searchInput").value.toLowerCase();

  // Base filter on current section
  switch(currentSection) {
    case "pc's":
      // Filter within PC category
      currentProducts = allProducts.filter(p => 
        (p.category === 'Gaming' || p.category === 'Office') && 
        p.name.toLowerCase().includes(search)
      );
      break;
    case 'piso wifi':
      // Filter within WiFi category
      currentProducts = allProducts.filter(p => 
        p.category === 'WiFi' && 
        p.name.toLowerCase().includes(search)
      );
      break;
    case 'products':
    case 'home':
    default:
      // Search all products
      currentProducts = allProducts.filter(p =>
        p.name.toLowerCase().includes(search)
      );
  }

  displayProducts();
};


function displayProducts() {
  const container = document.getElementById("products");
  container.innerHTML = "";

  currentProducts.forEach(p => {
    const div = document.createElement("div");
    div.className = "product-card" + (p.isCustom ? " custom-build-card" : "");

    const buttonText = p.isCustom ? "Start Build" : "Buy Now";
    const priceDisplay = p.isCustom ? "" : `<p class="product-price">₱${p.price.toLocaleString()}</p>`;
    const cartButton = p.isCustom ? "" : `<button class="btn-cart-icon">🛒</button>`;

    div.innerHTML = `
      <div class="product-image"><img src="${p.image}" alt="${p.name}"></div>
      <h3>${p.name}</h3>
      <p>${p.shortDescription || p.description || ''}</p>
      ${priceDisplay}
      <div class="product-card-buttons">
        <button class="btn-buy-now">${buttonText}</button>
        ${cartButton}
      </div>
    `;

    // Card body click opens modal
    div.onclick = (e) => {
      if (!e.target.closest('.product-card-buttons')) {
        if (p.isCustom) {
          // Open Custom Build preview modal directly
          openCustomBuildModal();
        } else {
          // Open regular product modal for normal products
          openProductModal(p);
        }
      }
    };
    
// Button handler
    const buyNowBtn = div.querySelector(".btn-buy-now");
    buyNowBtn.onclick = (e) => {
      e.stopPropagation();
      if (p.isCustom) {
        openCustomBuildModal();
      } else {
        addToCart(p);
        openCart();
      }
    };
    
    // Cart icon button handler (only for regular products)
    if (!p.isCustom) {
      div.querySelector(".btn-cart-icon").onclick = (e) => {
        e.stopPropagation();
        addToCart(p);
        openAddCartConfirm(p);
      };
    }

    container.appendChild(div);
  });
}

// ===== IMAGE ZOOM FUNCTIONALITY =====
function initImageZoom() {
  const zoomContainer = document.getElementById('zoomContainer');
  
  if (!zoomContainer) return;
  
  // Full screen preview on click
  zoomContainer.addEventListener('click', function() {
    openFullscreenPreview(currentSelectedProduct.image);
  });
}

window.openFullscreenPreview = function(imageSrc) {
  const preview = document.getElementById('fullscreenPreview');
  const previewImage = document.getElementById('fullscreenImage');
  
  previewImage.src = imageSrc;
  preview.classList.add('active');
};

window.closeFullscreenPreview = function() {
  document.getElementById('fullscreenPreview').classList.remove('active');
};

// Close fullscreen when clicking outside the image
document.getElementById('fullscreenPreview').addEventListener('click', function(e) {
  if (e.target === this) {
    closeFullscreenPreview();
  }
});

// Close fullscreen with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeFullscreenPreview();
    closeAddCartConfirm();
  }
});

// Add to Cart Confirmation Modal Functions
window.openAddCartConfirm = function(product) {
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const grandTotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  
  document.getElementById('confirmProductImage').src = product.image;
  document.getElementById('confirmProductName').textContent = product.name;
  
  // Find quantity of added product
  const cartItem = cart.find(item => item.id === product.id);
  const qty = cartItem ? cartItem.quantity : 1;
  document.getElementById('confirmProductPrice').textContent = `₱${product.price.toLocaleString()} × ${qty}`;
  
  document.getElementById('confirmCartTotalItems').textContent = `You now have ${totalItems} ${totalItems === 1 ? 'item' : 'items'} in your cart`;
  document.getElementById('confirmCartGrandTotal').textContent = `Cart Total: ₱${grandTotal.toLocaleString()}`;
  
  document.getElementById('addCartConfirmOverlay').classList.add('active');
  document.getElementById('addCartConfirmModal').classList.add('active');
};

window.closeAddCartConfirm = function() {
  document.getElementById('addCartConfirmOverlay').classList.remove('active');
  document.getElementById('addCartConfirmModal').classList.remove('active');
  document.getElementById('cartModal').classList.remove('active');
  document.getElementById('cartOverlay').classList.remove('active');
};

window.proceedToCartFromConfirm = function(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
  }

  // Check if user is logged in
  const currentUser = localStorage.getItem("storeUsername");
  if (!currentUser) {
    // Close modal first
    document.getElementById('addCartConfirmOverlay').classList.remove('active');
    document.getElementById('addCartConfirmModal').classList.remove('active');

    // Show alert message
    alert("Please log in first to continue checkout.");
    
    // Open login modal or redirect
    if (typeof openLoginModal === 'function') {
      openLoginModal();
    } else {
      window.location.href = 'index.html?openLogin=true';
    }
    
    return false;
  }
  
  // User is logged in - proceed to cart
  localStorage.setItem("pc_store_cart", JSON.stringify(cart));
  
  // Close modal immediately
  document.getElementById('addCartConfirmOverlay').classList.remove('active');
  document.getElementById('addCartConfirmModal').classList.remove('active');
  
  // IMMEDIATE navigation - critical for reliability
  window.location.href = "cart.html";
  
  return false;
};

// MULTI LAYER BINDING - ensures button always works
document.addEventListener("DOMContentLoaded", () => {
  // Bind immediately
  const bindCheckoutButton = () => {
    const checkoutBtn = document.querySelector('.proceed-checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.removeAttribute('onclick');
      checkoutBtn.addEventListener('click', window.proceedToCartFromConfirm, true);
      checkoutBtn.onclick = window.proceedToCartFromConfirm;
    }
  };
  
  bindCheckoutButton();
  
  // Backup binding after full load
  setTimeout(bindCheckoutButton, 0);
  
  // Global fallback click listener
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('proceed-checkout-btn')) {
      window.proceedToCartFromConfirm(e);
    }
  }, true);
});

// Close confirmation modal when clicking outside
document.getElementById('addCartConfirmOverlay').addEventListener('click', function(e) {
  if (e.target === this) {
    closeAddCartConfirm();
  }
});

// ===== NAVIGATION FUNCTIONALITY =====
let currentSection = 'home';
let slideInterval;

function showSlideshow() {
  const slideshow = document.querySelector('.hero-slideshow');
  slideshow.style.display = 'block';
  // Start auto slideshow
  slideInterval = setInterval(autoAdvanceSlides, 5000);
}

function hideSlideshow() {
  const slideshow = document.querySelector('.hero-slideshow');
  slideshow.style.display = 'none';
  // Stop auto slideshow
  clearInterval(slideInterval);
}

function setActiveNavLink(section) {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.textContent.toLowerCase() === section.toLowerCase()) {
      link.classList.add('active');
    }
  });
}

function showSection(section) {
  // Smooth transition for products
  const productsContainer = document.getElementById('products');
  const slideshow = document.querySelector('.hero-slideshow');
  
  // Start fade out transition
  productsContainer.style.opacity = '0';
  productsContainer.style.transform = 'translateY(20px)';
  
  setTimeout(() => {
    switch(section.toLowerCase()) {
      case 'home':
        showSlideshow();
        // Show all products including Custom Build
        currentProducts = allProducts;
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'products':
        hideSlideshow();
        // Show all products EXCEPT Custom Build
        currentProducts = allProducts.filter(p => !p.isCustom);
        // Scroll to products section
        productsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        break;
      case "pc's":
        hideSlideshow();
        // Show only PC products (Gaming and Office) EXCEPT Custom Build
        currentProducts = allProducts.filter(p => 
          (p.category === 'Gaming' || p.category === 'Office') && !p.isCustom
        );
        // Scroll to products section
        productsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        break;
      case 'piso wifi':
        hideSlideshow();
        // Show only WiFi products
        currentProducts = allProducts.filter(p => p.category === 'WiFi');
        // Scroll to products section
        productsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        break;
      case 'contact':
        hideSlideshow();
        currentProducts = [];
        break;
    }
    
    displayProducts();
    // Fade in with slide animation
    productsContainer.style.opacity = '1';
    productsContainer.style.transform = 'translateY(0)';
  }, 200);

  setActiveNavLink(section);
  currentSection = section.toLowerCase();
}

// Initialize navigation
document.addEventListener("DOMContentLoaded", function() {
    // Check if we're on cart page
    if (document.getElementById("cartItemsContainer")) {
        renderCart();
        updateCartCount();
        return;
    }
    
    showSlides(slideIndex);
    updateCartCount();
    
    // Add click handlers to navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.target.textContent.trim();
            showSection(section);
        });
    });
    
    // Start with home section
    showSection('home');
});

// ===== AUTHENTICATION FUNCTIONS =====
let currentUser = null;

window.openLoginModal = function () {
  document.getElementById("loginOverlay").classList.add("active");
  document.getElementById("loginModal").classList.add("active");
  document.getElementById("loginUsername").focus();
  switchToLogin();
};

window.closeLoginModal = function () {
  document.getElementById("loginOverlay").classList.remove("active");
  document.getElementById("loginModal").classList.remove("active");
  clearAuthForm();
};

function clearAuthForm() {
  // Login fields
  document.getElementById("loginUsername").value = "";
  document.getElementById("loginPassword").value = "";
  
  // Registration fields
  document.getElementById("regFirstname").value = "";
  document.getElementById("regLastname").value = "";
  document.getElementById("regUsername").value = "";
  document.getElementById("regEmail").value = "";
  document.getElementById("regPhone").value = "";
  document.getElementById("regPassword").value = "";
  document.getElementById("regConfirmPassword").value = "";
  document.getElementById("regAddress").value = "";
}

window.switchToLogin = function() {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const loginImage = document.getElementById("loginFormImage");
  
  // Update image for login
  loginImage.src = "LoginAndRegistrationFormImages/LoginFormimage.jpg";
  
  // Animate register form out (slide right + fade)
  registerForm.style.transition = "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)";
  registerForm.style.opacity = "0";
  registerForm.style.transform = "translateX(50px)";
  
  setTimeout(() => {
    registerForm.style.display = "none";
    loginForm.style.display = "flex";
    
    // Prepare login form for entry animation (slide left)
    loginForm.style.opacity = "0";
    loginForm.style.transform = "translateX(-50px)";
    loginForm.style.transition = "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)";
    
    // Trigger entry animation
    setTimeout(() => {
      loginForm.style.opacity = "1";
      loginForm.style.transform = "translateX(0)";
      
      // Stagger animate form fields
      const formGroups = loginForm.querySelectorAll('.form-group');
      formGroups.forEach((group, index) => {
        group.style.opacity = "0";
        group.style.transform = "translateY(20px)";
        group.style.transition = `all 0.25s cubic-bezier(0.4, 0, 0.2, 1) ${0.1 + index * 0.1}s`;
        setTimeout(() => {
          group.style.opacity = "1";
          group.style.transform = "translateY(0)";
        }, 10);
      });
    }, 30);
    
    document.getElementById("loginModalTitle").textContent = "🔑 Login";
  }, 250);
}

window.switchToRegister = function() {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const loginImage = document.getElementById("loginFormImage");
  
  // Update image for registration
  loginImage.src = "LoginAndRegistrationFormImages/RegistrationFormImage.jpg";
  
  // Animate login form out (slide left + fade)
  loginForm.style.transition = "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)";
  loginForm.style.opacity = "0";
  loginForm.style.transform = "translateX(-50px)";
  
  setTimeout(() => {
    loginForm.style.display = "none";
    registerForm.style.display = "flex";
    
    // Prepare register form for entry animation (slide right)
    registerForm.style.opacity = "0";
    registerForm.style.transform = "translateX(50px)";
    registerForm.style.transition = "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)";
    
    // Trigger entry animation
    setTimeout(() => {
      registerForm.style.opacity = "1";
      registerForm.style.transform = "translateX(0)";
      
      // Stagger animate form fields
      const formGroups = registerForm.querySelectorAll('.form-group');
      formGroups.forEach((group, index) => {
        group.style.opacity = "0";
        group.style.transform = "translateY(20px)";
        group.style.transition = `all 0.25s cubic-bezier(0.4, 0, 0.2, 1) ${0.1 + index * 0.1}s`;
        setTimeout(() => {
          group.style.opacity = "1";
          group.style.transform = "translateY(0)";
        }, 10);
      });
    }, 30);
    
    document.getElementById("loginModalTitle").textContent = "📝 Register";
  }, 250);
}

window.togglePasswordVisibility = function(fieldId, eyeElement) {
  const field = document.getElementById(fieldId);
  if (field.type === "password") {
    field.type = "text";
    eyeElement.textContent = "🙈";
  } else {
    field.type = "password";
    eyeElement.textContent = "👁️";
  }
};

window.performLogin = function () {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value;
  
  if (!username || !password) {
    alert("Please enter username and password");
    return;
  }

  // Check for admin credentials first
  if (username === 'admin' && password === 'admin123') {
    currentUser = username;
    localStorage.setItem("storeUsername", username);
    localStorage.setItem("userRole", "admin");
    updateAuthUI();
    closeLoginModal();
    // Redirect to admin animation page before dashboard
    window.location.href = 'admin-animation.html';
    return;
  }

  // Check for regular users
  const users = JSON.parse(localStorage.getItem('storeUsers') || '{}');
  
  if (!users[username]) {
    alert("User not found. Please register first.");
    return;
  }

  if (users[username].password !== password) {
    alert("Invalid password");
    return;
  }

  // Normal registered user
  currentUser = username;
  localStorage.setItem("storeUsername", username);
  localStorage.setItem("userRole", "customer");
  updateAuthUI();
  closeLoginModal();
  // Keep user on store page
};

window.performRegister = function () {
  const firstName = document.getElementById("regFirstname").value.trim();
  const lastName = document.getElementById("regLastname").value.trim();
  const username = document.getElementById("regUsername").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const phone = document.getElementById("regPhone").value.trim();
  const password = document.getElementById("regPassword").value;
  const confirmPassword = document.getElementById("regConfirmPassword").value;
  const address = document.getElementById("regAddress").value.trim();

  // Validate required fields
  if (!firstName) {
    alert("First Name is required");
    return;
  }
  
  if (!lastName) {
    alert("Last Name is required");
    return;
  }
  
  if (!username) {
    alert("Username is required");
    return;
  }
  
  if (!email) {
    alert("Email is required");
    return;
  }
  
  if (!email.includes('@')) {
    alert("Invalid email format");
    return;
  }
  
  if (!phone) {
    alert("Phone Number is required");
    return;
  }
  
  if (!password) {
    alert("Password is required");
    return;
  }
  
  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }
  
  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }
  
  if (!address) {
    alert("Address is required");
    return;
  }

  const users = JSON.parse(localStorage.getItem('storeUsers') || '{}');
  
  if (users[username]) {
    alert("Username already exists");
    return;
  }

  users[username] = {
    firstName,
    lastName,
    password,
    email,
    phone,
    address,
    createdAt: new Date().toISOString()
  };

  localStorage.setItem('storeUsers', JSON.stringify(users));
  
  // Show success message
  alert("✅ Registration successful! Please login with your credentials.");
  
  // Switch to login form
  switchToLogin();
  
  // Clear registration form
  document.getElementById("regFirstname").value = "";
  document.getElementById("regLastname").value = "";
  document.getElementById("regUsername").value = "";
  document.getElementById("regEmail").value = "";
  document.getElementById("regPhone").value = "";
  document.getElementById("regPassword").value = "";
  document.getElementById("regConfirmPassword").value = "";
  document.getElementById("regAddress").value = "";
};

window.performLogout = function () {
  currentUser = null;
  localStorage.removeItem("storeUsername");
  updateAuthUI();
  window.location.reload();
};

function getProfileAvatarHTML() {
  const savedAvatar = localStorage.getItem(`userAvatar_${currentUser}`);
  
  if (savedAvatar && savedAvatar.length > 0) {
    return `<img src="${savedAvatar}" alt="Profile">`;
  }
  
  return '👤';
}

function updateAuthUI() {
  const authSection = document.getElementById("auth-section");
  
  if (currentUser) {
    authSection.innerHTML = `
      <div class="logged-in-user clickable-name" onclick="openProfile()">
        <div class="profile-avatar-header">
          ${getProfileAvatarHTML()}
        </div>
        <span class="profile-username-header">${currentUser}</span>
      </div>
    `;
  } else {
    authSection.innerHTML = `
      <button class="login-button" onclick="openLoginModal()">👤 Login</button>
    `;
  }
}

// Listen for storage changes to update avatar automatically
window.addEventListener('storage', function(e) {
  if (e.key && e.key.startsWith('userAvatar_') && currentUser) {
    updateAuthUI();
  }
});

// Setup avatar change observer
function setupAvatarObserver() {
  const originalSetItem = Storage.prototype.setItem;
  Storage.prototype.setItem = function(key, value) {
    originalSetItem.call(this, key, value);
    if (key === `userAvatar_${currentUser}`) {
      setTimeout(() => updateAuthUI(), 0);
    }
  };
}

// Initialize observer when page loads
document.addEventListener("DOMContentLoaded", function() {
  setupAvatarObserver();
});

window.openProfile = function() {
  window.location.href = 'profile.html';
};

// Check for existing login on page load
function checkExistingLogin() {
  const savedUsername = localStorage.getItem("storeUsername");
  if (savedUsername) {
    currentUser = savedUsername;
    updateAuthUI();
  }
}

// Close login modal when clicking outside
document.getElementById('loginOverlay').addEventListener('click', function(e) {
  if (e.target === this) {
    closeLoginModal();
  }
});

// Close login modal with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeLoginModal();
  }
});

// Enter key to login
document.getElementById('loginUsername').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    performLogin();
  }
});

// Function to refresh products from localStorage
function refreshProducts() {
  getProducts().then(products => {
    allProducts = products;
    currentProducts = products;
    
    // Ensure Custom Build PC appears in initial Home display
    if (!currentProducts.find(p => p.isCustom)) {
      const customBuild = allProducts.find(p => p.isCustom);
      if (customBuild) {
        currentProducts.push(customBuild);
      }
    }
    
    displayProducts();
  });
}

// Listen for storage changes (when admin updates products)
window.addEventListener('storage', function(e) {
  if (e.key === 'pc_store_products') {
    refreshProducts();
  }
});

getProducts().then(products => {
  allProducts = products;
  currentProducts = products;
  displayProducts();
  
  // Ensure Custom Build PC appears in initial Home display
  if (!currentProducts.find(p => p.isCustom)) {
    const customBuild = allProducts.find(p => p.isCustom);
    if (customBuild) {
      currentProducts.push(customBuild);
    }
  }
  
  // Check for existing login after products load
  checkExistingLogin();
});

// ===== CUSTOM BUILD MODAL FUNCTIONS =====
window.openCustomBuildModal = function () {
  // Open preview modal first
  document.getElementById("customBuildPreviewOverlay").classList.add("active");
  document.getElementById("customBuildPreviewModal").classList.add("active");
};

window.closeCustomBuildPreview = function () {
  document.getElementById("customBuildPreviewOverlay").classList.remove("active");
  document.getElementById("customBuildPreviewModal").classList.remove("active");
};

window.openCustomBuildForm = function () {
  // Close preview modal and open form modal
  closeCustomBuildPreview();
  setTimeout(() => {
    document.getElementById("customBuildOverlay").classList.add("active");
    document.getElementById("customBuildModal").classList.add("active");
    document.getElementById("customBuildForm").reset();
  }, 100);
};

window.closeCustomBuildModal = function () {
  document.getElementById("customBuildOverlay").classList.remove("active");
  document.getElementById("customBuildModal").classList.remove("active");
};

window.openCustomBuildSuccessModal = function () {
  document.getElementById("customBuildOverlay").classList.remove("active");
  document.getElementById("customBuildModal").classList.remove("active");
  document.getElementById("customBuildSuccessOverlay").classList.add("active");
  document.getElementById("customBuildSuccessModal").classList.add("active");
};

window.closeCustomBuildSuccessModal = function () {
  document.getElementById("customBuildSuccessOverlay").classList.remove("active");
  document.getElementById("customBuildSuccessModal").classList.remove("active");
};

// Custom Build Form Submission
document.addEventListener("DOMContentLoaded", function() {
  const customBuildForm = document.getElementById("customBuildForm");
  if (customBuildForm) {
    customBuildForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      // Get form values
      const budget = document.getElementById("buildBudget").value;
      const purpose = document.getElementById("buildPurpose").value;
      const preferredCpu = document.getElementById("preferredCpu").value;
      const preferredGpu = document.getElementById("preferredGpu").value;
      const notes = document.getElementById("buildNotes").value;
      
      // Log the submission (in production this would send to server)
      console.log("Custom Build Request Submitted:", {
        budget,
        purpose,
        preferredCpu,
        preferredGpu,
        notes
      });
      
      // Show success message
      openCustomBuildSuccessModal();
    });
  }
  
  // Close custom build modals with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeCustomBuildModal();
      closeCustomBuildSuccessModal();
    }
  });
  
  // Close custom build modal when clicking outside
  document.getElementById('customBuildOverlay').addEventListener('click', function(e) {
    if (e.target === this) {
      closeCustomBuildModal();
    }
  });
  
  // Close success modal when clicking outside
  document.getElementById('customBuildSuccessOverlay').addEventListener('click', function(e) {
    if (e.target === this) {
      closeCustomBuildSuccessModal();
    }
  });
});
