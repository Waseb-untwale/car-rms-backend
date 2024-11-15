const Products= require('../models/productModel')

//filter,sorting and pagination

class APIfeatures{
  constructor(query,queryString){
      this.query = query;
      this.queryString = queryString
  }
  filtering(){
    const queryObj = {...this.queryString} 
    console.log(queryObj)
    const excluededFields = ['page','sort','limit']
    excluededFields.forEach(el => delete(queryObj[el]))
    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
    this.query.find(JSON.parse(queryStr))

    return this
  }
  sorting(){
    if(this.queryString.sort){
      const sortBy = this.queryString.sort.split(',').join('')
      this.query = this.query.sort(sortBy)
  }else{
      this.query = this.query.sort('-createdAt')
  }

  return this

  }
  pagination(){
    const page= this.queryString.page*1 || 1;

    const limit = this.queryString.limit*1|| 9;

    const skip= (page-1)*limit
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}


const productCtrl={
  getProducts:async(req,res)=>{
    try{
      console.log(req.query)
      const features = new APIfeatures(Products.find(),req.query).filtering().sorting().pagination()
      const products = await features.query

      res.json({status:'success',
      result: products.length,
  products:products})
  }
    catch(err){
      return res.status(500).json({msg:err.message})
    }
  },
  createProducts:async(req,res)=>{
    try{
      const {product_id,title,price,description,content,images,category}= req.body;

      if(!images){
        return res.status(400).json({msg:"No image Upload"})
      }
      const product= await Products.findOne({product_id})
      if(product){
        return res.status(400).json({msg:"This Product is Already exist"})
      }

      const newProduct=  new Products({product_id,title,price,description,content,images,category})
      await newProduct.save()
      res.json({msg:"product created Successful"})

    }
    catch(err){
      return res.status(500).json({msg:err.message})
    }
  
  },
  deleteProducts:async(req,res)=>{
    try{
      await Products.findByIdAndDelete(req.params.id)
      res.json({msg:"Deleted a product"})
    }
    catch(err){
      return res.status(500).json({msg:err.message})
    }
  },
  updateProducts: async(req,res)=>{
    try{
      const {product_id,title,price,description,content,images,category}= req.body;
      let response=await Products.findOneAndUpdate({_id:req.params.id},{
        title:title.toLowerCase(),price,description,content,images,category
    })
    res.json(response)
    }
    catch(err){
      return res.status(500).json({msg:err.message})
    }
  },
  getProductById:async(req,res)=>{
    try {
      const productId = req.params.id;
      const product = await Products.findById(productId);  
      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      }
      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server er" });
    }
   }
}



module.exports= productCtrl