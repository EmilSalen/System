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
const PREVIOUS_STATS_KEY = 'dashboard_previous_stats';
const SETTINGS_STORAGE_KEY = 'cyber_store_settings';
const CATEGORIES = ['Gaming', 'Office', 'WiFi'];

// Default Settings
const DEFAULT_SETTINGS = {
    profile: {
        fullName: 'Admin User',
        username: 'admin',
        email: '',
        contactNumber: '',
        profilePicture: null
    },
    store: {
        storeName: 'Cyber Store',
        storeEmail: '',
        storeContact: '',
        storeAddress: '',
        businessHours: 'Mon - Sat: 9:00 AM - 6:00 PM',
        storeLogo: null
    },
    payment: {
        cashOnDelivery: true,
        gcash: false,
        maya: false,
        bankTransfer: false,
        gcashNumber: '',
        mayaNumber: '',
        bankAccountName: '',
        bankAccountNumber: ''
    },
    delivery: {
        standardDeliveryFee: 150,
        freeShippingMinimum: 5000,
        deliveryAreas: 'Metro Manila, Cavite, Laguna, Rizal, Bulacan',
        estimatedDeliveryTime: '3-5 business days'
    },
    notifications: {
        newOrderNotifications: true,
        newCustomerAlerts: true,
        revenueReports: true,
        customerMessageAlerts: true,
        lowStockAlerts: true
    },
    preferences: {
        currency: 'PHP',
        dateFormat: 'MM/DD/YYYY',
        timeFormat: '12h',
        dashboardDefaultView: 'dashboard',
        autoBackupReminder: true
    }
};

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
    updateMessageBadge();
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
 * Get settings from localStorage with defaults
 */
function getSettings() {
    const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            // Deep merge with defaults to ensure all keys exist
            return deepMerge(JSON.parse(JSON.stringify(DEFAULT_SETTINGS)), parsed);
        } catch (e) {
            console.error('Error parsing settings:', e);
            return JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
        }
    }
    return JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
}

/**
 * Save settings to localStorage
 */
function saveSettings(settings) {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
}

/**
 * Deep merge two objects
 */
function deepMerge(target, source) {
    const output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!(key in target)) Object.assign(output, { [key]: source[key] });
                else output[key] = deepMerge(target[key], source[key]);
            } else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }
    return output;
}

function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
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
    } else if (pageName === 'customers') {
        currentPage = 'customers';
        renderCustomersPage();
    } else if (pageName === 'dashboard') {
        currentPage = 'dashboard';
        renderDashboardPage();
    } else if (pageName === 'revenue') {
        currentPage = 'revenue';
        renderRevenuePage();
    } else if (pageName === 'messages') {
        currentPage = 'messages';
        renderMessagesPage();
    } else if (pageName === 'settings') {
        currentPage = 'settings';
        renderSettingsPage();
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
                            <th>Products</th>
                            <th>Total Price</th>
                            <th>Payment Method</th>
                            <th>Order Date</th>
                            <th>Order Status</th>
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
                <td colspan="8" class="empty-state">
                    <i class="fas fa-shopping-cart"></i>
                    <p>No orders yet. Orders will appear here when customers make purchases.</p>
                </td>
            </tr>
        `;
    }

    return orders.map(order => {
        const productsList = order.products || [];
        const productsHtml = productsList.map(p => `
            <div class="order-product-inline">
                <img src="${p.image || 'images/placeholder.jpg'}" alt="${p.name}" class="order-product-thumb">
                <span class="order-product-name">${p.name} (x${p.quantity || 1})</span>
            </div>
        `).join('');
        
        return `
            <tr class="order-row">
                <td><strong>${order.id}</strong></td>
                <td>${order.customerName || 'Guest'}</td>
                <td class="products-cell">${productsHtml}</td>
                <td>₱${(order.totalPrice || 0).toLocaleString()}</td>
                <td>${order.paymentMethod || 'Cash'}</td>
                <td>${order.orderDate || '-'}</td>
                <td>${getOrderStatusBadge(order.orderStatus || 'Pending')}</td>
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
 * Get previous dashboard stats snapshot from localStorage
 */
function getPreviousStats() {
    const stored = localStorage.getItem(PREVIOUS_STATS_KEY);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error('Error parsing previous stats:', e);
            return null;
        }
    }
    return null;
}

/**
 * Calculate percentage change between current and previous values
 * Returns object with display text, CSS class, and icon HTML
 */
function calculatePercentageChange(current, previous) {
    // No previous data or first load
    if (previous === null || previous === undefined) {
        return { text: '0%', trendClass: 'neutral', icon: '<i class="fas fa-minus"></i>' };
    }

    const prevNum = Number(previous);
    const currNum = Number(current);

    // Prevent divide-by-zero or invalid numbers
    if (isNaN(prevNum) || isNaN(currNum) || prevNum === 0) {
        return { text: '0%', trendClass: 'neutral', icon: '<i class="fas fa-minus"></i>' };
    }

    if (currNum === prevNum) {
        return { text: '0%', trendClass: 'neutral', icon: '<i class="fas fa-minus"></i>' };
    }

    const change = ((currNum - prevNum) / prevNum) * 100;
    const sign = change > 0 ? '+' : '';
    const text = `${sign}${change.toFixed(0)}%`;
    const trendClass = change > 0 ? 'positive' : 'negative';
    const icon = change > 0 ? '<i class="fas fa-arrow-up"></i>' : '<i class="fas fa-arrow-down"></i>';

    return { text, trendClass, icon };
}

/**
 * Save current dashboard stats snapshot to localStorage
 */
function saveCurrentStats(stats) {
    try {
        localStorage.setItem(PREVIOUS_STATS_KEY, JSON.stringify(stats));
    } catch (e) {
        console.error('Error saving current stats:', e);
    }
}

/**
 * Render Dashboard Page
 */
