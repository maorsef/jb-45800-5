import axios from "axios";
import type Product from "../models/Product";
import type ProductDraft from "../models/ProductDraft";

export async function getPerCategory(categoryId: string): Promise<Product[]> {
    const { data } = await axios.get<Product[]>(`${import.meta.env.VITE_REST_SERVER_URL}/products/category/${categoryId}`)
    return data
}

export async function newProduct(draft: ProductDraft): Promise<Product> {
    const { data } = await axios.post<Product>(`${import.meta.env.VITE_REST_SERVER_URL}/products/`, draft)
    return data
}

export async function deleteProduct(productId: String): Promise<void> {
    await axios.delete(`${import.meta.env.VITE_REST_SERVER_URL}/products/${productId}`)
}