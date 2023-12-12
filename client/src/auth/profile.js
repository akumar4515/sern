import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const [data, setData] = useState({});
  const uId = localStorage.getItem('userId');
  const history=useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/profile/${uId}`);

        if (response.data.status === 200) {
          setData(response.data.user);
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Call fetchData when the component mounts
    fetchData();
  }, [uId]);
  
  const handleEdit=()=>{
    history('/update');
  }
   
  

  return (
    <div>
      <h3>Profile</h3>
      <button type="button" onClick={handleEdit}>Edit</button>
      <p>Name:{data.name}</p>
      <p>Username:{data.username}</p>
      <p>Email:{data.email}</p>
      <p>{uId}</p>
    </div>
  );
};
