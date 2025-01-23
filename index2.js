import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON bodies

// Welcome Route
app.get("/", (req, res) => {
  res.send("Welcome to GlowDerma - Your Skincare Journey Begins Here.");
});

// About Route

app.get("/about", (req, res) => {
  res.send(
    "<h3>We are a premium skincare brand committed to bringing you dermatologist-approved, clean beauty products.</h3>"
  );
});

// Contact Route
app.get("/contact", (req, res) => {
  res.json({
    email: "care@glowderma.com",
    instagram: "http://instagram.com/glowderma",
    consultation: "http://glowderma.com/book-appointment",
  });
});

// Products Array
const products = [
  { id: 11, name: "Retinol Serum", price: 1200, availableQty: 50 },
  { id: 12, name: "Niacinamide Solution", price: 800, availableQty: 30 },
  { id: 14, name: "Peptide Moisturizer", price: 1500, availableQty: 100 },
  { id: 15, name: "Glycolic Acid Toner", price: 900, availableQty: 20 },
];

// Orders Array
const orders = [
  { id: 1, product: "Anti-Aging Serum", quantity: 2 },
  { id: 2, product: "Vitamin C Moisturizer", quantity: 1 },
  { id: 3, product: "Hyaluronic Acid", quantity: 3 },
];

// Shopping Cart
let shoppingCart = [];

// /products Route with filtering
app.get("/products", (req, res) => {
  const { name, maxPrice } = req.query;

  let filteredProducts = products;

  if (name) {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter(
      (p) => p.price <= parseInt(maxPrice)
    );
  }

  res.json(filteredProducts);
});

// /orders/:orderID Route
app.get("/orders/:orderID", (req, res) => {
  const orderID = parseInt(req.params.orderID);
  const order = orders.find((o) => o.id === orderID);

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).json({ error: "Order Not Found" });
  }
});

// /cart Route
app.get("/cart", (req, res) => {
  res.json(shoppingCart);
});

app.post("/cart", (req, res) => {
  const { id, name, price, qty } = req.body;

  if (!id || !name || !price || !qty) {
    return res.status(400).json({ error: "All fields are required" });
  }

  shoppingCart.push({ id, name, price, qty });
  res.status(201).json(shoppingCart );
});

// /product/:pid Route
app.get("/product/:pid", (req, res) => {
  const pid = parseInt(req.params.pid);
  const product = products.find((p) => p.id === pid);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

// Wildcard Route: Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});