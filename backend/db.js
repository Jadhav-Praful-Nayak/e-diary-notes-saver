const mongoose=require('mongoose');

const mongoURI ='mongodb://localhost:27017/newOne?directConnection=true'

const connectToMongo=()=>{
   mongoose.connect(mongoURI)
   const con=mongoose.connection;
   con.once('open',()=>{
    console.log("connected to db successfully")
   })
   

}

module.exports=connectToMongo