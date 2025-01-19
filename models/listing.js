const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image: {
        type: String,
        default: "https://unsplash.com/photos/three-grapefruits-cut-in-half-on-a-multi-colored-background-XtaXprB2f4A",
        set: (v) => v || "https://unsplash.com/photos/three-grapefruits-cut-in-half-on-a-multi-colored-background-XtaXprB2f4A"
    },
    price: {
        type: Number,
        default: 0, // Set default value
    },
    location:String,
    country:String,
});

const listing = mongoose.model("listing" , listingSchema);
module.exports = listing;
