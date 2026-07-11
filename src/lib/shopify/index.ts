import { getProductsQuery, getProductByHandleQuery, getCollectionProductsQuery, getCartQuery } from './queries';
import { cartCreateMutation, cartLinesAddMutation, cartLinesUpdateMutation, cartLinesRemoveMutation } from './mutations';

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '';
const endpoint = `https://${domain}/api/${process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || '2026-07'}/graphql.json`;
const key = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
  };
  availableForSale: boolean;
  images: { edges: { node: { url: string; altText?: string } }[] };
  variants: { edges: { node: { id: string; title: string; availableForSale: boolean; priceV2?: { amount: string; currencyCode: string } } }[] };
  options: { name: string; values: string[] }[];
  seo?: { title: string; description: string };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: { amount: string; currencyCode: string };
    totalAmount: { amount: string; currencyCode: string };
  };
  lines: {
    edges: {
      node: {
        id: string;
        quantity: number;
        cost: { totalAmount: { amount: string; currencyCode: string } };
        merchandise: {
          id: string;
          title: string;
          product: {
            id: string;
            title: string;
            handle: string;
            images: { edges: { node: { url: string; altText?: string } }[] };
          }
        }
      }
    }[]
  };
}

async function shopifyFetch<T>({ cache = 'force-cache', headers, query, tags, variables }: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: Record<string, any>;
}): Promise<{ status: number; body: T } | never> {
  try {
    if (!domain || !key) {
      throw new Error('Missing Shopify environment variables');
    }

    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key,
        ...headers
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
      cache,
      ...(tags && { next: { tags } })
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (error) {
    console.error('Error in shopifyFetch:', error);
    throw error;
  }
}

export async function getProducts(query?: string): Promise<ShopifyProduct[]> {
  try {
    const res = await shopifyFetch<any>({
      query: getProductsQuery,
      variables: { query },
      tags: ['products']
    });
    return res.body.data.products.edges.map((edge: any) => edge.node);
  } catch (e) {
    console.warn('Shopify API fallback - Returning mock products');
    return [];
  }
}

export async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  try {
    const res = await shopifyFetch<any>({
      query: getProductByHandleQuery,
      variables: { handle },
      tags: ['product']
    });
    return res.body.data.product;
  } catch (e) {
    return null;
  }
}

export async function getCollectionProducts(handle: string): Promise<ShopifyProduct[]> {
  try {
    const res = await shopifyFetch<any>({
      query: getCollectionProductsQuery,
      variables: { handle },
      tags: ['collection']
    });
    return res.body.data.collection?.products.edges.map((edge: any) => edge.node) || [];
  } catch (e) {
    return [];
  }
}

// CART OPERATIONS

export async function createCart(): Promise<ShopifyCart> {
  const res = await shopifyFetch<any>({
    query: cartCreateMutation,
    cache: 'no-store'
  });
  return res.body.data.cartCreate.cart;
}

export async function addToCart(cartId: string, lines: { merchandiseId: string; quantity: number }[]): Promise<ShopifyCart> {
  const res = await shopifyFetch<any>({
    query: cartLinesAddMutation,
    variables: { cartId, lines },
    cache: 'no-store'
  });
  return res.body.data.cartLinesAdd.cart;
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<ShopifyCart> {
  const res = await shopifyFetch<any>({
    query: cartLinesRemoveMutation,
    variables: { cartId, lineIds },
    cache: 'no-store'
  });
  return res.body.data.cartLinesRemove.cart;
}

export async function updateCart(cartId: string, lines: { id: string; quantity: number }[]): Promise<ShopifyCart> {
  const res = await shopifyFetch<any>({
    query: cartLinesUpdateMutation,
    variables: { cartId, lines },
    cache: 'no-store'
  });
  return res.body.data.cartLinesUpdate.cart;
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  try {
    const res = await shopifyFetch<any>({
      query: getCartQuery,
      variables: { cartId },
      cache: 'no-store'
    });
    return res.body.data.cart;
  } catch (e) {
    return null;
  }
}
