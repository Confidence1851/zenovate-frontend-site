"use server";
import axios from 'axios';

function baseUrl(path = '') {
    return process.env.NEXT_PUBLIC_SERVER_URL + path;
}

export async function productList() {
    const url = baseUrl("/form/products");
    try {
        const response = await axios.get(url);
        return response.data; // Adjust according to the API response structure
    } catch (error) {
        const errMessage = (error as Error).message;
        return {
            success: false,
            message: errMessage,
            data: null,
            url: url
        };
    }
}
