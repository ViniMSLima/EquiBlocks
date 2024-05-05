import axios from "axios"

export const apiTest = axios.create({
  baseURL: "https://equiblocks-server-2.vercel.app/test"
})