import { config } from "dotenv";

config()

export const PORT = process.env.PORT || 3000

export const DB_USER = process.env.DB_USER || 'root'
export const DB_PASSWORD = process.env.DB_PASSWORD || 'ivipetita24' 
export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_DATABASE = process.env.DB_DATABASE || 'resourcedb'
export const DB_PORT = process.env.DB_PORT || 3306

// clave db scarlet: Sigmund-Freud88
// clave db maria: Maria2000@1
// clave db Ivette: ivipetita24