function renderDashboardPage() {
    elements.headerTitle.textContent = 'Dashboard';
    
    const orders = getOrders();
    const recentOrders = orders.slice(-5).reverse(); // Last 5 orders
    
    // Calculate current stats
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
    const pendingOrders = orders.filter(o => o.orderStatus === 'Pending').length;
    const totalProducts = products.length;
    const totalCustomers = getCustomers().length;
    const unreadMessages = getUnreadMessagesCount();
    
    // Get previous stats and calculate changes
    const previousStats = getPreviousStats();
    const ordersTrend = calculatePercentageChange(totalOrders, previousStats ? previousStats.totalOrders : null);
    const revenueTrend = calculatePercentageChange(totalRevenue, previousStats ? previousStats.totalRevenue : null);
    const productsTrend = calculatePercentageChange(totalProducts, previousStats ? previousStats.totalProducts : null);
    const pendingTrend = calculatePercentageChange(pendingOrders, previousStats ? previousStats.pendingOrders : null);
    const customersTrend = calculatePercentageChange(totalCustomers, previousStats ? previousStats.totalCustomers : null);
    
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
                    <h3>${totalOrders}</h3>
                    <p>Total Orders</p>
                    <span class="trend ${ordersTrend.trendClass}">${ordersTrend.text} ${ordersTrend.icon}</span>
                </div>
            </div>

            <div class="summary-card">
                <div class="card-icon purple">
                    <i class="fas fa-dollar-sign"></i>
                </div>
                <div class="card-info">
                    <h3>₱${totalRevenue.toLocaleString()}</h3>
                    <p>Total Revenue</p>
                    <span class="trend ${revenueTrend.trendClass}">${revenueTrend.text} ${revenueTrend.icon}</span>
                </div>
            </div>

            <div class="summary-card">
                <div class="card-icon green">
                    <i class="fas fa-users"></i>
                </div>
                <div class="card-info">
                    <h3>${totalCustomers}</h3>
                    <p>Total Customers</p>
                    <span class="trend ${customersTrend.trendClass}">${customersTrend.text} ${customersTrend.icon}</span>
                </div>
            </div>

            <div class="summary-card">
                <div class="card-icon orange">
                    <i class="fas fa-box"></i>
                </div>
                <div class="card-info">
                    <h3>${pendingOrders}</h3>
                    <p>Pending Orders</p>
                    <span class="trend ${pendingTrend.trendClass}">${pendingTrend.text} ${pendingTrend.icon}</span>
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

    // Save current stats snapshot for next comparison
    saveCurrentStats({
        totalOrders,
        totalRevenue,
        pendingOrders,
        totalProducts,
        totalCustomers
    });
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
// Customers Management
// ====================

const CUSTOMERS_STORAGE_KEY = 'storeUsers';

/**
 * Get all customers from localStorage
 */
function getCustomers() {
    const stored = localStorage.getItem(CUSTOMERS_STORAGE_KEY);
    if (stored) {
        try {
            const usersObj = JSON.parse(stored);
            return Object.entries(usersObj).map(([username, data], index) => ({
                id: `CUST-${1001 + index}`,
                username,
                ...data
            }));
        } catch (e) {
            console.error('Error parsing storeUsers:', e);
            return [];
        }
    }
    return [];
}

/**
 * Save customers object to localStorage
 */
function saveCustomers(usersObj) {
    localStorage.setItem(CUSTOMERS_STORAGE_KEY, JSON.stringify(usersObj));
}

/**
 * Get order statistics for a specific customer
 */
function getCustomerOrders(username) {
    const orders = getOrders();
    const customerOrders = orders.filter(o => o.username === username);
    const totalOrders = customerOrders.length;
    const totalSpent = customerOrders.reduce((sum, o) => sum + (o.totalPrice || o.total || 0), 0);
    return { totalOrders, totalSpent, customerOrders };
}

/**
 * Determine customer account status
 */
function getCustomerStatus(totalSpent, totalOrders) {
    if (totalSpent >= 50000) return 'VIP';
    if (totalOrders >= 1) return 'Active';
    return 'Inactive';
}

/**
 * Get HTML for customer status badge
 */
function getCustomerStatusBadge(status) {
    const classes = {
        'VIP': 'vip',
        'Active': 'active',
        'Inactive': 'inactive'
    };
    return `<span class="customer-status-badge ${classes[status] || 'inactive'}">${status}</span>`;
}

/**
 * Render Customers Management Page
 */
function renderCustomersPage() {
    elements.headerTitle.textContent = 'Customers Management';
    const customers = getCustomers();
    
    elements.dashboardContent.innerHTML = `
        <section class="customers-section">
            <div class="section-header">
                <h2>Customer Accounts</h2>
                <span class="customers-count">Total: ${customers.length} customers</span>
            </div>
            
            <div class="customers-table-container">
                <div class="table-controls">
                    <div class="search-bar">
                        <i class="fas fa-search"></i>
                        <input type="text" id="customerSearch" placeholder="Search by name, username, or email..." oninput="filterCustomers()">
                    </div>
                </div>
                
                <div class="table-wrapper">
                    <table class="customers-table">
                        <thead>
                            <tr>
                                <th>Customer ID</th>
                                <th>Full Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Contact Number</th>
                                <th>Address</th>
                                <th>Registration Date</th>
                                <th>Total Orders</th>
                                <th>Total Spent</th>
                                <th>Account Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="customersTableBody">
                            ${renderCustomerRows(customers)}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    `;
}

/**
 * Render customer table rows
 */
function renderCustomerRows(customers) {
    if (customers.length === 0) {
        return `
            <tr>
                <td colspan="11" class="empty-state">
                    <i class="fas fa-users"></i>
                    <p>No customers registered yet</p>
                </td>
            </tr>
        `;
    }
    
    return customers.map(customer => {
        const orderStats = getCustomerOrders(customer.username);
        const status = getCustomerStatus(orderStats.totalSpent, orderStats.totalOrders);
        const regDate = customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : '-';
        
        return `
            <tr class="customer-row">
                <td><strong>${customer.id}</strong></td>
                <td>${customer.firstName || ''} ${customer.lastName || ''}</td>
                <td>${customer.username}</td>
                <td>${customer.email || '-'}</td>
                <td>${customer.phone || '-'}</td>
                <td class="address-cell" title="${customer.address || ''}">${customer.address || '-'}</td>
                <td>${regDate}</td>
                <td>${orderStats.totalOrders}</td>
                <td>₱${orderStats.totalSpent.toLocaleString()}</td>
                <td>${getCustomerStatusBadge(status)}</td>
                <td>
                    <div class="action-buttons-inline">
                        <button class="btn-view" onclick="viewCustomerDetails('${customer.username}')" title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-delete" onclick="confirmDeleteCustomer('${customer.username}')" title="Delete Customer">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

/**
 * Filter customers by search term
 */
window.filterCustomers = function() {
    const searchTerm = document.getElementById('customerSearch').value.toLowerCase();
    const customers = getCustomers();
    
    const filtered = customers.filter(customer => {
        const fullName = `${customer.firstName || ''} ${customer.lastName || ''}`.toLowerCase();
        const username = customer.username.toLowerCase();
        const email = (customer.email || '').toLowerCase();
        return fullName.includes(searchTerm) || username.includes(searchTerm) || email.includes(searchTerm);
    });
    
    document.getElementById('customersTableBody').innerHTML = renderCustomerRows(filtered);
}

/**
 * View customer details in modal
 */
window.viewCustomerDetails = function(username) {
    const users = JSON.parse(localStorage.getItem(CUSTOMERS_STORAGE_KEY) || '{}');
    const customer = users[username];
    if (!customer) {
        showAlert('Customer not found', 'error');
        return;
    }
    
    const orderStats = getCustomerOrders(username);
    const status = getCustomerStatus(orderStats.totalSpent, orderStats.totalOrders);
    const regDate = customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : '-';
    
    const ordersHtml = orderStats.customerOrders.map(order => `
        <div class="order-history-item">
            <div class="order-history-header">
                <span><strong>${order.id}</strong></span>
                <span>${order.orderDate || '-'}</span>
                <span class="order-status ${(order.orderStatus || 'pending').toLowerCase()}">${order.orderStatus || 'Pending'}</span>
            </div>
            <div class="order-history-products">
                ${(order.products || order.items || []).map(p => `
                    <span>${p.name} (x${p.quantity || 1})</span>
                `).join(', ')}
            </div>
            <div class="order-history-total">₱${(order.totalPrice || order.total || 0).toLocaleString()}</div>
        </div>
    `).join('');
    
    const modal = document.createElement('div');
    modal.id = 'customerDetailsModal';
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
        <div class="modal modal-large">
            <div class="modal-header">
                <h3>Customer Profile - ${customer.firstName || ''} ${customer.lastName || ''}</h3>
                <button class="modal-close" onclick="closeCustomerDetails()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-content">
                <div class="customer-details-grid">
                    <div class="customer-info-section">
                        <h4>Personal Information</h4>
                        <p><strong>Full Name:</strong> ${customer.firstName || ''} ${customer.lastName || ''}</p>
                        <p><strong>Username:</strong> ${username}</p>
                        <p><strong>Email:</strong> ${customer.email || '-'}</p>
                        <p><strong>Contact Number:</strong> ${customer.phone || '-'}</p>
                        <p><strong>Address:</strong> ${customer.address || '-'}</p>
                    </div>
                    
                    <div class="customer-info-section">
                        <h4>Account Statistics</h4>
                        <p><strong>Registration Date:</strong> ${regDate}</p>
                        <p><strong>Total Orders:</strong> ${orderStats.totalOrders}</p>
                        <p><strong>Total Spent:</strong> ₱${orderStats.totalSpent.toLocaleString()}</p>
                        <p><strong>Account Status:</strong> ${getCustomerStatusBadge(status)}</p>
                    </div>
                </div>
                
                <div class="customer-orders-section">
                    <h4>Order History</h4>
                    ${orderStats.customerOrders.length > 0 ? `
                        <div class="order-history-list">
                            ${ordersHtml}
                        </div>
                    ` : '<p class="no-orders-text">No orders placed yet.</p>'}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeCustomerDetails();
    });
}

window.closeCustomerDetails = function() {
    const modal = document.getElementById('customerDetailsModal');
    if (modal) modal.remove();
}

/**
 * Confirm customer deletion
 */
window.confirmDeleteCustomer = function(username) {
    const currentAdmin = localStorage.getItem('storeUsername');
    if (username === currentAdmin) {
        showAlert('Cannot delete the currently logged-in admin account.', 'error');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem(CUSTOMERS_STORAGE_KEY) || '{}');
    const customer = users[username];
    if (!customer) {
        showAlert('Customer not found', 'error');
        return;
    }
    
    const modal = document.createElement('div');
    modal.id = 'deleteCustomerModal';
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
        <div class="modal modal-small">
            <div class="modal-header">
                <h3>Confirm Delete Customer</h3>
                <button class="modal-close" onclick="closeDeleteCustomerModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-content">
                <p>Are you sure you want to delete customer <strong>${customer.firstName || ''} ${customer.lastName || ''}</strong>?</p>
                <p class="warning-text">This will permanently remove the account and cannot be undone.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn-cancel" onclick="closeDeleteCustomerModal()">Cancel</button>
                <button type="button" class="btn-delete" onclick="deleteCustomer('${username}')">Delete Customer</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeDeleteCustomerModal();
    });
}

window.closeDeleteCustomerModal = function() {
    const modal = document.getElementById('deleteCustomerModal');
    if (modal) modal.remove();
}

/**
 * Delete customer from localStorage
 */
window.deleteCustomer = function(username) {
    const users = JSON.parse(localStorage.getItem(CUSTOMERS_STORAGE_KEY) || '{}');
    delete users[username];
    saveCustomers(users);
    
    showAlert('Customer deleted successfully!', 'success');
    closeDeleteCustomerModal();
    renderCustomersPage();
}

// ====================
// Revenue Dashboard
// ====================

let revenueChartInstance = null;
let currentRevenueFilter = 'all';

/**
 * Safely get order total
 */
function getOrderTotal(order) {
    return order.totalPrice || order.total || 0;
}

/**
 * Parse order date string to Date object
 */
function parseOrderDate(order) {
    if (!order.orderDate) return null;
    const dateStr = order.orderDate;
    let date = new Date(dateStr);
    if (!isNaN(date.getTime())) return date;
    const parts = dateStr.split(/[\/\-\.]/);
    if (parts.length === 3) {
        date = new Date(`${parts[2]}-${parts[0]}-${parts[1]}`);
        if (!isNaN(date.getTime())) return date;
        date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
        if (!isNaN(date.getTime())) return date;
    }
    return null;
}

/**
 * Filter orders by time period
 */
function filterOrdersByTime(orders, filter) {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(todayStart);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    return orders.filter(order => {
        const d = parseOrderDate(order);
        if (!d) return false;
        switch (filter) {
            case 'today': return d >= todayStart;
            case 'week': return d >= weekStart;
            case 'month': return d >= monthStart;
            case 'all': default: return true;
        }
    });
}

/**
 * Calculate revenue statistics
 */
function calculateRevenueStats(orders) {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(todayStart);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    let totalRevenue = 0;
    let todayRevenue = 0;
    let weekRevenue = 0;
    let monthRevenue = 0;
    let paidOrders = 0;
    let unpaidOrders = 0;
    let totalOrders = 0;

    orders.forEach(order => {
        const total = getOrderTotal(order);
        const d = parseOrderDate(order);
        totalRevenue += total;
        totalOrders++;

        if (order.paymentStatus === 'Paid') paidOrders++;
        if (order.paymentStatus === 'Unpaid') unpaidOrders++;

        if (d) {
            if (d >= todayStart) todayRevenue += total;
            if (d >= weekStart) weekRevenue += total;
            if (d >= monthStart) monthRevenue += total;
        }
    });

    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    return {
        totalRevenue,
        todayRevenue,
        weekRevenue,
        monthRevenue,
        paidOrders,
        unpaidOrders,
        totalOrders,
        avgOrderValue
    };
}

/**
 * Prepare chart data based on filter
 */
function prepareChartData(orders, filter) {
    const now = new Date();
    const filtered = filterOrdersByTime(orders, filter);

    if (filter === 'today') {
        const hours = Array.from({length: 24}, (_, i) => {
            const h = i % 12 || 12;
            const ampm = i < 12 ? 'AM' : 'PM';
            return `${h} ${ampm}`;
        });
        const data = new Array(24).fill(0);
        filtered.forEach(order => {
            const d = parseOrderDate(order);
            if (d) {
                data[d.getHours()] += getOrderTotal(order);
            }
        });
        return { labels: hours, data, label: 'Hourly Revenue' };
    }

    if (filter === 'week') {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const data = new Array(7).fill(0);
        filtered.forEach(order => {
            const d = parseOrderDate(order);
            if (d) {
                data[d.getDay()] += getOrderTotal(order);
            }
        });
        return { labels: days, data, label: 'Daily Revenue' };
    }

    if (filter === 'month') {
        const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        const labels = Array.from({length: daysInMonth}, (_, i) => `Day ${i + 1}`);
        const data = new Array(daysInMonth).fill(0);
        filtered.forEach(order => {
            const d = parseOrderDate(order);
            if (d) {
                data[d.getDate() - 1] += getOrderTotal(order);
            }
        });
        return { labels, data, label: 'Daily Revenue' };
    }

    const months = [];
    const data = [];
    for (let i = 11; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        months.push(d.toLocaleString('default', { month: 'short', year: 'numeric' }));
        data.push(0);
    }
    filtered.forEach(order => {
        const d = parseOrderDate(order);
        if (d) {
            const monthDiff = (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth());
            if (monthDiff >= 0 && monthDiff < 12) {
                data[11 - monthDiff] += getOrderTotal(order);
            }
        }
    });
    return { labels: months, data, label: 'Monthly Revenue' };
}

/**
 * Initialize or update Chart.js line chart
 */
function initRevenueChart(labels, data, label) {
    const ctx = document.getElementById('revenueChart');
    if (!ctx) return;

    if (revenueChartInstance) {
        revenueChartInstance.destroy();
    }

    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(0, 240, 255, 0.35)');
    gradient.addColorStop(0.5, 'rgba(176, 38, 255, 0.1)');
    gradient.addColorStop(1, 'rgba(0, 240, 255, 0.0)');

    revenueChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                borderColor: '#00f0ff',
                backgroundColor: gradient,
                borderWidth: 3,
                pointBackgroundColor: '#b026ff',
                pointBorderColor: '#00f0ff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: '#00f0ff',
                pointHoverBorderColor: '#fff',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1200,
                easing: 'easeOutQuart'
            },
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#9ca3af',
                        font: { size: 14, family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(17, 24, 39, 0.95)',
                    titleColor: '#00f0ff',
                    bodyColor: '#f3f4f6',
                    borderColor: '#2d3748',
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return '₱' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(45, 55, 72, 0.5)',
                        borderColor: '#2d3748'
                    },
                    ticks: {
                        color: '#9ca3af'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(45, 55, 72, 0.5)',
                        borderColor: '#2d3748'
                    },
                    ticks: {
                        color: '#9ca3af',
                        callback: function(value) {
                            return '₱' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

/**
 * Render revenue table rows
 */
function renderRevenueTableRows(orders) {
    if (orders.length === 0) {
        return `
            <tr>
                <td colspan="10" class="empty-state">
                    <i class="fas fa-receipt"></i>
                    <p>No revenue data available yet</p>
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
                <td class="products-cell" title="${productsText}">${productsText}</td>
                <td>₱${getOrderTotal(order).toLocaleString()}</td>
                <td>${order.paymentMethod || 'Cash'}</td>
                <td>${getPaymentStatusBadge(order.paymentStatus || 'Unpaid')}</td>
                <td>${getOrderStatusBadge(order.orderStatus || 'Pending')}</td>
                <td>${order.orderDate || '-'}</td>
                <td>
                    <div class="action-buttons-inline">
                        <button class="btn-view" onclick="viewOrderDetails('${order.id}')" title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                        ${(order.paymentStatus !== 'Paid') ? `
                        <button class="btn-edit" onclick="markOrderAsPaid('${order.id}')" title="Mark as Paid">
                            <i class="fas fa-check"></i>
                        </button>
                        ` : ''}
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

/**
 * Main render function for Revenue Page
 */
function renderRevenuePage() {
    elements.headerTitle.textContent = 'Revenue Analytics';
    const orders = getOrders();
    const stats = calculateRevenueStats(orders);
    const hasOrders = orders.length > 0;

    elements.dashboardContent.innerHTML = `
        <section class="revenue-section">
            <!-- Summary Cards -->
            <div class="revenue-summary-cards">
                <div class="summary-card">
                    <div class="card-icon purple">
                        <i class="fas fa-wallet"></i>
                    </div>
                    <div class="card-info">
                        <h3>₱${stats.totalRevenue.toLocaleString()}</h3>
                        <p>Total Revenue</p>
                    </div>
                </div>
                <div class="summary-card">
                    <div class="card-icon blue">
                        <i class="fas fa-calendar-day"></i>
                    </div>
                    <div class="card-info">
                        <h3>₱${stats.todayRevenue.toLocaleString()}</h3>
                        <p>Today's Revenue</p>
                    </div>
                </div>
                <div class="summary-card">
                    <div class="card-icon cyan">
                        <i class="fas fa-calendar-week"></i>
                    </div>
                    <div class="card-info">
                        <h3>₱${stats.weekRevenue.toLocaleString()}</h3>
                        <p>This Week's Revenue</p>
                    </div>
                </div>
                <div class="summary-card">
                    <div class="card-icon pink">
                        <i class="fas fa-calendar-alt"></i>
                    </div>
                    <div class="card-info">
                        <h3>₱${stats.monthRevenue.toLocaleString()}</h3>
                        <p>This Month's Revenue</p>
                    </div>
                </div>
                <div class="summary-card">
                    <div class="card-icon green">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="card-info">
                        <h3>${stats.paidOrders}</h3>
                        <p>Paid Orders</p>
                    </div>
                </div>
                <div class="summary-card">
                    <div class="card-icon orange">
                        <i class="fas fa-clock"></i>
                    </div>
                    <div class="card-info">
                        <h3>${stats.unpaidOrders}</h3>
                        <p>Unpaid Orders</p>
                    </div>
                </div>
                <div class="summary-card">
                    <div class="card-icon yellow">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <div class="card-info">
                        <h3>₱${Math.round(stats.avgOrderValue).toLocaleString()}</h3>
                        <p>Average Order Value</p>
                    </div>
                </div>
            </div>

            <!-- Chart Section -->
            <div class="revenue-chart-container">
                <div class="chart-header">
                    <h3><i class="fas fa-chart-area"></i> Revenue Trend</h3>
                    ${hasOrders ? `
                    <div class="chart-filters">
                        <button class="chart-filter-btn ${currentRevenueFilter === 'today' ? 'active' : ''}" data-filter="today" onclick="setRevenueFilter('today')">Today</button>
                        <button class="chart-filter-btn ${currentRevenueFilter === 'week' ? 'active' : ''}" data-filter="week" onclick="setRevenueFilter('week')">This Week</button>
                        <button class="chart-filter-btn ${currentRevenueFilter === 'month' ? 'active' : ''}" data-filter="month" onclick="setRevenueFilter('month')">This Month</button>
                        <button class="chart-filter-btn ${currentRevenueFilter === 'all' ? 'active' : ''}" data-filter="all" onclick="setRevenueFilter('all')">All Time</button>
                    </div>
                    ` : ''}
                </div>
                <div class="chart-wrapper">
                    ${hasOrders ? `<canvas id="revenueChart"></canvas>` : `
                    <div class="chart-empty-state">
                        <i class="fas fa-chart-line"></i>
                        <p>No revenue data available yet</p>
                    </div>
                    `}
                </div>
            </div>

            <!-- Table Section -->
            <div class="revenue-table-container">
                <div class="table-controls revenue-table-controls">
                    <div class="search-bar">
                        <i class="fas fa-search"></i>
                        <input type="text" id="revenueSearch" placeholder="Search by Order ID, Customer, Username, or Payment Method..." oninput="filterRevenueOrders()">
                    </div>
                    <select id="revenueFilter" onchange="filterRevenueOrders()">
                        <option value="all">All Orders</option>
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="paid">Paid Orders</option>
                        <option value="unpaid">Unpaid Orders</option>
                    </select>
                </div>
                
                <div class="table-wrapper">
                    <table class="orders-table revenue-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer Name</th>
                                <th>Username</th>
                                <th>Products</th>
                                <th>Total Amount</th>
                                <th>Payment Method</th>
                                <th>Payment Status</th>
                                <th>Order Status</th>
                                <th>Order Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="revenueTableBody">
                            ${renderRevenueTableRows(orders)}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    `;

    if (hasOrders) {
        setTimeout(() => {
            const chartData = prepareChartData(orders, currentRevenueFilter);
            initRevenueChart(chartData.labels, chartData.data, chartData.label);
        }, 0);
    }
}

/**
 * Set chart filter and re-render chart
 */
window.setRevenueFilter = function(filter) {
    currentRevenueFilter = filter;
    const orders = getOrders();
    const chartData = prepareChartData(orders, filter);
    initRevenueChart(chartData.labels, chartData.data, chartData.label);
    
    document.querySelectorAll('.chart-filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });
}

/**
 * Filter revenue orders by search and dropdown filter
 */
window.filterRevenueOrders = function() {
    const searchTerm = document.getElementById('revenueSearch').value.toLowerCase();
    const filterValue = document.getElementById('revenueFilter').value;
    let orders = getOrders();

    if (filterValue === 'paid') {
        orders = orders.filter(o => o.paymentStatus === 'Paid');
    } else if (filterValue === 'unpaid') {
        orders = orders.filter(o => o.paymentStatus === 'Unpaid');
    } else if (filterValue !== 'all') {
        orders = filterOrdersByTime(orders, filterValue);
    }

    if (searchTerm) {
        orders = orders.filter(order => {
            const id = (order.id || '').toLowerCase();
            const name = (order.customerName || '').toLowerCase();
            const username = (order.username || '').toLowerCase();
            const method = (order.paymentMethod || '').toLowerCase();
            return id.includes(searchTerm) || name.includes(searchTerm) || username.includes(searchTerm) || method.includes(searchTerm);
        });
    }

    const tbody = document.getElementById('revenueTableBody');
    if (tbody) tbody.innerHTML = renderRevenueTableRows(orders);
}

/**
 * Mark order as paid
 */
window.markOrderAsPaid = function(orderId) {
    const orders = getOrders();
    const index = orders.findIndex(o => o.id === orderId);
    if (index !== -1) {
        orders[index].paymentStatus = 'Paid';
        orders[index].updatedAt = new Date().toISOString();
        saveOrders(orders);
        showAlert('Order marked as Paid successfully!', 'success');
        renderRevenuePage();
    }
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


// ====================
// Messages Management System
// ====================

const MESSAGES_STORAGE_KEY = 'cyber_store_messages';

let messages = [];
let selectedMessageId = null;
let currentMessagesFilter = 'inbox';
let messagesSearchQuery = '';

/**
 * Get all messages from localStorage
 */
function getMessages() {
    const stored = localStorage.getItem(MESSAGES_STORAGE_KEY);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error('Error parsing stored messages:', e);
            return [];
        }
    }
    return [];
}

/**
 * Save messages to localStorage
 */
function saveMessages(messagesList) {
    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messagesList));
    messages = messagesList;
}

/**
 * Generate unique message ID
 */
function generateMessageId() {
    return 'MSG-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
}

/**
 * Get unread messages count
 */
function getUnreadMessagesCount() {
    const msgs = getMessages();
    return msgs.filter(m => m.status === 'Unread').length;
}

/**
 * Update sidebar badge and header notification dot
 */
function updateMessageBadge() {
    const unreadCount = getUnreadMessagesCount();
    
    // Update sidebar badge
    const messagesMenuItem = Array.from(document.querySelectorAll('.menu-item')).find(
        item => item.querySelector('span')?.textContent.toLowerCase() === 'messages'
    );
    if (messagesMenuItem) {
        let badge = messagesMenuItem.querySelector('.badge');
        if (unreadCount > 0) {
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'badge';
                messagesMenuItem.appendChild(badge);
            }
            badge.textContent = unreadCount;
            badge.style.display = 'inline-block';
        } else if (badge) {
            badge.style.display = 'none';
        }
    }
    
    // Update header notification dot
    const notificationDot = document.querySelector('.notification-dot');
    if (notificationDot) {
        notificationDot.style.display = unreadCount > 0 ? 'block' : 'none';
    }
}

/**
 * Add a new customer message (called from customer-side forms)
 */
window.addCustomerMessage = function(payload) {
    const msgs = getMessages();
    const now = new Date();
    
    const newMessage = {
        id: generateMessageId(),
        customerName: payload.customerName || 'Anonymous',
        username: payload.username || '',
        email: payload.email || '',
        phoneNumber: payload.phoneNumber || '',
        subject: payload.subject || 'No Subject',
        messageContent: payload.messageContent || '',
        messageType: payload.messageType || 'General Inquiry',
        relatedOrderId: payload.relatedOrderId || null,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
        timestamp: now.toISOString(),
        status: 'Unread',
        starred: false,
        adminReplyHistory: []
    };
    
    msgs.unshift(newMessage);
    saveMessages(msgs);
    updateMessageBadge();
    
    // If currently on messages page, refresh it
    if (currentPage === 'messages') {
        renderMessagesPage();
    }
    
    return newMessage.id;
};

/**
 * Format relative time
 */
function formatRelativeTime(timestamp) {
    if (!timestamp) return '-';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
}

/**
 * Get filtered messages based on current filter and search
 */
function getFilteredMessages() {
    let msgs = getMessages();
    
    // Apply label filter
    switch (currentMessagesFilter) {
        case 'inbox':
            msgs = msgs.filter(m => m.status !== 'Archived' && m.status !== 'Deleted');
            break;
        case 'unread':
            msgs = msgs.filter(m => m.status === 'Unread');
            break;
        case 'starred':
            msgs = msgs.filter(m => m.starred);
            break;
        case 'sent':
            msgs = msgs.filter(m => m.status === 'Replied');
            break;
        case 'archived':
            msgs = msgs.filter(m => m.status === 'Archived');
            break;
        case 'deleted':
            msgs = msgs.filter(m => m.status === 'Deleted');
            break;
        case 'order-inquiries':
            msgs = msgs.filter(m => m.messageType === 'Order Inquiry');
            break;
        case 'support':
            msgs = msgs.filter(m => m.messageType === 'Support');
            break;
        case 'refunds':
            msgs = msgs.filter(m => m.messageType === 'Refund');
            break;
        default:
            msgs = msgs.filter(m => m.status !== 'Archived' && m.status !== 'Deleted');
    }
    
    // Apply search filter
    if (messagesSearchQuery.trim()) {
        const q = messagesSearchQuery.toLowerCase();
        msgs = msgs.filter(m => {
            return (m.customerName || '').toLowerCase().includes(q) ||
                   (m.email || '').toLowerCase().includes(q) ||
                   (m.subject || '').toLowerCase().includes(q) ||
                   (m.relatedOrderId || '').toLowerCase().includes(q);
        });
    }
    
    // Sort by timestamp descending (newest first)
    msgs.sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0));
    
    return msgs;
}

