/**
 * Admin Dashboard JavaScript
 * Products & Orders Management System with localStorage
 * Cyberpunk Theme
 */

// ====================
// Core Configuration
// ====================
const STORAGE_KEY = 'pc_store_products';
const ORDERS_STORAGE_KEY = 'cyber_store_orders';
const CATEGORIES = ['Gaming', 'Office', 'WiFi'];

// Default products (used when localStorage is empty)
const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "CYBORG GAMING COMPUTER SET",
    price: 50000,
    category: "Gaming",
    stock: 10,
    image: "PCimages/CyborgGaming.jpg",
    shortDescription: "Ryzen 7 + RTX 4070, 16GB RAM, 120Hz monitor. Built for serious gaming.",
    fullDescription: "Experience ultimate gaming performance with the Cyborg Gaming Computer Set. Featuring AMD Ryzen 7 5700G processor, NVIDIA GeForce RTX 4070 graphics, and 16GB of high-speed DDR4 RAM. Complete with a 120Hz frameless monitor and RGB peripherals for the full gaming setup.",
    specs: [
      "PROCESSOR: RYZEN 7 5700G (8c 16T)",
      "GPU: NVIDIA GEFORCE RTX 4070",
      "RAM: DELTA FORCE RGB 16GB 3200mhz",
      "PSU: ESGAMING 80+ GOLD",
      "MONITOR: 24inch NVISION 120hz FRAMELESS",
      "CASE: WHITE ESGAMING CYBORG CASING",
      "INPLAY (stx) KEYBOARD AND MOUSE",
      "INPLAY EXTENDED MOUSEPAD",
      "INPLAY RGB HEADSET (noise cancelling)"
    ],
    status: "active"
  },
  {
    id: 2,
    name: "OFFICE DESKTOP",
    price: 12500,
    category: "Office",
    stock: 15,
    image: "PCimages/EntryLevelGamingPc.jpg",
    shortDescription: "Budget desktop for school/office work. Includes monitor and accessories.",
    fullDescription: "Perfect for office work and school tasks, the Office Desktop delivers reliable performance at an affordable price. Powered by AMD A8 7680 processor with 8GB RAM and includes all necessary peripherals to get you started immediately.",
    specs: [
      "PROCESSOR: AMD A8 7680",
      "RAM: LEXAR 8GB 1600hmz DDR3",
      "PSU: 800WATTS GENERIC PAU",
      "MONITOR: 20inch NVISION",
      "CASE: GENERIC CASE WITH RGB FANS",
      "INPLAY (STX) KEYBOARD AND MOUSE COMBO",
      "INPLAY MOUSEPAD",
      "INPLAY HEADSET RGB GAMING (noise cancelling)"
    ],
    status: "active"
  },
  {
    id: 3,
    name: "ESGAMING TOWER PC",
    price: 19500,
    category: "Gaming",
    stock: 8,
    image: "PCimages/EsgamingTowerPc.jpg",
    shortDescription: "Ryzen 5 + 16GB RAM, 120Hz monitor, RGB tower. Ready for work and play.",
    fullDescription: "The ESGaming Tower PC is a versatile system ready for both gaming and productivity. Features AMD Ryzen 5 5600GT processor, 16GB DDR4 RAM, and a stylish tower case with RGB fans. Complete with 120Hz monitor and mechanical keyboard combo.",
    specs: [
      "PROCESSOR: AMD RYZEN 5 5600GT",
      "RAM: LEXAR 16GB 3200mhz DDR4",
      "PSU: 500 WATTS 80+ bronze PSU",
      "MONITOR: 24inch NVISION FRAMELESS 120hz",
      "CASE: ESGAMING TOWER CASE WITH RGB FANS",
      "INPLAY MECHANICAL KEYBOARD AND MOUSE COMBO",
      "INPLAY MOUSEPAD",
      "INPLAY HEADSET RGB GAMING (noise cancelling)"
    ],
    status: "active"
  },
  {
    id: 4,
    name: "ENTRY LEVEL GAMING PC",
    price: 15700,
    category: "Gaming",
    stock: 12,
    image: "PCimages/OfficeDesktop.jpg",
    shortDescription: "Ryzen 3 starter gaming PC with 120Hz monitor. Great for beginners.",
    fullDescription: "Start your gaming journey with the Entry Level Gaming PC. Powered by AMD Ryzen 3 3200G with 8GB DDR4 RAM and a 120Hz frameless monitor. Perfect for beginners who want to experience PC gaming without breaking the bank.",
    specs: [
      "PROCESSOR: AMD RYZEN 3 3200G",
      "RAM: LEXAR 8GB 3200mhz DDR4",
      "PSU: 800WATTS GENERIC PSU",
      "MONITOR: 24inch NVISION FRAMELESS 120hz",
      "CASE: INPLAY GENERIC CASE (BLACK) with RGB FANS",
      "AOC KEYBOARD AND MOUSE COMBO",
      "INPLAY MOUSEPAD"
    ],
    status: "active"
  },
  {
    id: 5,
    name: "GAMING PISOWIFI",
    price: 9900,
    category: "WiFi",
    stock: 20,
    image: "PisoWifiimages/GamingPisoWifi.jpg",
    shortDescription: "Reliable Piso WiFi with AC1200 access point. Fast internet sharing.",
    fullDescription: "Set up your own internet business with the Gaming Piso WiFi. Features Orange Pi One, 16GB SD Card, and TP-Link EAP225 AC1200 access point for reliable high-speed internet sharing. Complete with coinslot and RGB frame.",
    specs: [
      "ORANGE PI ONE",
      "16GB SD CARD",
      "USB - LAN",
      "POWER SUPPLY 12V 5A",
      "CUSTOM BOARD",
      "COINSLOT",
      "COINSLOT RGB FRAME",
      "TPLINK EAP225 AC1200",
      "PISOWIFI BOX 10X10X15"
    ],
    status: "active"
  },
  {
    id: 6,
    name: "PISOWIFI ADVANCE GAMING SET-UP",
    price: 12500,
    category: "WiFi",
    stock: 10,
    image: "PisoWifiimages/PisoWifiAdvanceGamingSetup.jpg",
    shortDescription: "High-speed Piso WiFi with dual-band 1300Mbps. Ready-to-use setup.",
    fullDescription: "Take your internet business to the next level with the Piso WiFi Advance Gaming Setup. Features Comfast EW85 1300Mbps dual-band access point for superior speed and coverage. Complete plug-and-play setup with coinslot system.",
    specs: [
      "ORANGE PI ONE",
      "16GB SD CARD",
      "USB - LAN",
      "POWER SUPPLY 12V 5A",
      "CUSTOM BOARD",
      "COINSLOT",
      "COINSLOT RGB FRAME",
      "COMFAST EW85 1300MBPS",
      "PISOWIFI BOX 10X10X15"
    ],
    status: "active"
  },
  {
    id: 7,
    name: "PISOWIFI ORDINARY BUILD",
    price: 8600,
    category: "WiFi",
    stock: 25,
    image: "PisoWifiimages/PisoWifiOrdinaryBuild.jpg",
    shortDescription: "Affordable Piso WiFi with stable 300Mbps. Perfect for small businesses.",
    fullDescription: "Start your WiFi business affordably with the Piso WiFi Ordinary Build. Features Comfast E314N 300Mbps access point for stable internet sharing. Simple, reliable, and cost-effective solution for small business owners.",
    specs: [
      "ORANGE PI ONE",
      "16GB SD CARD",
      "USB - LAN",
      "POWER SUPPLY 12V 5A",
      "CUSTOM BOARD",
      "COINSLOT",
      "COINSLOT RGB FRAME",
      "COMFAST E314N 300MBPS",
      "PISOWIFI BOX 10X10X15"
    ],
    status: "active"
  },
  {
    id: 8,
    name: "Custom Build PC",
    price: 0,
    category: "Gaming",
    stock: 999,
    image: "CustomBuildPCimages/The Caspian PC🌊.jpg",
    shortDescription: "Build a PC based on your budget and needs",
    fullDescription: "Build a PC based on your budget and needs. Our custom build service allows you to specify your requirements and budget, and our experts will build the perfect PC for you.",
    specs: [],
    status: "active",
    isCustom: true
  }
];

