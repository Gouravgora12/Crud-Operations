const express = require('express');
const userControllers= require('../controllers/user')
const authcheck=require('../middleware/auth-check')
const router = express.Router()

router.post('',userControllers.createUser);
router.get('',userControllers.getAllUsers)
router.post('/login',userControllers.userLogin)
router.get('/:userId',userControllers.getSingleUser);
router.put('/:userId',authcheck,userControllers.updatePersonDetail)
router.delete('/:userId',authcheck,userControllers.deleteUser);
module.exports=router