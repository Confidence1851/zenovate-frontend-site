import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { contactUsApi } from '@/server-actions/api.actions'
import type { ContactResponse, ContactInfoSent } from '@/types'


const useContactUs = (reset: () => void) => {
	return useMutation<ContactResponse, Error, ContactInfoSent>({
		mutationFn: contactUsApi,
		onSuccess: (result) => {
			const { message } = result
			toast.success(message)
			reset()
		},
		onError: (err) => {
			const errorMessage = err instanceof Error ? err.message : 'Could not send your message'
			console.error(errorMessage)
			toast.error(errorMessage)
		}
	})
}

export default useContactUs
