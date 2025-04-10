const express= require("express");
const app= express();
const mongoose = require("mongoose");
const Listing =require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate"); //for styleing


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views")); 
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method")); 
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));// for using styling  

// for database created
let mongo_url="mongodb://127.0.0.1:27017/wanderlust";
main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
}) 
 async function main(){
    await mongoose.connect(mongo_url);
 }
// Index route
 app.get("/Listing",async(req,res)=>{
   let allisting = await Listing.find({});
   res.render("./listings/index.ejs",{allisting});

 })

 //create new route
app.get("/Listing/new",(req,res)=>{
    res.render("./listings/new.ejs");
})
app.post("/Listing",async (req,res)=>{
    // let {title,description,image,price,location,country}= req.body; // frist method 
    let Data = req.body.Listing;
    const newListing= new Listing(Data);
    await newListing.save();
    res.redirect("/Listing");
    //  console.log(newListing); 
}) 

// show route 
app.get("/Listing/:id",async(req,res)=>{
    let {id}=req.params;
    let listing = await Listing.findById(id); 
    // console.log(data);
    res.render("./listings/show.ejs",{listing});

});
//edit route
app.get("/Listing/:id/edit",async(req,res)=>{
    let { id }=req.params;
    const listing = await   Listing.findById(id); 
    res.render("./listings/edit.ejs",{ listing}); 
}) ;
// update route
app.put("/Listing/:id",async (req,res)=>{
    let { id }=req.params;
    // console.log(req.body);
     await Listing.findByIdAndUpdate(id, { ...req.body.Listing },{new:true , runValidators:true});// REQ.BODY.Listing m Listing object ki hai
    res.redirect(`/Listing/${id}`);//back to show redirect
})
//Delete route
app.delete("/Listing/:id",async (req,res)=>{
    let {id} =req.params;
   let deleteListing = await Listing.findByIdAndDelete(id);
   console.log(deleteListing );
    res.redirect("/Listing"); 
})


// app.get("/testListing",async(req,res)=>{ 
//            let sampleListing = new Listing({
//             title: "My New Villa",
//             description : "By the beach",
//             price : 1200,
//             location :" calangute,goa",
//             country : " India",
//            })
//            await sampleListing.save();
//            console.log("sample was saved"); 
//              res.send("Succesful testing");
 
// })
 
app.get("/",(req,res)=>{
    res.send("Hello Everyone");
})
app.listen(8080,()=>{
    console.log("server is listening to port 8080");
})
