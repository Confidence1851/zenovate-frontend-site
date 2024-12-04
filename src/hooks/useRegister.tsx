import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { registerUser } from '@/server-actions/api.actions'

const useRegisterUser = (reset: () => void) => {
	const router = useRouter()

	return useMutation<RegisterUserResponse, Error, RegisterUserInput>({
		mutationFn: registerUser,
		onSuccess: (result) => {
			const { message } = result
			toast.success(message)
			reset()
			router.push('/auth/login')
		},
		onError: (err) => {
			const errorMessage = err instanceof Error ? err.message : 'Registration failed'
			console.error(errorMessage)
			toast.error(errorMessage)
		}
	})
}

export default useRegisterUser
