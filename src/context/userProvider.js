"use client"
import React, {useEffect, useState} from 'react'
import UserContext from './userContext';

const UserProvider = ({children}) => {
    const [user, setUser] = useState({});

    try{
        useEffect(() => {
            const res = async () => {
              const result = await fetch("/api/current");
              // console.log(result)
              const data = await result.json();
              console.log("data", data);
              setUser(data);
              console.log("user", user);
            };
            res();
        }, []);
        // const result = await fetch("/api/authentication", {
        //   method: "POST",
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" },
        // });
        

    }catch(err){
        console.log(err);
    }
  return (
    <UserContext.Provider value={{user,setUser}}>{children}</UserContext.Provider>
  )
}

export default UserProvider;