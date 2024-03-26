const mongoose=require("mongoose");

const BlackListSchema=mongoose.Schema({
        token: {type:String}
},
{
    versionKey:false
})
const BlackListModel=mongoose.model("Blacklist",BlackListSchema);

module.exports={
    BlackListModel
}