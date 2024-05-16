const mongoose = require("mongoose")

const UniHrSchema = new mongoose.Schema (
    {
        Univercity : {
            UniName : {
                type : String,
            },
            PositionName : {
                type : String,
                default : "VC"
            },
            Email : {
                type : String ,

            },
            Password : {
                type : String , 

            },
          
        },
        Department: {
            DipName : {
                type : String,
            },
            PositionName : {
                type : String,
                default : "DH"
            },
            Email : {
                type : String ,

            },
            Password : {
                type : String , 

            },

            
        },
        Facalty : {
            FacaltyName : {
                type : String,
            },
            PositionName : {
                type : String,
                default : "FH"
            },
            Email : {
                type : String ,

            },
            Password : {
                type : String , 

            },
        }

    }
);

const UniHRInfo = mongoose.model("UniHRInfo" , UniHrSchema);

module.exports = UniHRInfo;