// ====================
// State Management
// ====================
let products = [];
let currentPage = 'dashboard';
let editingProductId = null;
let sortDirection = {};
let currentImageBase64 = '';

// ====================
// DOM Elements
// ====================
const elements = {
    menuItems: document.querySelectorAll('.menu-item'),
    headerTitle: document.querySelector('.header-title h1'),
    dashboardContent: document.querySelector('.dashboard-content'),
    productModal: null,
    deleteModal: null,
    alertContainer: null
};

// ====================
// Initialize Application
// ====================
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupEventListeners();
    createModals();
    createAlertSystem();
    renderDashboardPage();
});

/**
 * Load products from localStorage
 */
function loadProducts() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            products = JSON.parse(stored);
        } catch (e) {
            console.error('Error parsing stored products:', e);
            products = [];
        }
    }
}

/**
 * Save products to localStorage
 */
function saveProducts() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // Sidebar navigation
    elements.menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            handleMenuClick(item);
        });
    });
    
    // Logout button handler
    const logoutButton = document.querySelector('.menu-item.logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            performAdminLogout();
        });
    }
}

/**
 * Handle sidebar menu click
 */
function handleMenuClick(item) {
    elements.menuItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');

    const pageName = item.querySelector('span').textContent.toLowerCase();
    
    if (pageName === 'products') {
        currentPage = 'products';
        renderProductsPage();
    } else if (pageName === 'orders') {
        currentPage = 'orders';
        renderOrdersPage();
    } else if (pageName === 'dashboard') {
        currentPage = 'dashboard';
        renderDashboardPage();
    } else {
        currentPage = pageName;
        renderPlaceholderPage(pageName);
    }
}