/**
 * Get label counts
 */
function getLabelCounts() {
    const msgs = getMessages();
    return {
        inbox: msgs.filter(m => m.status !== 'Archived' && m.status !== 'Deleted').length,
        unread: msgs.filter(m => m.status === 'Unread').length,
        starred: msgs.filter(m => m.starred).length,
        sent: msgs.filter(m => m.status === 'Replied').length,
        archived: msgs.filter(m => m.status === 'Archived').length,
        deleted: msgs.filter(m => m.status === 'Deleted').length,
        orderInquiries: msgs.filter(m => m.messageType === 'Order Inquiry').length,
        support: msgs.filter(m => m.messageType === 'Support').length,
        refunds: msgs.filter(m => m.messageType === 'Refund').length
    };
}

/**
 * Get order by ID
 */
function getOrderById(orderId) {
    if (!orderId) return null;
    const orders = getOrders();
    return orders.find(o => o.id === orderId) || null;
}

/**
 * Render Messages Page
 */
function renderMessagesPage() {
    elements.headerTitle.textContent = 'Messages';
    
    const filteredMessages = getFilteredMessages();
    const counts = getLabelCounts();
    
    elements.dashboardContent.innerHTML = `
        <section class="messages-section">
            <div class="messages-layout">
                <!-- Sidebar Labels -->
                <div class="messages-sidebar">
                    <div class="messages-sidebar-header">
                        <h3>Labels</h3>
                    </div>
                    
                    <div class="messages-label ${currentMessagesFilter === 'inbox' ? 'active' : ''}" onclick="setMessagesFilter('inbox')">
                        <i class="fas fa-inbox"></i>
                        <span>Inbox</span>
                        <span class="label-count ${counts.unread > 0 ? 'unread-badge' : ''}">${counts.inbox}</span>
                    </div>
                    
                    <div class="messages-label ${currentMessagesFilter === 'unread' ? 'active' : ''}" onclick="setMessagesFilter('unread')">
                        <i class="fas fa-envelope"></i>
                        <span>Unread</span>
                        <span class="label-count ${counts.unread > 0 ? 'unread-badge' : ''}">${counts.unread}</span>
                    </div>
                    
                    <div class="messages-label ${currentMessagesFilter === 'starred' ? 'active' : ''}" onclick="setMessagesFilter('starred')">
                        <i class="fas fa-star"></i>
                        <span>Starred</span>
                        <span class="label-count">${counts.starred}</span>
                    </div>
                    
                    <div class="messages-label ${currentMessagesFilter === 'sent' ? 'active' : ''}" onclick="setMessagesFilter('sent')">
                        <i class="fas fa-paper-plane"></i>
                        <span>Sent</span>
                        <span class="label-count">${counts.sent}</span>
                    </div>
                    
                    <div class="messages-label ${currentMessagesFilter === 'archived' ? 'active' : ''}" onclick="setMessagesFilter('archived')">
                        <i class="fas fa-archive"></i>
                        <span>Archived</span>
                        <span class="label-count">${counts.archived}</span>
                    </div>
                    
                    <div class="messages-label ${currentMessagesFilter === 'order-inquiries' ? 'active' : ''}" onclick="setMessagesFilter('order-inquiries')">
                        <i class="fas fa-shopping-bag"></i>
                        <span>Order Inquiries</span>
                        <span class="label-count">${counts.orderInquiries}</span>
                    </div>
                    
                    <div class="messages-label ${currentMessagesFilter === 'support' ? 'active' : ''}" onclick="setMessagesFilter('support')">
                        <i class="fas fa-headset"></i>
                        <span>Support Requests</span>
                        <span class="label-count">${counts.support}</span>
                    </div>
                    
                    <div class="messages-label ${currentMessagesFilter === 'refunds' ? 'active' : ''}" onclick="setMessagesFilter('refunds')">
                        <i class="fas fa-undo-alt"></i>
                        <span>Refund Requests</span>
                        <span class="label-count">${counts.refunds}</span>
                    </div>
                    
                    <div class="messages-label ${currentMessagesFilter === 'deleted' ? 'active' : ''}" onclick="setMessagesFilter('deleted')">
                        <i class="fas fa-trash-alt"></i>
                        <span>Deleted</span>
                        <span class="label-count">${counts.deleted}</span>
                    </div>
                </div>
                
                <!-- Message List Panel -->
                <div class="messages-list-panel">
                    <div class="messages-list-header">
                        <div class="messages-search-box">
                            <i class="fas fa-search"></i>
                            <input type="text" id="messagesSearchInput" placeholder="Search messages..." value="${messagesSearchQuery}" oninput="handleMessagesSearch(this.value)">
                        </div>
                        <div class="messages-list-actions">
                            <button title="Refresh" onclick="renderMessagesPage()"><i class="fas fa-sync-alt"></i></button>
                        </div>
                    </div>
                    
                    <div class="messages-list-scroll" id="messagesListContainer">
                        ${renderMessageList(filteredMessages)}
                    </div>
                </div>
                
                <!-- Message Detail Panel -->
                <div class="messages-detail-panel" id="messagesDetailPanel">
                    ${renderMessageDetail()}
                </div>
            </div>
        </section>
    `;
    
    // Restore selected message if it exists in filtered list
    if (selectedMessageId) {
        const stillExists = filteredMessages.find(m => m.id === selectedMessageId);
        if (stillExists) {
            selectMessage(selectedMessageId, false);
        } else {
            selectedMessageId = null;
        }
    }
    
    updateMessageBadge();
}

