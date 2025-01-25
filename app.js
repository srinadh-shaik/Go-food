const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";
const ejsMate = require("ejs-mate");
//const expressLayouts = require("express-ejs-layouts");
const {ListingSchema} = require("./schema.js");
const wrapAsync = require("./utils/wrapAsync.js");

main().then(() =>{
    console.log("connected to db");
}).catch( err =>{
    console.log(err);
});
async function main(){
    await mongoose.connect(mongo_url);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
//app.set("layout","layouts/boilerplate");

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
//app.use(expressLayouts);
app.use(express.static(path.join(__dirname,"/public")));

app.get("/" , (req,res) =>{
    //setTimeout(() => res.send('First Response'), 1000);
    res.render("listings/home.ejs");
});

//index route
app.get("/listings",async (req,res)=>{
    const  allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
});

//new route
app.get("/listings/new" , (req,res)=>{
    res.render("listings/new.ejs");
});

//show route
app.get("/listings/:id",async (req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});

//create route 
app.post("/listings", wrapAsync(async (req,res)=>{
    let result = ListingSchema.validate(req.body);
    console.log(result);
    const heyListing = new Listing(req.body.listing);
    await heyListing.save();
    res.redirect("/listings");
}));

//update: Edit & Update route
app.get("/listings/:id/edit",async (req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});

//update route

app.put("/listings/:id", async (req,res) => {
let {id} = req.params;
await Listing.findByIdAndUpdate(id,{...req.body.listing});
res.redirect(`/listings/${id}`);
});

//DELETE
app.delete("/listings/:id",(async (req,res) =>{
let {id} = req.params;
 let deletedListing = await Listing.findByIdAndDelete(id);
 console.log("Id is deleted");
 res.redirect("/listings");
}));

app.all("*",(err,req,res,next)=>{
    next(new ExpressError(404,"Page not found"));
});

app.use((err,req,res,next)=>{
    console.log("error is here in express error");
    let {Statuscode,message} = err;
    res.status(Statuscode).send(message);
});

app.listen(8080,()=>{
    console.log("server is listening");
});