// ====================
// Orders Management
// ====================

/**
 * Get all orders from localStorage
 */
function getOrders() {
    const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error('Error parsing stored orders:', e);
            return [];
        }
    }
    return [];
}

/**
 * Save orders to localStorage
 */
function saveOrders(orders) {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
}

/**
 * Render Orders Management Page
 */
function renderOrdersPage() {
    elements.headerTitle.textContent = 'Orders Management';
    
    const orders = getOrders();
    
    elements.dashboardContent.innerHTML = `
        <section class="orders-section">
            <div class="section-header">
                <h2>Customer Orders</h2>
                <div class="orders-summary">
                    <span class="orders-count">Total: ${orders.length} orders</span>
                </div>
            </div>

            <div class="orders-table-container">
                <table class="orders-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer Name</th>
                            <th>Username</th>
                            <th>Products</th>
                            <th>Total Price</th>
                            <th>Payment Method</th>
                            <th>Order Date</th>
                            <th>Order Status</th>
                            <th>Payment Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="ordersTableBody">
                        ${renderOrderRows(orders)}
                    </tbody>
                </table>
            </div>
        </section>
    `;
}

/**
 * Render order table rows
 */
function renderOrderRows(orders) {
    if (orders.length === 0) {
        return `
            <tr>
                <td colspan="10" class="empty-state">
                    <i class="fas fa-shopping-cart"></i>
                    <p>No orders yet. Orders will appear here when customers make purchases.</p>
                </td>
            </tr>
        `;
    }

    return orders.map(order => {
        const productsList = order.products || [];
        const productsText = productsList.map(p => `${p.name} (x${p.quantity || 1})`).join(', ');
        
        return `
            <tr class="order-row">
                <td><strong>${order.id}</strong></td>
                <td>${order.customerName || 'Guest'}</td>
                <td>${order.username || '-'}</td>
                <td class="products-cell" title="${productsText}">${productsText.substring(0, 50)}${productsText.length > 50 ? '...' : ''}</td>
                <td>₱${(order.totalPrice || 0).toLocaleString()}</td>
                <td>${order.paymentMethod || 'Cash'}</td>
                <td>${order.orderDate || '-'}</td>
                <td>${getOrderStatusBadge(order.orderStatus || 'Pending')}</td>
                <td>${getPaymentStatusBadge(order.paymentStatus || 'Unpaid')}</td>
                <td>
                    <div class="action-buttons-inline">
                        <button class="btn-view" onclick="viewOrderDetails('${order.id}')" title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-edit" onclick="editOrderStatus('${order.id}')" title="Update Status">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-delete" onclick="confirmDeleteOrder('${order.id}')" title="Delete Order">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

/**
 * Get order status badge HTML
 */
function getOrderStatusBadge(status) {
    const statusClass = status.toLowerCase();
    return `<span class="order-status ${statusClass}">${status}</span>`;
}

/**
 * Get payment status badge HTML
 */
function getPaymentStatusBadge(status) {
    const statusClass = status.toLowerCase();
    return `<span class="payment-status ${statusClass}">${status}</span>`;
}

/**
 * View order details
 */
window.viewOrderDetails = function(orderId) {
    const orders = getOrders();
    const order = orders.find(o => o.id === orderId);
    
    if (!order) {
        showAlert('Order not found', 'error');
        return;
    }
    
    const productsList = order.products || [];
    const productsHtml = productsList.map(p => `
        <div class="order-product-item">
            <img src="${p.image || 'images/placeholder.jpg'}" alt="${p.name}" class="order-product-image">
            <div class="order-product-info">
                <strong>${p.name}</strong>
                <span>Quantity: ${p.quantity || 1} × ₱${(p.price || 0).toLocaleString()}</span>
            </div>
        </div>
    `).join('');
    
    const modal = document.createElement('div');
    modal.id = 'orderDetailsModal';
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
        <div class="modal modal-large">
            <div class="modal-header">
                <h3>Order Details - ${order.id}</h3>
                <button class="modal-close" onclick="closeOrderDetails()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-content">
                <div class="order-details-grid">
                    <div class="order-info-section">
                        <h4>Customer Information</h4>
                        <p><strong>Name:</strong> ${order.customerName || 'Guest'}</p>
                        <p><strong>Username:</strong> ${order.username || '-'}</p>
                        <p><strong>Email:</strong> ${order.customerEmail || '-'}</p>
                        <p><strong>Phone:</strong> ${order.customerPhone || '-'}</p>
                    </div>
                    
                    <div class="order-info-section">
                        <h4>Order Information</h4>
                        <p><strong>Order ID:</strong> ${order.id}</p>
                        <p><strong>Date:</strong> ${order.orderDate || '-'}</p>
                        <p><strong>Time:</strong> ${order.orderTime || '-'}</p>
                        <p><strong>Payment Method:</strong> ${order.paymentMethod || 'Cash'}</p>
                        <p><strong>Shipping Address:</strong> ${order.shippingAddress || '-'}</p>
                    </div>
                    
                    <div class="order-info-section">
                        <h4>Status</h4>
                        <p><strong>Order Status:</strong> ${getOrderStatusBadge(order.orderStatus || 'Pending')}</p>
                        <p><strong>Payment Status:</strong> ${getPaymentStatusBadge(order.paymentStatus || 'Unpaid')}</p>
                        <p><strong>Total Amount:</strong> ₱${(order.totalPrice || 0).toLocaleString()}</p>
                    </div>
                </div>
                
                <div class="order-products-section">
                    <h4>Products Ordered</h4>
                    <div class="order-products-list">
                        ${productsHtml}
                    </div>
                </div>
                
                ${order.notes ? `<div class="order-notes-section"><h4>Notes</h4><p>${order.notes}</p></div>` : ''}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeOrderDetails();
        }
    });
}

window.closeOrderDetails = function() {
    const modal = document.getElementById('orderDetailsModal');
    if (modal) {
        modal.remove();
    }
}

/**
 * Edit order status
 */
window.editOrderStatus = function(orderId) {
    const orders = getOrders();
    const order = orders.find(o => o.id === orderId);
    
    if (!order) {
        showAlert('Order not found', 'error');
        return;
    }
    
    const modal = document.createElement('div');
    modal.id = 'editOrderStatusModal';
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3>Update Order Status</h3>
                <button class="modal-close" onclick="closeEditOrderStatus()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-content">
                <div class="order-status-info">
                    <p><strong>Order ID:</strong> ${order.id}</p>
                    <p><strong>Customer:</strong> ${order.customerName || 'Guest'}</p>
                    <p><strong>Current Status:</strong> ${getOrderStatusBadge(order.orderStatus || 'Pending')}</p>
                </div>
                
                <div class="form-group">
                    <label>Order Status</label>
                    <select id="newOrderStatus">
                        <option value="Pending" ${order.orderStatus === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="Processing" ${order.orderStatus === 'Processing' ? 'selected' : ''}>Processing</option>
                        <option value="Shipped" ${order.orderStatus === 'Shipped' ? 'selected' : ''}>Shipped</option>
                        <option value="Delivered" ${order.orderStatus === 'Delivered' ? 'selected' : ''}>Delivered</option>
                        <option value="Cancelled" ${order.orderStatus === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Payment Status</label>
                    <select id="newPaymentStatus">
                        <option value="Unpaid" ${order.paymentStatus === 'Unpaid' ? 'selected' : ''}>Unpaid</option>
                        <option value="Paid" ${order.paymentStatus === 'Paid' ? 'selected' : ''}>Paid</option>
                        <option value="Refunded" ${order.paymentStatus === 'Refunded' ? 'selected' : ''}>Refunded</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn-cancel" onclick="closeEditOrderStatus()">Cancel</button>
                <button type="button" class="btn-save" onclick="saveOrderStatus('${orderId}')">Update Status</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeEditOrderStatus();
        }
    });
}

window.closeEditOrderStatus = function() {
    const modal = document.getElementById('editOrderStatusModal');
    if (modal) {
        modal.remove();
    }
}

window.saveOrderStatus = function(orderId) {
    const newOrderStatus = document.getElementById('newOrderStatus').value;
    const newPaymentStatus = document.getElementById('newPaymentStatus').value;
    
    const orders = getOrders();
    const index = orders.findIndex(o => o.id === orderId);
    
    if (index !== -1) {
        orders[index].orderStatus = newOrderStatus;
        orders[index].paymentStatus = newPaymentStatus;
        orders[index].updatedAt = new Date().toISOString();
        saveOrders(orders);
        
        showAlert('Order status updated successfully!', 'success');
        closeEditOrderStatus();
        renderOrdersPage();
    }
}

/**
 * Confirm delete order
 */
window.confirmDeleteOrder = function(orderId) {
    const orders = getOrders();
    const order = orders.find(o => o.id === orderId);
    
    if (!order) {
        showAlert('Order not found', 'error');
        return;
    }
    
    const modal = document.createElement('div');
    modal.id = 'deleteOrderModal';
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
        <div class="modal modal-small">
            <div class="modal-header">
                <h3>Confirm Delete</h3>
                <button class="modal-close" onclick="closeDeleteOrderModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-content">
                <p>Are you sure you want to delete order <strong>${order.id}</strong>?</p>
                <p class="warning-text">This action cannot be undone.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn-cancel" onclick="closeDeleteOrderModal()">Cancel</button>
                <button type="button" class="btn-delete" onclick="deleteOrder('${orderId}')">Delete Order</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeDeleteOrderModal();
        }
    });
}

window.closeDeleteOrderModal = function() {
    const modal = document.getElementById('deleteOrderModal');
    if (modal) {
        modal.remove();
    }
}

window.deleteOrder = function(orderId) {
    let orders = getOrders();
    orders = orders.filter(o => o.id !== orderId);
    saveOrders(orders);
    
    showAlert('Order deleted successfully!', 'success');
    closeDeleteOrderModal();
    renderOrdersPage();
}

// ====================
// Dashboard Page
// ====================

/**
 * Render Dashboard Page
 */
function renderDashboardPage() {
    elements.headerTitle.textContent = 'Dashboard';
    
    const orders = getOrders();
    const recentOrders = orders.slice(-5).reverse(); // Last 5 orders
    
    elements.dashboardContent.innerHTML = `
        <section class="welcome-section">
            <h2>Welcome back, Admin!</h2>
            <p>Here's what's happening with your store today.</p>
        </section>

        <section class="summary-cards">
            <div class="summary-card">
                <div class="card-icon blue">
                    <i class="fas fa-shopping-cart"></i>
                </div>
                <div class="card-info">
                    <h3>${orders.length}</h3>
                    <p>Total Orders</p>
                    <span class="trend positive">+12% <i class="fas fa-arrow-up"></i></span>
                </div>
            </div>

            <div class="summary-card">
                <div class="card-icon purple">
                    <i class="fas fa-dollar-sign"></i>
                </div>
                <div class="card-info">
                    <h3>₱${orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0).toLocaleString()}</h3>
                    <p>Total Revenue</p>
                    <span class="trend positive">+8% <i class="fas fa-arrow-up"></i></span>
                </div>
            </div>

            <div class="summary-card">
                <div class="card-icon green">
                    <i class="fas fa-users"></i>
                </div>
                <div class="card-info">
                    <h3>${products.length}</h3>
                    <p>Total Products</p>
                    <span class="trend neutral">0% <i class="fas fa-minus"></i></span>
                </div>
            </div>

            <div class="summary-card">
                <div class="card-icon orange">
                    <i class="fas fa-box"></i>
                </div>
                <div class="card-info">
                    <h3>${orders.filter(o => o.orderStatus === 'Pending').length}</h3>
                    <p>Pending Orders</p>
                    <span class="trend neutral">0% <i class="fas fa-minus"></i></span>
                </div>
            </div>
        </section>

        <div class="dashboard-grid">
            <section class="recent-orders">
                <div class="section-header">
                    <h3>Recent Orders</h3>
                    <a href="#" class="view-all" onclick="navigateToOrders()">View All <i class="fas fa-arrow-right"></i></a>
                </div>
                
                <table class="orders-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${renderRecentOrderRows(recentOrders)}
                    </tbody>
                </table>
            </section>

            <section class="quick-actions">
                <div class="section-header">
                    <h3>Quick Actions</h3>
                </div>
                
                <div class="action-buttons">
                    <button class="action-btn primary" onclick="navigateToProducts()">
                        <i class="fas fa-plus"></i>
                        <span>Add New Product</span>
                    </button>
                    <button class="action-btn secondary" onclick="navigateToOrders()">
                        <i class="fas fa-list"></i>
                        <span>View All Orders</span>
                    </button>
                    <button class="action-btn tertiary">
                        <i class="fas fa-user-cog"></i>
                        <span>Manage Users</span>
                    </button>
                    <button class="action-btn info">
                        <i class="fas fa-chart-pie"></i>
                        <span>View Reports</span>
                    </button>
                </div>
            </section>
        </div>
    `;
}

/**
 * Render recent order rows for dashboard
 */
function renderRecentOrderRows(orders) {
    if (orders.length === 0) {
        return `
            <tr>
                <td colspan="5" class="empty-state">
                    <i class="fas fa-shopping-cart"></i>
                    <p>No orders yet. Orders will appear here when customers make purchases.</p>
                </td>
            </tr>
        `;
    }
    
    return orders.map(order => `
        <tr>
            <td>${order.id}</td>
            <td>${order.customerName || 'Guest'}</td>
            <td>${order.orderDate || '-'}</td>
            <td>₱${(order.totalPrice || 0).toLocaleString()}</td>
            <td>${getOrderStatusBadge(order.orderStatus || 'Pending')}</td>
        </tr>
    `).join('');
}

/**
 * Navigate to products page from dashboard
 */
function navigateToProducts() {
    const productsMenuItem = Array.from(elements.menuItems).find(item => 
        item.querySelector('span').textContent.toLowerCase() === 'products'
    );
    
    if (productsMenuItem) {
        handleMenuClick(productsMenuItem);
    }
}

/**
 * Navigate to orders page from dashboard
 */
window.navigateToOrders = function() {
    const ordersMenuItem = Array.from(elements.menuItems).find(item => 
        item.querySelector('span').textContent.toLowerCase() === 'orders'
    );
    
    if (ordersMenuItem) {
        handleMenuClick(ordersMenuItem);
    }
}

// ====================
// Products Management
// ====================

/**
 * Render Products Management Page
 */
function renderProductsPage() {
    elements.headerTitle.textContent = 'Products Management';
    
    elements.dashboardContent.innerHTML = `
        <section class="products-section">
            <div class="section-header">
                <h2>Product Inventory</h2>
                <button class="action-btn primary" onclick="openProductModal()">
                    <i class="fas fa-plus"></i>
                    <span>Add New Product</span>
                </button>
            </div>

            <div class="products-table-container">
                <div class="table-controls">
                    <div class="search-bar">
                        <i class="fas fa-search"></i>
                        <input type="text" id="productSearch" placeholder="Search products..." oninput="filterProducts()">
                    </div>
                    <select id="categoryFilter" onchange="filterProducts()">
                        <option value="">All Categories</option>
                        ${CATEGORIES.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
                    </select>
                </div>

                <table class="products-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th onclick="sortTable('name')">Product Name <i class="fas fa-sort"></i></th>
                            <th onclick="sortTable('category')">Category <i class="fas fa-sort"></i></th>
                            <th onclick="sortTable('price')">Price <i class="fas fa-sort"></i></th>
                            <th onclick="sortTable('stock')">Stock <i class="fas fa-sort"></i></th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="productsTableBody">
                        ${renderProductRows(products)}
                    </tbody>
                </table>
            </div>
        </section>
    `;
}

/**
 * Render product table rows
 */
function renderProductRows(productsList) {
    if (productsList.length === 0) {
        return `
            <tr>
                <td colspan="7" class="empty-state">
                    <i class="fas fa-box-open"></i>
                    <p>No products found. Add your first product!</p>
                </td>
            </tr>
        `;
    }

    return productsList.map(product => `
        <tr class="product-row">
            <td><img src="${product.image}" alt="${product.name}" class="product-thumb"></td>
            <td><strong>${product.name}</strong></td>
            <td><span class="category-tag">${product.category}</span></td>
            <td>₱${product.price.toLocaleString()}</td>
            <td>${product.stock}</td>
            <td>${getStatusBadge(product.status || 'active')}</td>
            <td>
                <div class="action-buttons-inline">
                    <button class="btn-edit" onclick="editProduct(${product.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-delete" onclick="confirmDelete(${product.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

/**
 * Get status badge based on status and stock
 */
function getStatusBadge(status) {
    if (status === 'inactive') {
        return '<span class="status out-of-stock">Inactive</span>';
    }
    
    // Find product to check stock
    const product = products.find(p => p.status === status || p.stock !== undefined);
    const stock = product ? product.stock : 0;
    
    if (stock === 0) {
        return '<span class="status out-of-stock">Out of Stock</span>';
    } else if (stock <= 10) {
        return '<span class="status low-stock">Low Stock</span>';
    } else {
        return '<span class="status in-stock">In Stock</span>';
    }
}

/**
 * Render placeholder page for other sections
 */
function renderPlaceholderPage(pageName) {
    elements.headerTitle.textContent = pageName.charAt(0).toUpperCase() + pageName.slice(1);
    
    elements.dashboardContent.innerHTML = `
        <div class="placeholder-page">
            <i class="fas fa-tools"></i>
            <h2>${pageName.charAt(0).toUpperCase() + pageName.slice(1)} Section</h2>
            <p>This section is under development and will be available soon.</p>
        </div>
    `;
}

// ====================
// Product CRUD Operations
// ====================

/**
 * Open product modal for add/edit
 */
window.openProductModal = function(productId = null) {
    editingProductId = productId;
    const modal = document.getElementById('productModal');
    const form = document.getElementById('productForm');
    const title = document.getElementById('modalTitle');

    // Reset form
    form.reset();
    document.getElementById('productImagePreview').src = 'PCimages/CyborgGaming.jpg';
    document.getElementById('specsContainer').innerHTML = '';
    resetImageUpload();

    if (productId) {
        // Edit mode
        const product = products.find(p => p.id === productId);
        title.textContent = 'Edit Product';
        
        document.getElementById('productName').value = product.name;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productStock').value = product.stock;
        document.getElementById('productImage').value = product.image;
        document.getElementById('productImagePreview').src = product.image;
        
        // Handle image type (Base64 or path)
        if (product.image.startsWith('data:image')) {
            currentImageBase64 = product.image;
            document.getElementById('selectedFileName').textContent = 'Saved image (Base64)';
        } else {
            currentImageBase64 = '';
            const fileName = product.image.split('/').pop();
            document.getElementById('selectedFileName').textContent = fileName || 'No file chosen';
        }
        
        document.getElementById('productShortDesc').value = product.shortDescription || '';
        document.getElementById('productFullDesc').value = product.fullDescription || '';
        document.getElementById('productStatus').value = product.status || 'active';
        
        // Load existing specs
        if (product.specs && product.specs.length > 0) {
            product.specs.forEach(spec => addSpecField(spec));
        }
    } else {
        // Add mode
        title.textContent = 'Add New Product';
    }

    modal.classList.add('active');
}

/**
 * Close product modal
 */
window.closeProductModal = function() {
    document.getElementById('productModal').classList.remove('active');
    editingProductId = null;
}

/**
 * Add specification field
 */
window.addSpecField = function(value = '') {
    const container = document.getElementById('specsContainer');
    const specDiv = document.createElement('div');
    specDiv.className = 'spec-field';
    specDiv.innerHTML = `
        <input type="text" class="spec-input" placeholder="Enter specification" value="${value}">
        <button type="button" class="btn-remove-spec" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    container.appendChild(specDiv);
}

/**
 * Get all specification values
 */
function getSpecs() {
    const specInputs = document.querySelectorAll('.spec-input');
    return Array.from(specInputs)
        .map(input => input.value.trim())
        .filter(val => val !== '');
}

/**
 * Handle image file upload and convert to Base64
 */
window.handleImageUpload = function(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        showAlert('Please select a valid image file', 'error');
        return;
    }
    
    // Validate file size (max 2MB for localStorage)
    if (file.size > 2 * 1024 * 1024) {
        showAlert('Image must be less than 2MB', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const base64 = e.target.result;
        currentImageBase64 = base64;
        document.getElementById('productImagePreview').src = base64;
        document.getElementById('productImage').value = base64;
        document.getElementById('selectedFileName').textContent = file.name;
    };
    reader.readAsDataURL(file);
}

/**
 * Reset image upload state
 */
function resetImageUpload() {
    currentImageBase64 = '';
    document.getElementById('productImageFile').value = '';
    document.getElementById('selectedFileName').textContent = 'No file chosen';
    document.getElementById('productImage').value = '';
    document.getElementById('productImagePreview').src = 'PCimages/CyborgGaming.jpg';
}

/**
 * Save product
 */
window.saveProduct = function() {
    const form = document.getElementById('productForm');
    const formData = new FormData(form);

    const specs = getSpecs();
    
    const productData = {
        id: editingProductId || Date.now(),
        name: formData.get('name').trim(),
        category: formData.get('category'),
        price: parseFloat(formData.get('price')),
        stock: parseInt(formData.get('stock')),
        image: formData.get('image') || 'PCimages/CyborgGaming.jpg',
        shortDescription: formData.get('shortDescription').trim(),
        fullDescription: formData.get('fullDescription').trim(),
        specs: specs,
        status: formData.get('status') || 'active'
    };

    // Validation
    if (!productData.name || !productData.category || !productData.price || productData.stock < 0) {
        showAlert('Please fill in all required fields', 'error');
        return;
    }

    if (editingProductId) {
        // Update existing product
        const index = products.findIndex(p => p.id === editingProductId);
        products[index] = productData;
        showAlert('Product updated successfully!', 'success');
    } else {
        // Add new product
        products.push(productData);
        showAlert('Product added successfully!', 'success');
    }

    saveProducts();
    closeProductModal();
    renderProductsPage();
}

/**
 * Edit product
 */
window.editProduct = function(productId) {
    openProductModal(productId);
}

/**
 * Confirm delete product
 */
window.confirmDelete = function(productId) {
    const modal = document.getElementById('deleteModal');
    const product = products.find(p => p.id === productId);
    
    document.getElementById('deleteProductName').textContent = product.name;
    document.getElementById('confirmDeleteBtn').onclick = () => deleteProduct(productId);
    
    modal.classList.add('active');
}

/**
 * Delete product
 */
function deleteProduct(productId) {
    products = products.filter(p => p.id !== productId);
    saveProducts();
    
    document.getElementById('deleteModal').classList.remove('active');
    showAlert('Product deleted successfully!', 'success');
    renderProductsPage();
}

/**
 * Close delete modal
 */
window.closeDeleteModal = function() {
    document.getElementById('deleteModal').classList.remove('active');
}

// ====================
// Filter and Sort
// ====================

/**
 * Filter products
 */
window.filterProducts = function() {
    const searchTerm = document.getElementById('productSearch').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;

    let filtered = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        const matchesCategory = !categoryFilter || product.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    document.getElementById('productsTableBody').innerHTML = renderProductRows(filtered);
}

/**
 * Sort table
 */
window.sortTable = function(column) {
    sortDirection[column] = sortDirection[column] === 'asc' ? 'desc' : 'asc';
    const dir = sortDirection[column];
    
    products.sort((a, b) => {
        if (typeof a[column] === 'string') {
            return dir === 'asc' ? a[column].localeCompare(b[column]) : b[column].localeCompare(a[column]);
        }
        return dir === 'asc' ? a[column] - b[column] : b[column] - a[column];
    });
    
    document.getElementById('productsTableBody').innerHTML = renderProductRows(products);
}

// ====================
// Modal and Alert System
// ====================

/**
 * Create modal elements
 */
function createModals() {
    // Add Product Modal
    const productModal = document.createElement('div');
    productModal.id = 'productModal';
    productModal.className = 'modal-overlay';
    productModal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3 id="modalTitle">Add New Product</h3>
                <button class="modal-close" onclick="closeProductModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form id="productForm" class="modal-content">
                <div class="form-grid">
                    <div class="form-group">
                        <label>Product Name</label>
                        <input type="text" name="name" id="productName" placeholder="Enter product name" required>
                    </div>
                    <div class="form-group">
                        <label>Category</label>
                        <select name="category" id="productCategory" required>
                            <option value="">Select Category</option>
                            ${CATEGORIES.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Price (₱)</label>
                        <input type="number" name="price" id="productPrice" step="0.01" min="0" placeholder="0.00" required>
                    </div>
                    <div class="form-group">
                        <label>Stock</label>
                        <input type="number" name="stock" id="productStock" min="0" placeholder="0" required>
                    </div>
                    <div class="form-group">
                        <label>Status</label>
                        <select name="status" id="productStatus">
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    <div class="form-group full-width">
                        <label>Product Image</label>
                        <div class="image-upload-container">
                            <input type="file" id="productImageFile" accept="image/*" style="display:none" onchange="handleImageUpload(event)">
                            <button type="button" class="btn-upload-image" onclick="document.getElementById('productImageFile').click()">
                                <i class="fas fa-cloud-upload-alt"></i>
                                <span>Choose Image</span>
                            </button>
                            <span id="selectedFileName" class="selected-file-name">No file chosen</span>
                            <input type="hidden" name="image" id="productImage">
                        </div>
                    </div>
                    <div class="form-group full-width">
                        <label>Preview</label>
                        <img id="productImagePreview" src="PCimages/CyborgGaming.jpg" alt="Product Preview" class="image-preview">
                    </div>
                    <div class="form-group full-width">
                        <label>Short Description</label>
                        <textarea name="shortDescription" id="productShortDesc" placeholder="Brief description for product card" rows="2"></textarea>
                    </div>
                    <div class="form-group full-width">
                        <label>Full Description</label>
                        <textarea name="fullDescription" id="productFullDesc" placeholder="Detailed description for product modal" rows="3"></textarea>
                    </div>
                    <div class="form-group full-width">
                        <label>Specifications</label>
                        <div id="specsContainer" class="specs-container">
                            <!-- Spec fields will be added here -->
                        </div>
                        <button type="button" class="btn-add-spec" onclick="addSpecField()">
                            <i class="fas fa-plus"></i> Add Specification
                        </button>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-cancel" onclick="closeProductModal()">Cancel</button>
                    <button type="button" class="btn-save" onclick="saveProduct()">Save Product</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(productModal);

    // Delete Confirmation Modal
    const deleteModal = document.createElement('div');
    deleteModal.id = 'deleteModal';
    deleteModal.className = 'modal-overlay';
    deleteModal.innerHTML = `
        <div class="modal modal-small">
            <div class="modal-header">
                <h3>Confirm Delete</h3>
                <button class="modal-close" onclick="closeDeleteModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-content">
                <p>Are you sure you want to delete <strong id="deleteProductName"></strong>?</p>
                <p class="warning-text">This action cannot be undone.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn-cancel" onclick="closeDeleteModal()">Cancel</button>
                <button type="button" class="btn-delete" id="confirmDeleteBtn">Delete Product</button>
            </div>
        </div>
    `;
    document.body.appendChild(deleteModal);

    // Close modal when clicking outside
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    });
}

/**
 * Create alert system
 */
function createAlertSystem() {
    elements.alertContainer = document.createElement('div');
    elements.alertContainer.className = 'alert-container';
    document.body.appendChild(elements.alertContainer);
}

/**
 * Show alert message
 */
function showAlert(message, type = 'success') {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    elements.alertContainer.appendChild(alert);
    
    // Animate in
    setTimeout(() => alert.classList.add('show'), 10);
    
    // Auto remove
    setTimeout(() => {
        alert.classList.remove('show');
        setTimeout(() => alert.remove(), 300);
    }, 3000);
}