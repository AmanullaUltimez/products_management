import axios from "axios";

const BASE_URL = "https://lobster-app-ddwng.ondigitalocean.app/product";
const API_KEY = "Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH";

export const addProduct = async (productData) => {
    try {
        const response = await axios.post(`${BASE_URL}/add_new`, productData, {
        headers: {
            api_key: API_KEY
        }
    })
    return response.data;
    } catch (error) {
        console.log("error", error)
    }
}

export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/list`,{
        headers: {
            api_key: API_KEY
        }
    })
    return response.data      
    } catch (error) {
        console.log("error", error)
    }
}