const express=require('express');
const router=express.Router();
// import { Router } from 'express';//needs type:module in package.json
// const router=Router();

//LINE 1,2 ARE EQUIVALENT TO 3,4{

const validateToken = require('../middleware/validateTokenHandler'); 

const {getContacts,getContact,createContact,updateContact, deleteContact}=require('../controllers/contactController');

router.use(validateToken);
router.route('/').get(getContacts);
router.route('/:id').get(getContact);
router.route('/').post(createContact); 
router.route('/:id').put(updateContact); 
router.route('/:id').delete(deleteContact); 
   

module.exports=router;    


 