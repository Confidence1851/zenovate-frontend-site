import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { resetPassword } from '@/server-actions/api.actions'
import type { ForgotPasswordResponse } from '@/types'

const useResetPassword = () => {
	const router = useRouter()

	return useMutation<ForgotPasswordResponse, Error, { password: string  , hash: string }>({
		mutationFn: resetPassword,
		onSuccess: (result) => {
			const { message } = result
			toast.success(message)
			router.push('/auth/login')
		},
		onError: (err) => {
			const errorMessage = err instanceof Error ? err.message : 'Failed to reset password'
			console.error(errorMessage)
			toast.error(errorMessage)
		}
	})
}

export default useResetPassword
