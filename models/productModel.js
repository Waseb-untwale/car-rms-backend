const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    product_id:{
        type:String,
        unique:true,
        trim:true,
        
    },
    title:{
        type:String,
        trim:true,
        
    },
    price:{
        type:Number,
        trim:true,
        
    },
    description:{
        type:String,
        
    },
    content:{
        type:String,
      
    },
    images:{
        type:Object,
       
    },
    category:{
        type:String,
       
    },
    checked:{
        type:Boolean,
        default:false
    },
    sold:{
        type:Number,
        default:0
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Products",productSchema)

