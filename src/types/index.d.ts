import { DefaultSession } from "next-auth";

// interface Product {
// 	id: number
// 	slug: string
// 	name: string
// 	description: string
// 	subtitle: string
// 	price: string
// }

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
	recaptcha_token?: string
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
// type Product = {
// 	id: number;
// 	name: string;
// 	subtitle: string;
// 	description: string;
// 	price: string;
// };

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



type MetadataRaw = {
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
	allergies: string;
	current_medications: string;
	allergies_details: string;
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

type Metadata = {
	user_agent: string;
	location: string | null;
	raw: MetadataRaw;
};

type Price = {
	frequency?: number;
	unit?: string;
	value: number;
	currency: string;
	id: string;
};

type ProductCategory = {
	id: number;
	name: string;
	slug: string;
	description?: string | null;
	image_url?: string | null;
	order: number;
};

type Product = {
	id: number;
	name: string;
	slug: string;
	subtitle: string;
	description: string;
	nav_description: string | null;
	key_ingredients: string | null;
	benefits: string | null;
	potency?: string | null;
	price: Price[];
	quantity: number;
	selected_price: string | null;
	image_path?: string | null;
	image_url?: string | string[] | null;
	checkout_type?: 'form' | 'direct';
	requires_patient_clinic_selection?: boolean;
	shipping_fee?: number | null;
	tax_rate?: number | null;
	category?: ProductCategory;
};

type CompletedPayment = {
	id: number;
	shipping_fee: string;
	sub_total: string;
	total: string;
	status: string;
	paid_at: string;
	method: string;
	method_info: any;
	metadata: any;
	products: Product[]; // Nested products in completed_payment
	discount_code?: string | null;
	discount_amount?: string | null;
};

type OrderDetail = {
	id: string;
	reference: string;
	total_products: number;
	total_cost: string;
	metadata: Metadata;
	status: string;
	comment: string | null;
	created_at: string;
	completed_payment: CompletedPayment;
	products: Product[]; // Top-level products
	updated_at: string;
};

