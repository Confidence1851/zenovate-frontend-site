import axios, { AxiosError } from 'axios'

function baseUrl(path = '') {
	return process.env.NEXT_PUBLIC_SERVER_URL + path
}

export async function productList() {
	const url = baseUrl('/form/products')
	try {
		const response = await axios.get(url)
		return response.data // Adjust according to the API response structure
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log(error)
			if (error.response?.data?.message) {
				throw new Error(error.response.data.message)
			} else {
				throw new Error((error as Error).message || 'Failed to fetch products')
			}
		} else {
			throw new Error('An unexpected error occurred')
		}
	}
}

export async function registerUser(data: RegisterUserInput): Promise<RegisterUserResponse> {
	const url = baseUrl('/auth/register')
	try {
		const response = await axios.post(url, data)
		return response.data // Adjust according to the API response structure
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log(error)
			if (error.response?.data?.message) {
				throw new Error(error.response.data.message)
			} else {
				throw new Error((error as Error).message || 'Failed to sign you up')
			}
		} else {
			throw new Error('An unexpected error occurred')
		}
	}
}

export async function forgotPassword(data: { email: string }): Promise<ForgotPasswordResponse> {
	const url = baseUrl('/auth/forgot-password')

	try {
		const response = await axios.post(url, data)
		return response.data // Adjust according to the API response structure
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log(error)
			if (error.response?.data?.message) {
				throw new Error(error.response.data.message)
			} else {
				throw new Error(error.message || 'An error occurred')
			}
		} else {
			throw new Error('An unexpected error occurred')
		}
	}
}
