// authService.js
// import {
//   signInWithPopup,
//   signInWithRedirect,
//   getRedirectResult,
//   signOut,
//   onAuthStateChanged,
// } from "firebase/auth";
// import { doc, setDoc, getDoc } from "firebase/firestore";

import axios from "axios";
// const BASE_URL = "https://backend.srilaxmialankar.com";
const BASE_URL = "https://backend.srilaxmialankar.com";

export const validateUserJWTToken = async (token) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/google-signin`, {
      idToken: token,
    });

    console.log("User data after google auth: ", res);
    return res.data.user; // returning the user object
  } catch (error) {
    console.error(
      "Token validation failed:",
      error.response?.data || error.message
    );
    return null;
  }
};
