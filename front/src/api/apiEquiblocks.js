import axios from "axios"

export const apiEquiblocks = axios.create({
  baseURL: "https://equiblocks-server-2.vercel.app/api"
})