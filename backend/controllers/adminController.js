const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Admin = require('../models/adminModel')


// Generate JWT
const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '10d'
    })
}



// @desc    Login admin
// @route   POST /api/news/login
// @access  Public
const loginAdmin = asyncHandler(async(req,res) =>{
    const {email, password} = req.body

    //Check for admin email
    const admin = await Admin.findOne({email})

    if(admin && (await bcrypt.compare(password, admin.password))){
        res.json({
            _id: admin.id,
            name: admin.name,
            email: admin.email,
            token: generateToken(admin._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc    Register admin
// @route   POST /api/news/register
// @access  Public
// This function is commented because I will create only one admin's account.
// If you want create another, uncomment it and send request with data.
/*
const registerAdmin = asyncHandler(async(req,res) =>{
    const {name, email, password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //Chceck if admin exists
    const adminExist = await Admin.findOne({email})
    if(adminExist){
        res.status(400)
        throw new Error('Admin account was created')
    }

    //Hash password
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create admin
    const admin = await Admin.create({
        name,
        email,
        password: hashedPassword
    })
    if(admin){
        res.status(201).json({
            _id: admin.id,
            name: admin.name,
            email: admin.email
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
})
*/

// @desc    Get info about admin
// @route   GET /api/news/me
// @access  Private
const getInfoAboutMe = asyncHandler(async(req,res) =>{
    const {_id, name, email} = await Admin.findById(req.admin.id)
    res.json({
        id:_id,
        name,
        email
    }
    )
})
//If you want to add new admin, add to module.exports function registerAdmin
module.exports = {loginAdmin, getInfoAboutMe}