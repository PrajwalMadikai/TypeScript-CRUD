let express=require('express')
let router=express.Router()
let userController=require('../controller/userController')

router.get('/',userController.logGet)

module.exports=router