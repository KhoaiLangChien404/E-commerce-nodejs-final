import express from 'express'
<<<<<<< HEAD
import { addProduct, listProducts, removeProduct, singleProduct, productStats } from '../controllers/productController.js'
=======
import { addProduct, listProducts, removeProduct, singleProduct } from '../controllers/productController.js'
>>>>>>> cf2e1869b557e3969b924c5377464f77434d9c79
import upload from '../middleware/multer.js'
import adminAuth from '../middleware/adminAuth.js'

const productRouter = express.Router()

productRouter.post('/add',adminAuth, upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:4}]),addProduct)
productRouter.post('/remove',adminAuth, removeProduct)
productRouter.post('/single',singleProduct)
productRouter.get('/list',listProducts)
<<<<<<< HEAD
productRouter.get('/stats', adminAuth, productStats)
=======
>>>>>>> cf2e1869b557e3969b924c5377464f77434d9c79

export default productRouter 