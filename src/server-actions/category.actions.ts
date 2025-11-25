import axios from 'axios';
import { baseUrl } from './api.actions';

export interface Category {
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  products_count?: number;
  products?: any[];
}

/**
 * Get all unique categories
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await axios.get(baseUrl('/categories'));
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to fetch categories');
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message || 'Failed to fetch categories');
  }
}

/**
 * Get category details by slug
 */
export async function getCategory(slug: string): Promise<Category> {
  try {
    const response = await axios.get(baseUrl(`/categories/${slug}`));
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to fetch category');
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message || 'Failed to fetch category');
  }
}

/**
 * Get products in a category by slug
 */
export async function getCategoryProducts(slug: string): Promise<any> {
  try {
    const response = await axios.get(baseUrl(`/categories/${slug}/products`));
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to fetch category products');
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message || 'Failed to fetch category products');
  }
}

/**
 * Get products grouped by categories (3 per category)
 */
export async function getProductsByCategories(): Promise<Category[]> {
  try {
    const response = await axios.get(baseUrl('/form/products/by-categories'));
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to fetch products by categories');
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message || 'Failed to fetch products by categories');
  }
}


