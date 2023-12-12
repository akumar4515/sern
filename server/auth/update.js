import pool from "../index.js";


const Update=async(req,res)=>{
    const client=await pool.connect();
    const {name,username,email}=req.body;
    const { id }=req.params;
    try{
        
    const q='UPDATE aman1 SET NAME=$1, USERNAME=$2, EMAIL=$3 WHERE ID=$4';
    const value=[name,username,email,id];

    const query=client.query(q,value);
    if(query){
        res.status(200).json({status:200});

    }
    else{
        res.status(201).json({status:201, message:'cant update'});
    }
   

    }
    catch(err){
        res.status(500).json({status:500, message:'internal error'});
    }




};
export default Update;