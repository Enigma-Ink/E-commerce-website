const products = {
    computers: [
        { id: 1, name: "Gaming PC", price: 120000, image: "https://via.placeholder.com/150.png?text=Gaming+PC" },
        { id: 2, name: "Office PC", price: 60000, image: "https://via.placeholder.com/150.png?text=Office+PC" },
        { id: 3, name: "High-End Desktop", price: 200000, image: "https://via.placeholder.com/150.png?text=High-End+Desktop" },
        { id: 4, name: "Budget Desktop", price: 40000, image: "https://via.placeholder.com/150.png?text=Budget+Desktop" },
        { id: 5, name: "All-in-One PC", price: 80000, image: "https://via.placeholder.com/150.png?text=All-in-One+PC" },
        { id: 6, name: "Workstation", price: 150000, image: "https://via.placeholder.com/150.png?text=Workstation" },
        { id: 7, name: "Server PC", price: 250000, image: "https://via.placeholder.com/150.png?text=Server+PC" },
        { id: 8, name: "Mini PC", price: 30000, image: "https://via.placeholder.com/150.png?text=Mini+PC" },
        { id: 9, name: "Custom Build", price: 180000, image: "https://via.placeholder.com/150.png?text=Custom+Build" },
        { id: 10, name: "Gaming Tower", price: 130000, image: "https://via.placeholder.com/150.png?text=Gaming+Tower" }
    ],
    laptops: [
        { id: 11, name: "Gaming Laptop", price: 150000, image: "https://via.placeholder.com/150.png?text=Gaming+Laptop" },
        { id: 12, name: "Business Laptop", price: 80000, image: "https://via.placeholder.com/150.png?text=Business+Laptop" },
        { id: 13, name: "Ultrabook", price: 120000, image: "https://via.placeholder.com/150.png?text=Ultrabook" },
        { id: 14, name: "2-in-1 Laptop", price: 100000, image: "https://via.placeholder.com/150.png?text=2-in-1+Laptop" },
        { id: 15, name: "Laptop for Students", price: 50000, image: "https://via.placeholder.com/150.png?text=Laptop+for+Students" },
        { id: 16, name: "High-End Laptop", price: 200000, image: "https://via.placeholder.com/150.png?text=High-End+Laptop" },
        { id: 17, name: "Lightweight Laptop", price: 90000, image: "https://via.placeholder.com/150.png?text=Lightweight+Laptop" },
        { id: 18, name: "Business Ultrabook", price: 110000, image: "https://via.placeholder.com/150.png?text=Business+Ultrabook" },
        { id: 19, name: "Convertible Laptop", price: 95000, image: "https://via.placeholder.com/150.png?text=Convertible+Laptop" },
        { id: 20, name: "Gaming Portable", price: 160000, image: "https://via.placeholder.com/150.png?text=Gaming+Portable" }
    ],
    peripherals: [
        { id: 21, name: "Gaming Mouse", price: 2500, image: "https://via.placeholder.com/150.png?text=Gaming+Mouse" },
        { id: 22, name: "Mechanical Keyboard", price: 5000, image: "https://via.placeholder.com/150.png?text=Mechanical+Keyboard" },
        { id: 23, name: "Gaming Headset", price: 4000, image: "https://via.placeholder.com/150.png?text=Gaming+Headset" },
        { id: 24, name: "Webcam", price: 3000, image: "https://via.placeholder.com/150.png?text=Webcam" },
        { id: 25, name: "External Hard Drive", price: 6000, image: "https://via.placeholder.com/150.png?text=External+Hard+Drive" },
        { id: 26, name: "USB Hub", price: 1500, image: "https://via.placeholder.com/150.png?text=USB+Hub" },
        { id: 27, name: "Monitor Stand", price: 2000, image: "https://via.placeholder.com/150.png?text=Monitor+Stand" },
        { id: 28, name: "Desk Lamp", price: 1750, image: "https://via.placeholder.com/150.png?text=Desk+Lamp" },
        { id: 29, name: "Gaming Chair", price: 12500, image: "https://via.placeholder.com/150.png?text=Gaming+Chair" },
        { id: 30, name: "Mousepad", price: 750, image: "https://via.placeholder.com/150.png?text=Mousepad" }
    ]
};

