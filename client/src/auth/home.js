import React, { useEffect, useState } from "react";

export const Home = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Retrieve user data from local storage
    const storedUserId = localStorage.getItem('userId');
    if(storedUserId){

      setUserId(storedUserId);

    }

 
    
      
  
  }, []);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {userId ? (
        <div>
          <h2>User Information:</h2>
          <p>Id: {userId}</p>
          {/* Add more user information fields as needed */}
        </div>
      ) : (
        <p>Please log in to view this page.</p>
      )}
    </div>
  );
};
