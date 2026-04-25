// Shared storage key for both admin and store
const STORAGE_KEY = 'pc_store_products';

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

/**
 * Get products from localStorage
 * Falls back to default products if localStorage is empty
 */
export function getProducts() {
  const stored = localStorage.getItem(STORAGE_KEY);
  
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return Promise.resolve(parsed);
      }
    } catch (e) {
      console.error('Error parsing stored products:', e);
    }
  }
  
  // Initialize localStorage with default products
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
  return Promise.resolve(DEFAULT_PRODUCTS);
}

/**
 * Save products to localStorage
 * @param {Array} products - Array of product objects
 */
export function saveProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  return Promise.resolve({ success: true });
}

/**
 * Add a single product to localStorage
 * @param {Object} product - Product object to add
 */
export function addProduct(product) {
  const products = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  products.push(product);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  return Promise.resolve({ success: true });
}

/**
 * Update a product in localStorage
 * @param {number} id - Product ID to update
 * @param {Object} updatedData - New product data
 */
export function updateProduct(id, updatedData) {
  const products = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedData };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }
  return Promise.resolve({ success: true });
}

/**
 * Delete a product from localStorage
 * @param {number} id - Product ID to delete
 */
export function deleteProduct(id) {
  const products = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const filtered = products.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return Promise.resolve({ success: true });
}

// Shared storage key for orders (used by both store and admin)
const ORDERS_STORAGE_KEY = 'cyber_store_orders';

/**
 * Get all orders from localStorage
 * Returns array of order objects
 */
export function getOrders() {
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
 * Generate next order ID (ORD-1001, ORD-1002, etc.)
 */
function generateOrderId() {
  const orders = getOrders();
  if (orders.length === 0) {
    return 'ORD-1001';
  }
  
  // Find highest order number
  let highestNum = 1000;
  orders.forEach(order => {
    if (order.id && order.id.startsWith('ORD-')) {
      const num = parseInt(order.id.replace('ORD-', ''));
      if (num > highestNum) {
        highestNum = num;
      }
    }
  });
  
  return 'ORD-' + (highestNum + 1);
}

/**
 * Save a new order to localStorage
 * @param {Object} orderData - Order data from checkout
 * @returns {Promise} Resolves with { success: true, order: orderObject }
 */
export function saveOrder(orderData) {
  const orders = getOrders();
  
  // Create complete order object
  const order = {
    id: generateOrderId(),
    customerName: orderData.customerName || 'Guest',
    username: orderData.username || '',
    customerEmail: orderData.customerEmail || '',
    customerPhone: orderData.customerPhone || '',
    products: orderData.items || orderData.products || [],
    totalPrice: orderData.total || orderData.totalPrice || 0,
    paymentMethod: orderData.paymentMethod || 'Cash',
    shippingAddress: orderData.shippingAddress || orderData.address || '',
    orderDate: orderData.orderDate || new Date().toISOString().split('T')[0],
    orderTime: orderData.orderTime || new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    orderStatus: orderData.orderStatus || 'Pending',
    paymentStatus: orderData.paymentStatus || 'Unpaid',
    notes: orderData.notes || '',
    createdAt: new Date().toISOString()
  };
  
  orders.push(order);
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  
  console.log('Order saved:', order);
  return Promise.resolve({ success: true, order });
}

/**
 * Update an existing order (usually status update)
 * @param {string} orderId - Order ID to update
 * @param {Object} updateData - Data to update
 * @returns {Promise} Resolves with { success: boolean }
 */
export function updateOrder(orderId, updateData) {
  const orders = getOrders();
  const index = orders.findIndex(o => o.id === orderId);
  
  if (index !== -1) {
    orders[index] = { ...orders[index], ...updateData, updatedAt: new Date().toISOString() };
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    return Promise.resolve({ success: true });
  }
  
  return Promise.resolve({ success: false, error: 'Order not found' });
}

/**
 * Delete an order from localStorage
 * @param {string} orderId - Order ID to delete
 * @returns {Promise} Resolves with { success: boolean }
 */
export function deleteOrder(orderId) {
  const orders = getOrders();
  const filtered = orders.filter(o => o.id !== orderId);
  
  if (filtered.length < orders.length) {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(filtered));
    return Promise.resolve({ success: true });
  }
  
  return Promise.resolve({ success: false, error: 'Order not found' });
}
