const express = require("express")
const router = express.Router()

const User = require('../models/user.model')

router.get('/', async (req, res) => {
    try{
        const users = await User.find()
        res.status(200).json({data:users})
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

router.post('/', async (req, res) => {
    try{
        const {name, email} = req.body;
        const newUser = new User({name,email});
        await newUser.save()
        res.status(201).json(newUser)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

router.put('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const {email, name} = req.body
        const updated = await User.findByIdAndUpdate(id, {$set:{email, name}}, { new: true })

        res.status(200).json(updated)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

router.get('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const user = await User.findById(id)

        res.status(200).json(user)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

module.exports = router