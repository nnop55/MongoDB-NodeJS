const express = require("express")
const router = express.Router()

const Product = require('../models/product.model')
const User = require('../models/user.model')

router.get('/', async (req, res) => {
    try{
        const products = await Product.find().populate("author")
        res.status(200).json({data:products})
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

router.post('/', async (req, res) => {
    try{
        const {title, author} = req.body;
        const newProduct = new Product({title, author});
        await newProduct.save()
        await User.findByIdAndUpdate(author, {$push: {products: newProduct.id}})
        res.status(201).json(newProduct)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

router.put('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const {title} = req.body
        const updated = await Product.findByIdAndUpdate(id, {$set:{title}}, { new: true })

        res.status(200).json(updated)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const product = await Product.findById(id)
        await User.findByIdAndUpdate(product.author, {
            $pull:{products: product.id}
        })
        await Product.deleteOne(product.id)
        res.status(200).json(product)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

module.exports = router