import pool from "../index.js";
import bcrypt from 'bcrypt';

export const Login = async (req, res) => {
    const client = await pool.connect();
    const {Email,Password}=req.body;

    try{
        const query='SELECT * FROM aman1 WHERE EMAIL=$1';
        const data=await client.query(query,[Email]);
        if(data.rows.length>0){
            const userData=data.rows[0];
            const passCheck=await bcrypt.compare(Password,userData.password);
            if(passCheck){
                res.status(200).json({success:true , message:'logged in', userId:userData.id});
            }
            else{
                res.status(201).json({success:false , message:'invalid credentials'});
            }
        }
        else{
            res.status(201).json({success:false,message:'user not found'});
        }
    

    }
    catch(error){
        console.error(error);
        res.status(500).json({success:false , message:'internal server issue'});
    }
    finally{
        client.release();
    }

 

 
};
export default Login;

