export const GET_CONFIG = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  
  export const POST_CONFIG = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };