import axios from "axios"

export const apiEquiblocks = axios.create({
  baseURL: "https://vercel-deployment-test-server.vercel.app/api"
})