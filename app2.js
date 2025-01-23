import express from "express";
import fs from "fs";
import { rateLimit } from "express-rate-limit";

const app = express();
const PORT = process.env.PORT || 4000;

const limiter = rateLimit({
    windowMs: 1000 * 60 * 5,
    max: 5,
    message: "Sorry, you have exhausted your plan",
});

const productLimiter = rateLimit({
    windowMs: 1000 * 60 * 5,
    max: 4,
    message: "Sorry, you have exhausted your plan",
});

app.use(limiter);
app.use("/cart", productLimiter);
app.use("/product", productLimiter);
app.use("/tools", express.static("work"));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the GlowDerma API!");
});

app.get("/cart", (req, res) => {
    res.send("Cart endpoint accessed!");
});

app.get("/product", (req, res) => {
    res.send("Product endpoint accessed!");
});

app.get("/tools", (req, res) => {
    res.send("You can access static tools from this endpoint!");
});

app.use((req, res) => {
    res.status(404).send("We don't have this page yet!");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Sorry! Something went wrong.");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});