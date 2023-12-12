import pool from "../index.js";
import bcrypt from 'bcrypt';

const Reg = async (req, res) => {
      const client = await pool.connect();
      const { Name, Email, Username, Password } = req.body;
      const password= await bcrypt.hash(Password,10);

      const checkUser='SELECT * FROM aman1 WHERE USERNAME = $1';
      const checkResult=await client.query(checkUser,[Username]);

  if(checkResult.rows.length>0){
       res.status(201).json({ success:false ,message: 'user already exist'});
    }
  else{
       const query = 'INSERT INTO aman1(NAME, EMAIL, USERNAME, PASSWORD) VALUES($1, $2, $3, $4) RETURNING *';
       const values = [Name, Email, Username, password];

      try {
         const result = await client.query(query, values);
         res.status(200).json({success:true, message: 'registered'} );
      }
      catch (error) {
         console.error(error);
         res.status(500).json({success:false, error: 'Internal Server Error' });
      } 
      finally {
         client.release();
      }
    }
};

export default Reg;
