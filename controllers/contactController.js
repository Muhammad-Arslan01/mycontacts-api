const asyncHandler=require('express-async-handler');
const Contact =require('../models/contactModel');
//@desc Get All contacts
//@route GET api/contacts
//@access private// authorization

const getContacts=asyncHandler(async (req,res)=>{
    const contacts=await Contact.find({user_id:req.user.id});
    res.status(290).json(contacts);
});

//@desc Get contact
//@route GET api/contacts/:id
//@access private// authorization

const getContact=asyncHandler( async (req,res)=>{
    const contact=await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error('Contact not found');
    }

    if(contact.user_id.toString()!==req.user.id){
        res.status(404);
        throw new Error(`user is not allowed to view other users contacts' `);
    }
    
    res.status(291).json(contact);
});

//@desc Create new contact
//@route POST api/contacts
//@access private//authorization

const createContact=asyncHandler(async (req,res)=>{
//    console.log("The request body is:",req.body);
//    console.log("The request body is:",req.user.id);    
    
    const {name,email,phone}=req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact=await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    });
    res.status(292).json(contact);
});

//@desc Upate contact
//@route PUT api/contacts/:id
//@access private// authorization

const updateContact=asyncHandler(async (req,res)=>{
    const contact=await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error('Contact not found');
    }

    if(contact.user_id.toString()!==req.user.id){
        res.status(404);
        throw new Error(`user is not allowed to update other users contacts' `);
    }
    const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(293).json(updatedContact);
});

//@desc Delete contact
//@route DElETE api/contacts/:id
//@access private //authorization

const deleteContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error('Contact not found');
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(404);
        throw new Error(`user is not allowed to update other users contacts' `);
    }
    await Contact.deleteOne({_id: contact._id});//or also req.params.id inplace of contact._id
    res.status(294).json(contact);
});


module.exports={getContacts,getContact,createContact,updateContact,deleteContact};