import mongoose from  'mongoose';

//custom datatype
type ConnectionObject = {
    //optional hai ayegi ya nhi ye value, lekin agar ayegi toh number format m hi ayegi
    isConnected?: number
}

const connection: ConnectionObject = {}

//what will this function return, a Promise. void is used because we don't care kis tarah ka data aye
async function dbConnect(): Promise<void> {
    //checking if there is already a connection
    if(connection.isConnected){
        console.log("Already connected to database");
        return;
    }
    try{
        const db = await mongoose.connect(process.env.MONGODB_URI || '');
        // console.log(db);
        
        //ready state h..apne aap m ek number hota hai
        connection.isConnected = db.connections[0].readyState
        console.log("DB connected successfully");
        
    }catch(err){

        console.log("DB Connection failed", err);
        
        //Agar connection bana hi nhi...to process ko gracefully exit krdo
        process.exit(1);
    }
}

export default dbConnect;