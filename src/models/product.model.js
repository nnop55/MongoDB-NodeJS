const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        title:{type:String, required:true},
        author:{type:mongoose.Schema.Types.ObjectId, ref:"Users", required:true}
    },
    {
        versionKey:false
    }
)

module.exports = mongoose.model('Products', productSchema)