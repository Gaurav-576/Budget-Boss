import axios from "axios"

const instance = axios.create({
  baseURL: 'https://localhost:4000',
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});

export default instance