/**
 * Render message list
 */
function renderMessageList(msgs) {
    if (msgs.length === 0) {
        return `
            <div class="messages-empty-state">
                <i class="fas fa-inbox"></i>
                <h3>No customer messages yet</h3>
                <p>Messages from customers will appear here when they contact you.</p>
            </div>
        `;
    }
    
    return msgs.map(msg => renderMessagePreviewCard(msg)).join('');
}

/**
 * Render single message preview card
 */
function renderMessagePreviewCard(msg) {
    const initials = (msg.customerName || 'A').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    const typeClass = (msg.messageType || 'general-inquiry').toLowerCase().replace(/\s+/g, '-');
    const isUnread = msg.status === 'Unread';
    const isStarred = msg.starred;
    const isActive = msg.id === selectedMessageId;
    const timeAgo = formatRelativeTime(msg.timestamp);
    const snippet = (msg.messageContent || '').substring(0, 60).replace(/\n/g, ' ') + ((msg.messageContent || '').length > 60 ? '...' : '');
    
    return `
        <div class="message-preview-card ${isUnread ? 'unread' : ''} ${isActive ? 'active' : ''}" 
             data-id="${msg.id}" 
             onclick="selectMessage('${msg.id}')">
            <div class="message-preview-header">
                <div class="message-preview-avatar">${initials}</div>
                <div class="message-preview-meta">
                    <div class="message-preview-name">${msg.customerName || 'Anonymous'}</div>
                    <div class="message-preview-email">${msg.email || 'No email'}</div>
                </div>
                <div class="message-preview-time">${timeAgo}</div>
            </div>
            <div class="message-preview-subject">${msg.subject || 'No Subject'}</div>
            <div class="message-preview-snippet">${snippet}</div>
            <div class="message-preview-footer">
                <span class="message-preview-type ${typeClass}">${msg.messageType || 'General Inquiry'}</span>
                <button class="message-preview-star ${isStarred ? 'starred' : ''}" 
                        onclick="event.stopPropagation(); toggleStar('${msg.id}')" 
                        title="${isStarred ? 'Unstar' : 'Star'}">
                    <i class="${isStarred ? 'fas' : 'far'} fa-star"></i>
                </button>
            </div>
        </div>
    `;
}

