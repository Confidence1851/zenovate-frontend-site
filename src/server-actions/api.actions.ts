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

export async function registerUser(data: { [key: string]: string }) {
	const url = baseUrl('/auth/register')
	try {
		const response = await axios.post(url, data)
		return response.data // Adjust according to the API response structure
	} catch (error) {
		throw new Error((error as Error).message || 'Failed to sign you up')
	}
}
export async function forgotPassword(data: { [key: string]: string }) {
	const url = baseUrl('/auth/forgot-password')
	try {
		const response = await axios.post(url, data)
		return response.data // Adjust according to the API response structure
	} catch (error) {
		throw new Error((error as Error).message || 'An error occured')
	}
}
