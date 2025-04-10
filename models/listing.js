const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
      title: {
        type: String,
        reuired : true,
      },
      description :{
        type : String,
      },
      image: {
        type: String,
        set:(v)=>v===" "?"https://unsplash.com/photos/the-sun-is-setting-over-the-ocean-with-a-sailboat-in-the-distance-kTZHJT7OO-I":v,
        default : "https://unsplash.com/photos/the-sun-is-setting-over-the-ocean-with-a-sailboat-in-the-distance-kTZHJT7OO-I",
      },
      price: {
        type: Number,
      },
      location: {
        type: String,
      },
      country: {
        type: String,
      },

});
const Listing = mongoose.model("Listing",listingSchema);
module.exports= Listing; 