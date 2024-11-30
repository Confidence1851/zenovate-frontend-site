interface Product {
	name: string
	description: string
	subtitle: string
	price: number
}

type RegisterResponse = {
	message: string
	data: {
		user: {
			first_name: string
			last_name: string
			email: string
			role: string
			team: string
			updated_at: string
			created_at: string
			id: number
		}
		token: string
	}
	success: boolean
	code: number
}

// Define the input data type
type RegisterData = {
	first_name: string
	last_name: string
	email: string
	password: string
	// Add other fields as needed
}
