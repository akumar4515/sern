// Other imports...
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Update = () => {
    const [updateData, setUpdateData] = useState({});
    const uId = localStorage.getItem('userId');
    const history = useNavigate();
  
    const handleChange = (e) => {
      setUpdateData({
        ...updateData,
        [e.target.name]: e.target.value,
      });
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/profile/${uId}`);
  
          if (response.data.status === 200) {
            setUpdateData(response.data.user);
          }
        } catch (error) {
          console.error(error);
        }
      };
  
      // Call fetchData when the component mounts
      fetchData();
    }, [uId]);
  
    const handleSave = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.put(`http://localhost:5000/update/${uId}`, updateData);
  
        if (response.data.status === 200) {
          setUpdateData(response.data.user);
          history('/profile');
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    // Check if updateData is undefined or null
    if (!updateData) {
      return null; // or loading indicator or anything appropriate
    }
  
    return (
      <form>
        <label>Name:</label>
        <input type="text" name="name" value={updateData.name || ''} onChange={handleChange} />
        <label>Username:</label>
        <input type="text" name="username" value={updateData.username || ''} onChange={handleChange} />
        <label>Email:</label>
        <input type="text" name="email" value={updateData.email || ''} onChange={handleChange} />
        <button type="button" onClick={handleSave}>
          Save
        </button>
      </form>
    );
  };
  