import axios from "axios"

export const apiChallenge = axios.create({
  baseURL: "https://equiblocks-server-2.vercel.app/challenge"
})