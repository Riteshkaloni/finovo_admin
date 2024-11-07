import axios from 'axios';
import React, { useState } from 'react'
import { BaseUrl } from './baseUrl';

const Invitation = () => {
const [email, setEmail]=useState("");
const [role, setRole]= useState([]);


const setToken = (token) => {
  if (token) {
    localStorage.setItem('authToken', token);
  } else {
    console.error("No token provided");
  }
};

const getToken = () => {
  return localStorage.getItem('authToken');
};

// Clear Token Function



// Example usage of getToken
const token = getToken();
console.log(token,'----TOKEN----');


// const Invitation= async(e)=>{
// e.preventDefault();
// try{
// const response= await axios.post(`${BaseUrl/}`)
// }

// }

  return (
    <div>
<h1>ritesh</h1>
    </div>
  )
}

export default Invitation

