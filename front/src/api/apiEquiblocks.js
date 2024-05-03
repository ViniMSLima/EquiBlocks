import axios from "axios"

export const apiEquiblocks = axios.create({
  baseURL: "http://localhost:8080/api"
})