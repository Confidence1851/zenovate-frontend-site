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



// Type for a single product in the metadata's raw.selected_products array
type Product = {
	id: number;
	name: string;
	subtitle: string;
	description: string;
	price: string;
  };
  
  // Type for the raw metadata within the metadata field
  type RawMetadata = {
	first_name: string;
	last_name: string;
	email: string;
	phone_number: string;
	date_of_birth: string;
	preferred_contact: string;
	street_address: string;
	city: string;
	state_province: string;
	postal_zip_code: string;
	country: string;
	selected_products: Product[];
	allergies: string;
	current_medications: string;
	allergies_details: string | null;
	existing_conditions: string;
	previous_surgeries: string;
	heart_disease: string;
	kidney_disease: string;
	liver_disease: string;
	autoimmune_disorders: string;
	other_conditions: string;
	recent_health_changes: string;
	injectables_concerns: string;
	needle_fear: string;
	family_medical_history: string;
	additional_info: string;
  };
  
  // Type for the metadata field
  type Metadata = {
	user_agent: string;
	location: string | null;
	raw: RawMetadata;
  };
  
  // Type for a single order
  type Order = {
	id: string;
	reference: string;
	total_products: number;
	total_cost: number;
	// metadata: Metadata;
	status: string;
	comment: string | null;
	created_at: string;
  };
  
  // Type for the pagination meta field
  type PaginationMeta = {
	current_page: number;
	first_page_url: string;
	from: number;
	last_page: number;
	last_page_url: string;
	next_page_url: string | null;
	path: string;
	per_page: number;
	prev_page_url: string | null;
	to: number;
	total: number;
	can_load_more: boolean;
  };
  
  // Type for the main data field
  type ResponseData = {
	pagination_meta: PaginationMeta;
	data: Order[];
  };
  
  // Type for the entire API response
  type OrdersListResponse = {
	message: string;
	data: ResponseData;
	success: boolean;
	code: number;
  };
  
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
