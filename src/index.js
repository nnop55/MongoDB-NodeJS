const express = require("express")
const connectDb = require("./services/database")
const userRouter = require('./routers/user.router')
const productRouter = require('./routers/product.router')
const app = express()

app.use(express.json())

app.use('/api/users',userRouter)
app.use('/api/products',productRouter)

const PORT = process.env.port || 3000

connectDb()
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