/**
 * Render message detail panel
 */
function renderMessageDetail() {
    if (!selectedMessageId) {
        return `
            <div class="messages-detail-empty">
                <i class="fas fa-envelope-open-text"></i>
                <h3>Select a message</h3>
                <p>Click on a message from the list to view the full conversation.</p>
            </div>
        `;
    }
    
    const msgs = getMessages();
    const msg = msgs.find(m => m.id === selectedMessageId);
    if (!msg) {
        selectedMessageId = null;
        return `
            <div class="messages-detail-empty">
                <i class="fas fa-envelope-open-text"></i>
                <h3>Message not found</h3>
                <p>The selected message may have been deleted.</p>
            </div>
        `;
    }
    
    const initials = (msg.customerName || 'A').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    const typeClass = (msg.messageType || 'general-inquiry').toLowerCase().replace(/\s+/g, '-');
    const orderInfo = msg.relatedOrderId ? getOrderById(msg.relatedOrderId) : null;
    
    // Build conversation thread
    let conversationHtml = '';
    
    // Customer original message
    conversationHtml += `
        <div class="message-bubble message-bubble-customer">
            <div class="message-bubble-avatar">${initials}</div>
            <div class="message-bubble-content">
                <div class="message-bubble-header">
                    <strong>${msg.customerName || 'Customer'}</strong>
                    <span>${msg.date || ''} ${msg.time || ''}</span>
                </div>
                <div class="message-bubble-text">${escapeHtml(msg.messageContent || '')}</div>
            </div>
        </div>
    `;
    
    // Admin replies
    if (msg.adminReplyHistory && msg.adminReplyHistory.length > 0) {
        msg.adminReplyHistory.forEach(reply => {
            conversationHtml += `
                <div class="message-bubble message-bubble-admin">
                    <div class="message-bubble-avatar"><i class="fas fa-user-shield"></i></div>
                    <div class="message-bubble-content">
                        <div class="message-bubble-header">
                            <strong>Admin</strong>
                            <span>${reply.date || ''} ${reply.time || ''}</span>
                        </div>
                        <div class="message-bubble-text">${escapeHtml(reply.content || '')}</div>
                    </div>
                </div>
            `;
        });
    }
    
    // Order info if applicable
    let orderInfoHtml = '';
    if (orderInfo) {
        const productsText = (orderInfo.products || []).map(p => `${p.name} (x${p.quantity || 1})`).join(', ');
        orderInfoHtml = `
            <div class="message-order-info">
                <h4><i class="fas fa-shopping-bag"></i> Related Order Information</h4>
                <div class="message-order-info-grid">
                    <p><strong>Order ID:</strong> ${orderInfo.id || '-'}</p>
                    <p><strong>Customer:</strong> ${orderInfo.customerName || '-'}</p>
                    <p><strong>Products:</strong> ${productsText || '-'}</p>
                    <p><strong>Total:</strong> ₱${(orderInfo.totalPrice || 0).toLocaleString()}</p>
                    <p><strong>Payment Status:</strong> ${getPaymentStatusBadge(orderInfo.paymentStatus || 'Unpaid')}</p>
                    <p><strong>Order Status:</strong> ${getOrderStatusBadge(orderInfo.orderStatus || 'Pending')}</p>
                </div>
            </div>
        `;
    }
    
    // Show reply box only if not deleted
    const showReply = msg.status !== 'Deleted';
    
    return `
        <div class="messages-detail-toolbar">
            <div class="messages-detail-toolbar-left">
                <button title="${msg.status === 'Unread' ? 'Mark as Read' : 'Mark as Unread'}" onclick="toggleRead('${msg.id}')">
                    <i class="fas fa-${msg.status === 'Unread' ? 'envelope-open' : 'envelope'}"></i>
                </button>
                <button title="${msg.starred ? 'Unstar' : 'Star'}" class="warning" onclick="toggleStar('${msg.id}')">
                    <i class="${msg.starred ? 'fas' : 'far'} fa-star"></i>
                </button>
                <button title="Archive" onclick="archiveMessage('${msg.id}')">
                    <i class="fas fa-archive"></i>
                </button>
            </div>
            <div class="messages-detail-toolbar-right">
                <button title="Delete" class="danger" onclick="deleteMessage('${msg.id}')">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>
        
        <div class="messages-detail-scroll">
            <div class="message-thread-header">
                <div class="message-thread-subject">
                    ${msg.subject || 'No Subject'}
                    <span class="message-type-badge ${typeClass}">${msg.messageType || 'General Inquiry'}</span>
                </div>
                <div class="message-thread-customer">
                    <div class="message-thread-avatar">${initials}</div>
                    <div class="message-thread-customer-info">
                        <strong>${msg.customerName || 'Anonymous'}</strong>
                        <span>${msg.email || ''}${msg.phoneNumber ? ' · ' + msg.phoneNumber : ''}</span>
                    </div>
                    <div class="message-thread-date">${msg.date || ''} ${msg.time || ''}</div>
                </div>
            </div>
            
            ${orderInfoHtml}
            
            <div class="message-thread-conversation">
                ${conversationHtml}
            </div>
        </div>
        
        ${showReply ? `
        <div class="messages-reply-area">
            <div class="messages-reply-box">
                <textarea id="replyTextarea" placeholder="Type your reply to the customer..."></textarea>
                <div class="messages-reply-actions">
                    <button class="btn-reply-send" onclick="replyToMessage('${msg.id}')">
                        <i class="fas fa-paper-plane"></i> Send Reply
                    </button>
                </div>
            </div>
        </div>
        ` : ''}
    `;
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Select a message and show its detail
 */
window.selectMessage = function(messageId, shouldRender = true) {
    selectedMessageId = messageId;
    const msgs = getMessages();
    const msgIndex = msgs.findIndex(m => m.id === messageId);
    
    if (msgIndex !== -1 && msgs[msgIndex].status === 'Unread') {
        msgs[msgIndex].status = 'Read';
        saveMessages(msgs);
        updateMessageBadge();
    }
    
    if (shouldRender) {
        // Update active state in list
        document.querySelectorAll('.message-preview-card').forEach(card => {
            card.classList.toggle('active', card.dataset.id === messageId);
        });
        
        // Re-render detail panel
        const detailPanel = document.getElementById('messagesDetailPanel');
        if (detailPanel) {
            detailPanel.innerHTML = renderMessageDetail();
        }
        
        // Update list to reflect read status
        const listContainer = document.getElementById('messagesListContainer');
        if (listContainer) {
            const filtered = getFilteredMessages();
            listContainer.innerHTML = renderMessageList(filtered);
        }
    }
};

/**
 * Toggle star on a message
 */
window.toggleStar = function(messageId) {
    const msgs = getMessages();
    const msg = msgs.find(m => m.id === messageId);
    if (msg) {
        msg.starred = !msg.starred;
        saveMessages(msgs);
        renderMessagesPage();
        showAlert(msg.starred ? 'Message starred' : 'Message unstarred', 'success');
    }
};

/**
 * Toggle read/unread status
 */
window.toggleRead = function(messageId) {
    const msgs = getMessages();
    const msg = msgs.find(m => m.id === messageId);
    if (msg) {
        msg.status = msg.status === 'Unread' ? 'Read' : 'Unread';
        saveMessages(msgs);
        updateMessageBadge();
        renderMessagesPage();
        showAlert(msg.status === 'Unread' ? 'Marked as unread' : 'Marked as read', 'success');
    }
};

/**
 * Archive a message
 */
window.archiveMessage = function(messageId) {
    const msgs = getMessages();
    const msg = msgs.find(m => m.id === messageId);
    if (msg) {
        if (msg.status === 'Archived') {
            msg.status = 'Read';
            showAlert('Message restored to inbox', 'success');
        } else {
            msg.status = 'Archived';
            showAlert('Message archived', 'success');
        }
        saveMessages(msgs);
        selectedMessageId = null;
        renderMessagesPage();
    }
};

/**
 * Delete a message (soft delete)
 */
window.deleteMessage = function(messageId) {
    const msgs = getMessages();
    const msg = msgs.find(m => m.id === messageId);
    if (msg) {
        if (msg.status === 'Deleted') {
            // Permanent delete if already in deleted
            const confirmDelete = confirm('This message is already in Deleted. Do you want to permanently remove it?');
            if (confirmDelete) {
                const filtered = msgs.filter(m => m.id !== messageId);
                saveMessages(filtered);
                selectedMessageId = null;
                renderMessagesPage();
                showAlert('Message permanently deleted', 'success');
            }
        } else {
            msg.status = 'Deleted';
            saveMessages(msgs);
            selectedMessageId = null;
            renderMessagesPage();
            showAlert('Message moved to deleted', 'success');
        }
    }
};

/**
 * Reply to a message
 */
window.replyToMessage = function(messageId) {
    const textarea = document.getElementById('replyTextarea');
    if (!textarea) return;
    
    const replyText = textarea.value.trim();
    if (!replyText) {
        showAlert('Please type a reply before sending', 'error');
        return;
    }
    
    const msgs = getMessages();
    const msg = msgs.find(m => m.id === messageId);
    if (!msg) return;
    
    const now = new Date();
    const reply = {
        content: replyText,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
        timestamp: now.toISOString()
    };
    
    if (!msg.adminReplyHistory) {
        msg.adminReplyHistory = [];
    }
    
    msg.adminReplyHistory.push(reply);
    msg.status = 'Replied';
    saveMessages(msgs);
    
    textarea.value = '';
    renderMessagesPage();
    showAlert('Reply sent successfully', 'success');
};

/**
 * Set messages filter
 */
window.setMessagesFilter = function(filter) {
    currentMessagesFilter = filter;
    selectedMessageId = null;
    renderMessagesPage();
};

/**
 * Handle messages search input
 */
window.handleMessagesSearch = function(query) {
    messagesSearchQuery = query;
    const listContainer = document.getElementById('messagesListContainer');
    if (listContainer) {
        const filtered = getFilteredMessages();
        listContainer.innerHTML = renderMessageList(filtered);
    }
};

/**
 * Perform admin logout
 */
function performAdminLogout() {
    localStorage.removeItem('storeUsername');
    localStorage.removeItem('isAdmin');
    window.location.href = 'index.html';
}

// ====================
// Settings Management
// ====================

/**
 * Render Settings Page
 */
function renderSettingsPage() {
    elements.headerTitle.textContent = 'Settings';
    const settings = getSettings();
    const s = settings;

    elements.dashboardContent.innerHTML = `
        <section class="settings-section">
            <div class="settings-grid">
                <!-- 1. Admin Profile Settings -->
                <div class="settings-card">
                    <div class="settings-card-header">
                        <i class="fas fa-user-shield"></i>
                        <h3>Admin Profile</h3>
                    </div>
                    <div class="settings-form">
                        <div class="settings-image-upload">
                            <img id="profilePreview" src="${s.profile.profilePicture || ''}" 
                                 onerror="this.src='';this.style.display='none'" 
                                 class="settings-avatar-preview" alt="Profile" 
                                 style="${s.profile.profilePicture ? '' : 'display:none'}">
                            <div>
                                <input type="file" id="profilePicInput" accept="image/*" style="display:none" onchange="handleProfilePicUpload(event)">
                                <button type="button" class="btn-upload-image" onclick="document.getElementById('profilePicInput').click()">
                                    <i class="fas fa-camera"></i> Choose Photo
                                </button>
                            </div>
                        </div>
                        <div class="settings-form-row">
                            <div class="settings-form-group">
                                <label>Full Name</label>
                                <input type="text" id="profileFullName" value="${escapeHtml(s.profile.fullName)}">
                            </div>
                            <div class="settings-form-group">
                                <label>Username</label>
                                <input type="text" id="profileUsername" value="${escapeHtml(s.profile.username)}">
                            </div>
                        </div>
                        <div class="settings-form-row">
                            <div class="settings-form-group">
                                <label>Email Address</label>
                                <input type="email" id="profileEmail" value="${escapeHtml(s.profile.email)}">
                            </div>
                            <div class="settings-form-group">
                                <label>Contact Number</label>
                                <input type="tel" id="profileContact" value="${escapeHtml(s.profile.contactNumber)}">
                            </div>
                        </div>
                        <div class="settings-form-actions">
                            <button type="button" class="btn-settings-secondary" onclick="openChangePasswordModal()">
                                <i class="fas fa-key"></i> Change Password
                            </button>
                            <button type="button" class="btn-settings-save" onclick="saveProfileSettings()">
                                <i class="fas fa-save"></i> Save Changes
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 2. Store Information Settings -->
                <div class="settings-card">
                    <div class="settings-card-header">
                        <i class="fas fa-store"></i>
                        <h3>Store Information</h3>
                    </div>
                    <div class="settings-form">
                        <div class="settings-image-upload">
                            <img id="logoPreview" src="${s.store.storeLogo || ''}" 
                                 onerror="this.src='';this.style.display='none'" 
                                 class="settings-logo-preview" alt="Logo"
                                 style="${s.store.storeLogo ? '' : 'display:none'}">
                            <div>
                                <input type="file" id="storeLogoInput" accept="image/*" style="display:none" onchange="handleLogoUpload(event)">
                                <button type="button" class="btn-upload-image" onclick="document.getElementById('storeLogoInput').click()">
                                    <i class="fas fa-image"></i> Upload Logo
                                </button>
                            </div>
                        </div>
                        <div class="settings-form-row">
                            <div class="settings-form-group">
                                <label>Store Name</label>
                                <input type="text" id="storeName" value="${escapeHtml(s.store.storeName)}">
                            </div>
                            <div class="settings-form-group">
                                <label>Store Email</label>
                                <input type="email" id="storeEmail" value="${escapeHtml(s.store.storeEmail)}">
                            </div>
                        </div>
                        <div class="settings-form-row">
                            <div class="settings-form-group">
                                <label>Store Contact</label>
                                <input type="tel" id="storeContact" value="${escapeHtml(s.store.storeContact)}">
                            </div>
                            <div class="settings-form-group">
                                <label>Business Hours</label>
                                <input type="text" id="businessHours" value="${escapeHtml(s.store.businessHours)}">
                            </div>
                        </div>
                        <div class="settings-form-group">
                            <label>Store Address</label>
                            <textarea id="storeAddress" rows="2">${escapeHtml(s.store.storeAddress)}</textarea>
                        </div>
                        <div class="settings-form-actions">
                            <button type="button" class="btn-settings-save" onclick="saveStoreInfoSettings()">
                                <i class="fas fa-save"></i> Save Store Info
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 3. Payment Settings -->
                <div class="settings-card">
                    <div class="settings-card-header">
                        <i class="fas fa-credit-card"></i>
                        <h3>Payment Methods</h3>
                    </div>
                    <div class="settings-form">
                        <div class="payment-methods-grid">
                            <div class="payment-method-item">
                                <input type="checkbox" id="payCOD" ${s.payment.cashOnDelivery ? 'checked' : ''}>
                                <label for="payCOD">Cash on Delivery</label>
                            </div>
                            <div class="payment-method-item">
                                <input type="checkbox" id="payGCash" ${s.payment.gcash ? 'checked' : ''}>
                                <label for="payGCash">GCash</label>
                            </div>
                            <div class="payment-method-item">
                                <input type="checkbox" id="payMaya" ${s.payment.maya ? 'checked' : ''}>
                                <label for="payMaya">Maya</label>
                            </div>
                            <div class="payment-method-item">
                                <input type="checkbox" id="payBank" ${s.payment.bankTransfer ? 'checked' : ''}>
                                <label for="payBank">Bank Transfer</label>
                            </div>
                        </div>
                        <div class="payment-details">
                            <div class="settings-form-row">
                                <div class="settings-form-group">
                                    <label>GCash Number</label>
                                    <input type="text" id="gcashNumber" value="${escapeHtml(s.payment.gcashNumber)}">
                                </div>
                                <div class="settings-form-group">
                                    <label>Maya Number</label>
                                    <input type="text" id="mayaNumber" value="${escapeHtml(s.payment.mayaNumber)}">
                                </div>
                            </div>
                            <div class="settings-form-row">
                                <div class="settings-form-group">
                                    <label>Bank Account Name</label>
                                    <input type="text" id="bankAccountName" value="${escapeHtml(s.payment.bankAccountName)}">
                                </div>
                                <div class="settings-form-group">
                                    <label>Bank Account Number</label>
                                    <input type="text" id="bankAccountNumber" value="${escapeHtml(s.payment.bankAccountNumber)}">
                                </div>
                            </div>
                        </div>
                        <div class="settings-form-actions">
                            <button type="button" class="btn-settings-save" onclick="savePaymentSettings()">
                                <i class="fas fa-save"></i> Save Payment Settings
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 4. Delivery Settings -->
                <div class="settings-card">
                    <div class="settings-card-header">
                        <i class="fas fa-shipping-fast"></i>
                        <h3>Delivery Settings</h3>
                    </div>
                    <div class="settings-form">
                        <div class="settings-form-row">
                            <div class="settings-form-group">
                                <label>Standard Delivery Fee (₱)</label>
                                <input type="number" id="deliveryFee" value="${s.delivery.standardDeliveryFee}">
                            </div>
                            <div class="settings-form-group">
                                <label>Free Shipping Minimum (₱)</label>
                                <input type="number" id="freeShippingMin" value="${s.delivery.freeShippingMinimum}">
                            </div>
                        </div>
                        <div class="settings-form-group">
                            <label>Estimated Delivery Time</label>
                            <input type="text" id="deliveryTime" value="${escapeHtml(s.delivery.estimatedDeliveryTime)}">
                        </div>
                        <div class="settings-form-group">
                            <label>Delivery Areas Supported</label>
                            <textarea id="deliveryAreas" rows="2">${escapeHtml(s.delivery.deliveryAreas)}</textarea>
                        </div>
                        <div class="settings-form-actions">
                            <button type="button" class="btn-settings-save" onclick="saveDeliverySettings()">
                                <i class="fas fa-save"></i> Save Delivery Settings
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 5. Notification Settings -->
                <div class="settings-card">
                    <div class="settings-card-header">
                        <i class="fas fa-bell"></i>
                        <h3>Notifications</h3>
                    </div>
                    <div class="settings-form">
                        <div class="toggle-list">
                            <div class="toggle-item">
                                <div class="toggle-item-info">
                                    <i class="fas fa-shopping-bag"></i>
                                    <div>
                                        <div class="toggle-item-label">New Order Notifications</div>
                                        <div class="toggle-item-desc">Get alerted when a new order is placed</div>
                                    </div>
                                </div>
                                <div class="toggle-switch-wrap">
                                    <input type="checkbox" class="toggle-switch" id="notifNewOrder" ${s.notifications.newOrderNotifications ? 'checked' : ''}>
                                </div>
                            </div>
                            <div class="toggle-item">
                                <div class="toggle-item-info">
                                    <i class="fas fa-user-plus"></i>
                                    <div>
                                        <div class="toggle-item-label">New Customer Alerts</div>
                                        <div class="toggle-item-desc">Get notified when someone registers</div>
                                    </div>
                                </div>
                                <div class="toggle-switch-wrap">
                                    <input type="checkbox" class="toggle-switch" id="notifNewCustomer" ${s.notifications.newCustomerAlerts ? 'checked' : ''}>
                                </div>
                            </div>
                            <div class="toggle-item">
                                <div class="toggle-item-info">
                                    <i class="fas fa-chart-pie"></i>
                                    <div>
                                        <div class="toggle-item-label">Revenue Summary Reports</div>
                                        <div class="toggle-item-desc">Daily/weekly revenue digest</div>
                                    </div>
                                </div>
                                <div class="toggle-switch-wrap">
                                    <input type="checkbox" class="toggle-switch" id="notifRevenue" ${s.notifications.revenueReports ? 'checked' : ''}>
                                </div>
                            </div>
                            <div class="toggle-item">
                                <div class="toggle-item-info">
                                    <i class="fas fa-envelope"></i>
                                    <div>
                                        <div class="toggle-item-label">Customer Message Alerts</div>
                                        <div class="toggle-item-desc">Alert on new customer messages</div>
                                    </div>
                                </div>
                                <div class="toggle-switch-wrap">
                                    <input type="checkbox" class="toggle-switch" id="notifMessages" ${s.notifications.customerMessageAlerts ? 'checked' : ''}>
                                </div>
                            </div>
                            <div class="toggle-item">
                                <div class="toggle-item-info">
                                    <i class="fas fa-box"></i>
                                    <div>
                                        <div class="toggle-item-label">Low Stock Alerts</div>
                                        <div class="toggle-item-desc">Warn when inventory runs low</div>
                                    </div>
                                </div>
                                <div class="toggle-switch-wrap">
                                    <input type="checkbox" class="toggle-switch" id="notifLowStock" ${s.notifications.lowStockAlerts ? 'checked' : ''}>
                                </div>
                            </div>
                        </div>
                        <div class="settings-form-actions">
                            <button type="button" class="btn-settings-save" onclick="saveNotificationSettings()">
                                <i class="fas fa-save"></i> Save Notification Settings
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 6. Security Settings -->
                <div class="settings-card">
                    <div class="settings-card-header">
                        <i class="fas fa-lock"></i>
                        <h3>Security</h3>
                    </div>
                    <div class="settings-form">
                        <div class="settings-form-group">
                            <button type="button" class="btn-settings-secondary" onclick="openChangePasswordModal()">
                                <i class="fas fa-key"></i> Change Password
                            </button>
                        </div>
                        <div class="settings-form-group">
                            <label>Recent Login Activity</label>
                            <table class="login-activity-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Device</th>
                                        <th>IP Address</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>${new Date().toLocaleDateString()}</td>
                                        <td>Current Session</td>
                                        <td>127.0.0.1</td>
                                        <td><span class="login-status-success">Active</span></td>
                                    </tr>
                                    <tr>
                                        <td>${new Date(Date.now() - 86400000).toLocaleDateString()}</td>
                                        <td>Chrome / Windows</td>
                                        <td>192.168.1.1</td>
                                        <td><span class="login-status-success">Success</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="settings-form-actions">
                            <button type="button" class="btn-settings-secondary" onclick="logoutAllSessions()">
                                <i class="fas fa-sign-out-alt"></i> Logout All Sessions
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 7. System Preferences -->
                <div class="settings-card">
                    <div class="settings-card-header">
                        <i class="fas fa-sliders-h"></i>
                        <h3>System Preferences</h3>
                    </div>
                    <div class="settings-form">
                        <div class="settings-form-row">
                            <div class="settings-form-group">
                                <label>Currency Display</label>
                                <select id="prefCurrency">
                                    <option value="PHP" ${s.preferences.currency === 'PHP' ? 'selected' : ''}>PHP ₱ (Philippine Peso)</option>
                                </select>
                            </div>
                            <div class="settings-form-group">
                                <label>Date Format</label>
                                <select id="prefDateFormat">
                                    <option value="MM/DD/YYYY" ${s.preferences.dateFormat === 'MM/DD/YYYY' ? 'selected' : ''}>MM/DD/YYYY</option>
                                    <option value="DD/MM/YYYY" ${s.preferences.dateFormat === 'DD/MM/YYYY' ? 'selected' : ''}>DD/MM/YYYY</option>
                                    <option value="YYYY-MM-DD" ${s.preferences.dateFormat === 'YYYY-MM-DD' ? 'selected' : ''}>YYYY-MM-DD</option>
                                </select>
                            </div>
                        </div>
                        <div class="settings-form-row">
                            <div class="settings-form-group">
                                <label>Time Format</label>
                                <select id="prefTimeFormat">
                                    <option value="12h" ${s.preferences.timeFormat === '12h' ? 'selected' : ''}>12-Hour (AM/PM)</option>
                                    <option value="24h" ${s.preferences.timeFormat === '24h' ? 'selected' : ''}>24-Hour</option>
                                </select>
                            </div>
                            <div class="settings-form-group">
                                <label>Dashboard Default View</label>
                                <select id="prefDashboardView">
                                    <option value="dashboard" ${s.preferences.dashboardDefaultView === 'dashboard' ? 'selected' : ''}>Dashboard</option>
                                    <option value="orders" ${s.preferences.dashboardDefaultView === 'orders' ? 'selected' : ''}>Orders</option>
                                    <option value="products" ${s.preferences.dashboardDefaultView === 'products' ? 'selected' : ''}>Products</option>
                                </select>
                            </div>
                        </div>
                        <div class="toggle-item" style="margin-top:0.5rem;">
                            <div class="toggle-item-info">
                                <i class="fas fa-database"></i>
                                <div>
                                    <div class="toggle-item-label">Auto Backup Reminder</div>
                                    <div class="toggle-item-desc">Remind to backup data regularly</div>
                                </div>
                            </div>
                            <div class="toggle-switch-wrap">
                                <input type="checkbox" class="toggle-switch" id="prefAutoBackup" ${s.preferences.autoBackupReminder ? 'checked' : ''}>
                            </div>
                        </div>
                        <div class="settings-form-actions">
                            <button type="button" class="btn-settings-save" onclick="savePreferencesSettings()">
                                <i class="fas fa-save"></i> Save Preferences
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 8. Danger Zone -->
                <div class="danger-zone-card">
                    <div class="settings-card-header danger-header">
                        <i class="fas fa-exclamation-triangle"></i>
                        <h3>Danger Zone</h3>
                    </div>
                    <div class="danger-actions-grid">
                        <div class="danger-action-item">
                            <div class="danger-action-info">
                                <h4>Reset Store Data</h4>
                                <p>Clear all products and restore defaults</p>
                            </div>
                            <button class="btn-danger-action" onclick="confirmDangerAction('resetStore')">Reset</button>
                        </div>
                        <div class="danger-action-item">
                            <div class="danger-action-info">
                                <h4>Delete All Orders</h4>
                                <p>Permanently remove all order records</p>
                            </div>
                            <button class="btn-danger-action" onclick="confirmDangerAction('deleteOrders')">Delete</button>
                        </div>
                        <div class="danger-action-item">
                            <div class="danger-action-info">
                                <h4>Delete All Messages</h4>
                                <p>Remove all customer messages</p>
                            </div>
                            <button class="btn-danger-action" onclick="confirmDangerAction('deleteMessages')">Delete</button>
                        </div>
                        <div class="danger-action-item">
                            <div class="danger-action-info">
                                <h4>Reset Dashboard Statistics</h4>
                                <p>Clear revenue and order stats history</p>
                            </div>
                            <button class="btn-danger-action" onclick="confirmDangerAction('resetStats')">Reset</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

// ====================
// Settings Save Handlers
// ====================

window.saveProfileSettings = function() {
    const settings = getSettings();
    settings.profile.fullName = document.getElementById('profileFullName').value.trim();
    settings.profile.username = document.getElementById('profileUsername').value.trim();
    settings.profile.email = document.getElementById('profileEmail').value.trim();
    settings.profile.contactNumber = document.getElementById('profileContact').value.trim();
    saveSettings(settings);
    showAlert('Profile settings saved successfully!', 'success');
};

window.saveStoreInfoSettings = function() {
    const settings = getSettings();
    settings.store.storeName = document.getElementById('storeName').value.trim();
    settings.store.storeEmail = document.getElementById('storeEmail').value.trim();
    settings.store.storeContact = document.getElementById('storeContact').value.trim();
    settings.store.storeAddress = document.getElementById('storeAddress').value.trim();
    settings.store.businessHours = document.getElementById('businessHours').value.trim();
    saveSettings(settings);
    showAlert('Store information saved successfully!', 'success');
};

window.savePaymentSettings = function() {
    const settings = getSettings();
    settings.payment.cashOnDelivery = document.getElementById('payCOD').checked;
    settings.payment.gcash = document.getElementById('payGCash').checked;
    settings.payment.maya = document.getElementById('payMaya').checked;
    settings.payment.bankTransfer = document.getElementById('payBank').checked;
    settings.payment.gcashNumber = document.getElementById('gcashNumber').value.trim();
    settings.payment.mayaNumber = document.getElementById('mayaNumber').value.trim();
    settings.payment.bankAccountName = document.getElementById('bankAccountName').value.trim();
    settings.payment.bankAccountNumber = document.getElementById('bankAccountNumber').value.trim();
    saveSettings(settings);
    showAlert('Payment settings saved successfully!', 'success');
};

window.saveDeliverySettings = function() {
    const settings = getSettings();
    settings.delivery.standardDeliveryFee = parseFloat(document.getElementById('deliveryFee').value) || 0;
    settings.delivery.freeShippingMinimum = parseFloat(document.getElementById('freeShippingMin').value) || 0;
    settings.delivery.estimatedDeliveryTime = document.getElementById('deliveryTime').value.trim();
    settings.delivery.deliveryAreas = document.getElementById('deliveryAreas').value.trim();
    saveSettings(settings);
    showAlert('Delivery settings saved successfully!', 'success');
};

window.saveNotificationSettings = function() {
    const settings = getSettings();
    settings.notifications.newOrderNotifications = document.getElementById('notifNewOrder').checked;
    settings.notifications.newCustomerAlerts = document.getElementById('notifNewCustomer').checked;
    settings.notifications.revenueReports = document.getElementById('notifRevenue').checked;
    settings.notifications.customerMessageAlerts = document.getElementById('notifMessages').checked;
    settings.notifications.lowStockAlerts = document.getElementById('notifLowStock').checked;
    saveSettings(settings);
    showAlert('Notification settings saved successfully!', 'success');
};

window.savePreferencesSettings = function() {
    const settings = getSettings();
    settings.preferences.currency = document.getElementById('prefCurrency').value;
    settings.preferences.dateFormat = document.getElementById('prefDateFormat').value;
    settings.preferences.timeFormat = document.getElementById('prefTimeFormat').value;
    settings.preferences.dashboardDefaultView = document.getElementById('prefDashboardView').value;
    settings.preferences.autoBackupReminder = document.getElementById('prefAutoBackup').checked;
    saveSettings(settings);
    showAlert('System preferences saved successfully!', 'success');
};

// ====================
// Image Upload Handlers
// ====================

window.handleProfilePicUpload = function(event) {
    const file = event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
        showAlert('Please select a valid image file', 'error');
        return;
    }
    if (file.size > 2 * 1024 * 1024) {
        showAlert('Image must be less than 2MB', 'error');
        return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
        const base64 = e.target.result;
        const preview = document.getElementById('profilePreview');
        preview.src = base64;
        preview.style.display = 'block';
        const settings = getSettings();
        settings.profile.profilePicture = base64;
        saveSettings(settings);
    };
    reader.readAsDataURL(file);
};

window.handleLogoUpload = function(event) {
    const file = event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
        showAlert('Please select a valid image file', 'error');
        return;
    }
    if (file.size > 2 * 1024 * 1024) {
        showAlert('Image must be less than 2MB', 'error');
        return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
        const base64 = e.target.result;
        const preview = document.getElementById('logoPreview');
        preview.src = base64;
        preview.style.display = 'block';
        const settings = getSettings();
        settings.store.storeLogo = base64;
        saveSettings(settings);
    };
    reader.readAsDataURL(file);
};

// ====================
// Security Modals
// ====================

window.openChangePasswordModal = function() {
    const modal = document.createElement('div');
    modal.id = 'changePasswordModal';
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
        <div class="modal modal-small">
            <div class="modal-header">
                <h3>Change Password</h3>
                <button class="modal-close" onclick="closeChangePasswordModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-content">
                <div class="form-group">
                    <label>Current Password</label>
                    <input type="password" id="currentPassword" placeholder="Enter current password">
                </div>
                <div class="form-group">
                    <label>New Password</label>
                    <input type="password" id="newPassword" placeholder="Enter new password">
                </div>
                <div class="form-group">
                    <label>Confirm New Password</label>
                    <input type="password" id="confirmPassword" placeholder="Confirm new password">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn-cancel" onclick="closeChangePasswordModal()">Cancel</button>
                <button type="button" class="btn-save" onclick="executeChangePassword()">Update Password</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeChangePasswordModal();
    });
};

window.closeChangePasswordModal = function() {
    const modal = document.getElementById('changePasswordModal');
    if (modal) modal.remove();
};

window.executeChangePassword = function() {
    const current = document.getElementById('currentPassword').value;
    const newPass = document.getElementById('newPassword').value;
    const confirm = document.getElementById('confirmPassword').value;

    if (!current || !newPass || !confirm) {
        showAlert('Please fill in all password fields', 'error');
        return;
    }
    if (newPass !== confirm) {
        showAlert('New passwords do not match', 'error');
        return;
    }
    if (newPass.length < 6) {
        showAlert('Password must be at least 6 characters', 'error');
        return;
    }

    // In a real app, verify current password against stored hash
    // For now, we just simulate success
    showAlert('Password updated successfully!', 'success');
    closeChangePasswordModal();
};

window.logoutAllSessions = function() {
    const confirmLogout = confirm('Are you sure you want to log out all sessions? You will need to log in again.');
    if (confirmLogout) {
        localStorage.removeItem('storeUsername');
        localStorage.removeItem('isAdmin');
        window.location.href = 'index.html';
    }
};

// ====================
// Danger Zone Confirmation
// ====================

const DANGER_ACTIONS = {
    resetStore: {
        title: 'Reset Store Data',
        message: 'This will reset all products to default and cannot be undone.',
        confirmText: 'RESET',
        action: function() {
            localStorage.removeItem(STORAGE_KEY);
            loadProducts();
            showAlert('Store data has been reset to defaults', 'success');
        }
    },
    deleteOrders: {
        title: 'Delete All Orders',
        message: 'This will permanently delete all order records.',
        confirmText: 'DELETE',
        action: function() {
            localStorage.removeItem(ORDERS_STORAGE_KEY);
            showAlert('All orders have been deleted', 'success');
        }
    },
    deleteMessages: {
        title: 'Delete All Messages',
        message: 'This will permanently remove all customer messages.',
        confirmText: 'DELETE',
        action: function() {
            localStorage.removeItem(MESSAGES_STORAGE_KEY);
            updateMessageBadge();
            showAlert('All messages have been deleted', 'success');
        }
    },
    resetStats: {
        title: 'Reset Dashboard Statistics',
        message: 'This will clear all dashboard statistics history.',
        confirmText: 'RESET',
        action: function() {
            localStorage.removeItem(PREVIOUS_STATS_KEY);
            showAlert('Dashboard statistics have been reset', 'success');
        }
    }
};

window.confirmDangerAction = function(actionKey) {
    const action = DANGER_ACTIONS[actionKey];
    if (!action) return;

    const modal = document.createElement('div');
    modal.id = 'dangerConfirmModal';
    modal.className = 'modal-overlay active danger-modal';
    modal.innerHTML = `
        <div class="modal modal-small">
            <div class="modal-header">
                <h3><i class="fas fa-exclamation-triangle"></i> ${action.title}</h3>
                <button class="modal-close" onclick="closeDangerModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-content">
                <p>${action.message}</p>
                <p class="warning-text">This action is irreversible. Type <strong>${action.confirmText}</strong> below to confirm:</p>
                <input type="text" id="dangerConfirmInput" class="danger-confirm-input" placeholder="Type ${action.confirmText} here" autocomplete="off">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn-cancel" onclick="closeDangerModal()">Cancel</button>
                <button type="button" class="btn-delete" id="dangerExecuteBtn">${action.confirmText}</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const input = document.getElementById('dangerConfirmInput');
    const btn = document.getElementById('dangerExecuteBtn');
    btn.disabled = true;
    btn.style.opacity = '0.5';

    input.addEventListener('input', () => {
        const match = input.value.trim().toUpperCase() === action.confirmText;
        btn.disabled = !match;
        btn.style.opacity = match ? '1' : '0.5';
    });

    btn.onclick = () => {
        if (input.value.trim().toUpperCase() === action.confirmText) {
            action.action();
            closeDangerModal();
            if (currentPage === 'settings') {
                renderSettingsPage();
            }
        }
    };

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeDangerModal();
    });
};

window.closeDangerModal = function() {
    const modal = document.getElementById('dangerConfirmModal');
    if (modal) modal.remove();
};