let cart = {};

function showCategory(category) {
    const productsSection = document.getElementById('products');
    productsSection.innerHTML = '';

    products[category].forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₱${product.price.toLocaleString()}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productsSection.appendChild(productDiv);
    });

    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('onclick').includes(category)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function addToCart(productId) {
    if (cart[productId]) {
        cart[productId].quantity += 1;
    } else {
        const category = Object.keys(products).find(cat => products[cat].some(p => p.id === productId));
        const product = products[category].find(p => p.id === productId);

        cart[productId] = {
            ...product,
            quantity: 1
        };
    }
    updateCart();
}

function removeFromCart(productId) {
    if (cart[productId]) {
        if (cart[productId].quantity > 1) {
            cart[productId].quantity -= 1;
        } else {
            delete cart[productId];
        }
        updateCart();
    }
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    let total = 0;

    for (const [id, item] of Object.entries(cart)) {
        total += item.price * item.quantity;
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            ${item.name} (x${item.quantity}) - ₱${(item.price * item.quantity).toLocaleString()} 
            <button onclick="removeFromCart(${id})">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    }

    document.getElementById('cart-total').textContent = `Total: ₱${total.toLocaleString()}`;
}

document.getElementById('checkout-button').addEventListener('click', function() {
    if (cartIsEmpty()) {
        alert('Your cart is empty!');
        return;
    }

    if (confirm('Do you want to print your receipt?')) {
        generateReceipt();
    }
});

function cartIsEmpty() {
    return Object.keys(cart).length === 0;
}

function generateReceipt() {
    if (confirm('Do you want to download the receipt as a PDF?')) {
        generatePDFReceipt();
    } else {
        printReceipt();
    }
}

async function generatePDFReceipt() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFontSize(16);
    doc.text('Receipt', 20, 20);
    
    const date = new Date();
    doc.text(`Date: ${date.toLocaleDateString()}`, 20, 30);
    doc.text(`Time: ${date.toLocaleTimeString()}`, 20, 40);
    
    let y = 50;
    doc.setFontSize(14);
    doc.text('Items:', 20, y);
    y += 10;
    
    Object.values(cart).forEach(item => {
        doc.text(`${item.name} (x${item.quantity}) - ₱${(item.price * item.quantity).toLocaleString()}`, 20, y);
        y += 10;
    });
    
    doc.setFontSize(16);
    doc.text(`Total: ₱${calculateTotal().toLocaleString()}`, 20, y);
    
    doc.save('receipt.pdf');
}

function printReceipt() {
    const receiptWindow = window.open('', '', 'width=800,height=600');
    
    receiptWindow.document.open();
    receiptWindow.document.write(`
        <html>
        <head>
            <title>Receipt</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1 { color: #004d40; }
                .receipt { border: 1px solid #ddd; padding: 20px; border-radius: 10px; }
                .receipt h2, .receipt p { margin: 5px 0; }
                .receipt .total { font-weight: bold; font-size: 1.2em; }
            </style>
        </head>
        <body>
            <div class="receipt">
                <h1>Receipt</h1>
                <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                <p><strong>Time:</strong> ${new Date().toLocaleTimeString()}</p>
                <h2>Items:</h2>
                <ul>
                    ${Object.values(cart).map(item => `
                        <li>${item.name} (x${item.quantity}) - ₱${(item.price * item.quantity).toLocaleString()}</li>
                    `).join('')}
                </ul>
                <p class="total">Total: ₱${calculateTotal().toLocaleString()}</p>
            </div>
        </body>
        </html>
    `);
    receiptWindow.document.close();
    receiptWindow.focus();
    receiptWindow.print();
}

function calculateTotal() {
    return Object.values(cart).reduce((total, item) => total + (item.price * item.quantity), 0);
}

document.addEventListener('DOMContentLoaded', () => {
    showCategory('computers'); 

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.getAttribute('onclick').match(/'(.*?)'/)[1];
            showCategory(category);
        });
    });
});
