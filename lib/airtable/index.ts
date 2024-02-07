import { HIDDEN_PRODUCT_TAG, SHOPIFY_GRAPHQL_API_ENDPOINT, TAGS } from 'lib/constants';
import { ensureStartsWith } from 'lib/utils';

import {
  Cart,
  Collection,
  Connection,
  Image,
  Menu,
  Page,
  Product,
  ShopifyCollection,
  ShopifyProduct
} from './types';

const domain = process.env.SHOPIFY_STORE_DOMAIN
  ? ensureStartsWith(process.env.SHOPIFY_STORE_DOMAIN, 'https://')
  : '';
const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

const removeEdgesAndNodes = (array: Connection<any>) => {
  return array.edges.map((edge) => edge?.node);
};

const reshapeCollection = (collection: ShopifyCollection): Collection | undefined => {
  if (!collection) {
    return undefined;
  }

  return {
    ...collection,
    path: `/search/${collection.handle}`
  };
};

const reshapeCollections = (collections: ShopifyCollection[]) => {
  const reshapedCollections = [];

  for (const collection of collections) {
    if (collection) {
      const reshapedCollection = reshapeCollection(collection);

      if (reshapedCollection) {
        reshapedCollections.push(reshapedCollection);
      }
    }
  }

  return reshapedCollections;
};

const reshapeImages = (images: Connection<Image>, productTitle: string) => {
  const flattened = removeEdgesAndNodes(images);

  return flattened.map((image) => {
    const filename = image.url.match(/.*\/(.*)\..*/)[1];
    return {
      ...image,
      altText: image.altText || `${productTitle} - ${filename}`
    };
  });
};

const reshapeProduct = (product: ShopifyProduct, filterHiddenProducts: boolean = true) => {
  if (!product || (filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))) {
    return undefined;
  }

  const { images, variants, ...rest } = product;

  return {
    ...rest,
    images: reshapeImages(images, product.title),
    variants: removeEdgesAndNodes(variants)
  };
};

const reshapeProducts = (products: ShopifyProduct[]) => {
  const reshapedProducts = [];

  for (const product of products) {
    if (product) {
      const reshapedProduct = reshapeProduct(product);

      if (reshapedProduct) {
        reshapedProducts.push(reshapedProduct);
      }
    }
  }

  return reshapedProducts;
};

export async function createCart(): Promise<Cart> {
  return { lines: [], totalCost: 0, id: '' };
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  return { lines: [], totalCost: 0, id: '' };
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  return { lines: [], totalCost: 0, id: '' };
}

export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  return { lines: [], totalCost: 0, id: '' };
}

export async function getCart(cartId: string): Promise<Cart | undefined> {
  return { lines: [], totalCost: 0, id: '' };
}
export async function getCollection(handle: string): Promise<Collection | undefined> {
  return undefined;
}

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  return [];
}

export async function getCollections(): Promise<Collection[]> {
  return [];
}

export async function getMenu(handle: string): Promise<Menu[]> {
  return [];
}

export async function getPage(handle: string): Promise<Page> {
  return {
    id: 'fakeid',
    title: 'FAKE TITLE',
    body: 'BODY',
    bodySummary: 'BODY SUMMARY',
    createdAt: `${Date.now()}`,

    handle: 'HANDLE',
    updatedAt: `${Date.now()}`
  };
}

export async function getPages(): Promise<Page[]> {
  return [await getPage('')];
}

export async function getProduct(productId: string): Promise<Product | undefined> {
  return {
    title: 'title',
    variants: [],
    images: [],
    availableForSale: true,
    description: 'FAKE description',
    descriptionHtml: 'HTML DESC',
    featuredImage: {
      altText: 'KAKE',
      url: '',
      height: 400,
      width: 400
    },
    handle: 'handel',
    id: 'product-id',
    options: [],
    priceRange: {
      maxVariantPrice: 40,
      minVariantPrice: 30
    },
    seo: {
      description: '',
      title: ''
    },
    tags: [],
    updatedAt: ''
  };
}

export async function getProductRecommendations(productId: string): Promise<Product[]> {
  return [];
}

export async function getProducts({
  query,
  reverse,
  sortKey
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  console.log('GETTING PRODUCTS');

  const r = await fetch('http://localhost:3000/api/airtable', {
    method: 'GET'
  });
  console.log(r.statusText);

  return [];
}
