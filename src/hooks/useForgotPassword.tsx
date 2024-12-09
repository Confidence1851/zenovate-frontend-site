import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { forgotPassword } from '@/server-actions/api.actions'
import type { ForgotPasswordResponse } from '@/types'

const useForgotPassword = () => {
	const router = useRouter()

	return useMutation<ForgotPasswordResponse, Error, { email: string }>({
		mutationFn: forgotPassword,
		onSuccess: (result) => {
			// const { message } = result
			// toast.success(message)
			router.push('/auth/login')
		},
		onError: (err) => {
			const errorMessage = err instanceof Error ? err.message : 'An error occured'
			console.error(errorMessage)
			toast.error(errorMessage)
		}
	})
}

export default useForgotPassword
