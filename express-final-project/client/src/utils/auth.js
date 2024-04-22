// auth.js

// Function to check if the JWT token has expired
export const isTokenExpired = (token) => {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp < Date.now() / 1000;
  };
  

  