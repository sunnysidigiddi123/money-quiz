import axios from "axios";

export const refreshTokens = async (refreshToken) => {
  const TOKEN_URL = `${process.env.REACT_APP_BASE_URL}/users/refresh-token`;
  let sendData = {
    refreshToken,
  };
  const data = await axios.post(TOKEN_URL, sendData);
  sessionStorage.setItem("token","Bearer "+ data.data.token);
  //console.log(data);
  return data;
};
