const express=require('express')
const app=express()
const path = require('path');
const fs=require('fs')
const usermodel=require('./models/user.js')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'public')))

app.get('/',function (req,res) {
    res.render('index')
    
})

app.get('/read',async (req,res) =>{
    let users=await usermodel.find()
    console.log("Fetched Users:", users);
    res.render('read',{users})
    
})

app.post('/update/:userid',async (req,res) =>{
let {name,email,image} = req.body

  let user=await usermodel.findOneAndUpdate({_id:req.params.userid},{name,email,image},{new:true})
  res.redirect('/read')
  
})

app.get('/edit/:userid',async (req,res) =>{
  let user=await usermodel.findOne({_id:req.params.userid})
  res.render("edit",{user})
  
})


app.get('/delete/:id',async (req,res) =>{
    let users=await usermodel.findOneAndDelete({_id:req.params.id})
   
    res.redirect('/read')
    
})
app.post('/create', async (req,res)=> {
  let {name,email,image} = req.body

 let createduser= await usermodel.create({
    name,
    email,
    image
  })
  res.redirect('/read')
    
})

app.listen(3000)