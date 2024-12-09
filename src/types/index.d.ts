import { DefaultSession } from "next-auth";

interface Product {
	id: number
	name: string
	description: string
	subtitle: string
	price: number
}

type RegisterUserInput = {
	first_name: string
	last_name: string
	email: string
	password: string
}

type User = {
	first_name: string
	last_name: string
	email: string
	role: string
	team: string
	updated_at: string
	created_at: string
	id: number
}

type ContactInfoSent = {
	email: string
	name: string
	phone: string
	subject: string
	message: string
}

type ContactResponse = {
	message: string
	data: null
	success: boolean
	code: number
}

type RegisterUserResponse = {
	message: string
	data: {
		user: User
		token: string
	}
	success: boolean
	code: number
}

type ForgotPasswordResponse = {
	message: string
	data: null
	success: boolean
	code: number
}



// export interface Session extends DefaultSession {
//   user: {
//     id: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     role: string;
//     team: string;
//     token: string;
//   } & DefaultSession["user"];
//   accessToken?: string;
// }
