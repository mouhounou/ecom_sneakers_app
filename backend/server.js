require("dotenv").config()
const express = require("express")
const toConnect = require("./config/db")
const productRouter = require("./routes/product")
const authRouter = require("./routes/auth")
const usertRouter = require("./routes/user")
const orderRouter = require("./routes/order")
const cartRouter = require("./routes/cart")
const app = express()
const port = process.env.PORT || 4005


toConnect()


app.use(express.json())


app.use("/api/product", productRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", usertRouter);
app.use("/api/orders", orderRouter);
app.use("/api/cart", cartRouter);

app.listen(port, () => {
   console.log('====================================');
   console.log(`Serveur actif sur http://localhost:${port}`);
   console.log('====================================');
})