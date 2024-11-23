import axios from 'axios'

function baseUrl(path = '') {
	return process.env.NEXT_PUBLIC_SERVER_URL + path
}

export async function productList() {
	const url = baseUrl('/form/products')
	try {
		const response = await axios.get(url)
		return response.data // Adjust according to the API response structure
	} catch (error) {
		throw new Error((error as Error).message || 'Failed to fetch products')
	}
}
