const mongoose = require("mongoose");

const ContactUsSchema = new mongoose.Schema( {
    FirstName : {
        type : String , 

    },
    LastName : {
        type : String ,
    },
    Email :  {
        type: String ,
    },
    Phone : {
        type : String ,
    },
    Message : {
        type : String
    }


} , {timestamps : true});

const ContactUs = mongoose.model("ContactUs" , ContactUsSchema);

module.exports = ContactUs;