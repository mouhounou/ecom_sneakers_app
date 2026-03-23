require("dotenv").config()
const express = require("express")
const toConnect = require("./config/db")
const productRouter = require("./routes/product")
const app = express()
const port = process.env.PORT || 4005


toConnect()


app.use(express.json())

app.use('/api/product', productRouter)

app.listen(port, () => {
   console.log('====================================');
   console.log(`Serveur actif sur http://localhost:${port}`);
   console.log('====================================');
})