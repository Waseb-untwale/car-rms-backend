const router= require('express').Router()
const productCtrl= require('../controllers/productCtrl')
router.get('/products',productCtrl.getProducts)
router.post('/products',productCtrl.createProducts)
router.delete('/products/:id',productCtrl.deleteProducts)
router.put('/products/:id',productCtrl.updateProducts)
router.get('/products/:id',productCtrl.getProductById)

module.exports= router