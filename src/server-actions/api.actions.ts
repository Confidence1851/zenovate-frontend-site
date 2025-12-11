import axios, { AxiosError } from 'axios'
import type {
	ContactResponse,
	ContactInfoSent,
	RegisterUserResponse,
	RegisterUserInput,
	ForgotPasswordResponse
} from '@/types'

export function baseUrl(path = '') {
	return process.env.NEXT_PUBLIC_SERVER_URL + path
}

export async function productList() {
	const url = baseUrl('/form/products')
	try {
		const response = await axios.get(url)
		return response.data
	} catch (error) {
		if (axios.isAxiosError(error)) {
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

export async function orderSheetProducts() {
	const url = baseUrl('/form/products/order-sheet')
	try {
		const response = await axios.get(url)
		return response.data
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.data?.message) {
				throw new Error(error.response.data.message)
			} else {
				throw new Error((error as Error).message || 'Failed to fetch order sheet products')
			}
		} else {
			throw new Error('An unexpected error occurred')
		}
	}
}

export interface ValidateDiscountCodeResponse {
	success: boolean
	data?: {
		code: string
		type: 'percentage' | 'fixed'
		value: number
		discount_amount: number
	}
	message?: string
}

export async function validateDiscountCode(
	code: string,
	subtotal: number
): Promise<ValidateDiscountCodeResponse> {
	const url = baseUrl('/api/discount-codes/validate')
	try {
		const response = await axios.post(url, {
			code: code.trim().toUpperCase(),
			subtotal,
		})
		return response.data
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.data?.message) {
				throw new Error(error.response.data.message)
			} else {
				throw new Error((error as Error).message || 'Failed to validate discount code')
			}
		} else {
			throw new Error('An unexpected error occurred')
		}
	}
}

export async function productInfo(id: string) {
	const url = baseUrl('/form/products/' + id)
	try {
		const response = await axios.get(url)
		return response.data
	} catch (error) {
		if (axios.isAxiosError(error)) {
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
		return response.data
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

export async function contactUsApi(data: ContactInfoSent): Promise<ContactResponse> {
	const url = baseUrl('/website/contact-us')
	try {
		const response = await axios.post(url, data)
		return response.data
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log(error)
			if (error.response?.data?.message) {
				throw new Error(error.response.data.message)
			} else {
				throw new Error((error as Error).message || 'Failed to send your details')
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
		return response.data
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log(error)
			if (error.response?.data?.message) {
				throw new Error(error.response.data.message)
			} else {
				throw new Error(error.message || 'Failed to process request')
			}
		} else {
			throw new Error('An unexpected error occurred')
		}
	}
}

export async function resetPassword(data: { password: string; hash: string }): Promise<ForgotPasswordResponse> {
	const url = baseUrl('/auth/reset-password')

	try {
		const response = await axios.post(url, data)
		return response.data
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log(error)
			if (error.response?.data?.message) {
				throw new Error(error.response.data.message)
			} else {
				throw new Error(error.message || 'Failed to reset password')
			}
		} else {
			throw new Error('An unexpected error occurred')
		}
	}
}

export async function ordersList(token: string, query: { search: string; status: string; page: number }) {
	const url = baseUrl('/dashboard/orders')
	try {
		const response = await axios.get(url, {
			headers: {
				Authorization: `Bearer ${token}`
			},
			params: query
		})
		return response.data
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.data?.message) {
				throw new Error(error.response.data.message)
			} else {
				throw new Error(error.message || 'Failed to fetch orders')
			}
		} else {
			throw new Error('An unexpected error occurred')
		}
	}
}
export async function ordersListDetails(token: string, id: string) {
	const url = baseUrl(`/dashboard/orders/${id}`)
	try {
		const response = await axios.get(url, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		return response.data.data
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.data?.message) {
				throw new Error(error.response.data.message)
			} else {
				throw new Error(error.message || 'Failed to fetch order details')
			}
		} else {
			throw new Error('An unexpected error occurred')
		}
	}
}
