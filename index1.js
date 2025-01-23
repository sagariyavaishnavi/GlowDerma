import express from "express";
const app = express();

// Middleware to handle JSON data
app.use(express.json());
const PORT = 5000;
let products = [];  

app.get("/", (req, res) => {
    const body = req.body;
    res.json({
        product: body.product
    });
});


app.post("/products", (req, res) => {
    const p = req.body;
    products.push(p);
    res.json({
        message: "Product added successfully",
        data: p
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});