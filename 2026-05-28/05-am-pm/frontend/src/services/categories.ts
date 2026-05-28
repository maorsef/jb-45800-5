import axios from "axios";
import type Category from "../models/Category";

export async function getAllCategories(): Promise<Category[]> {
    const { data } = await axios.get<Category[]>(`${import.meta.env.VITE_REST_SERVER_URL}/categories`)
    return data
}