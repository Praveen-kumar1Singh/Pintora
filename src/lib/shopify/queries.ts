export const getProductsQuery = `
  query getProducts($query: String, $first: Int = 20, $sortKey: ProductSortKeys, $reverse: Boolean) {
    products(first: $first, query: $query, sortKey: $sortKey, reverse: $reverse) {
      edges {
        node {
          id
          title
          handle
          description
          availableForSale
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                availableForSale
                sku
                image {
                  url
                  altText
                }
                selectedOptions {
                  name
                  value
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                priceV2: price {
                  amount
                  currencyCode
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`;

export const getProductByHandleQuery = `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      availableForSale
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            availableForSale
            sku
            image {
              url
              altText
            }
            selectedOptions {
              name
              value
            }
            compareAtPrice {
              amount
              currencyCode
            }
            priceV2: price {
              amount
              currencyCode
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;

export const getCollectionProductsQuery = `
  query getCollectionProducts($handle: String!, $first: Int = 100) {
    collection(handle: $handle) {
      id
      title
      description
      image {
        url
        altText
      }
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            availableForSale
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  sku
                  image {
                    url
                    altText
                  }
                  selectedOptions {
                    name
                    value
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  priceV2: price {
                    amount
                    currencyCode
                  }
                }
              }
            }
            options {
              name
              values
            }
          }
        }
      }
    }
  }
`;

export const getCartQuery = `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      cost {
        subtotalAmount {
          amount
          currencyCode
        }
        totalAmount {
          amount
          currencyCode
        }
        totalTaxAmount {
          amount
          currencyCode
        }
      }
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
            merchandise {
              ... on ProductVariant {
                id
                title
                product {
                  id
                  title
                  handle
                  images(first: 1) {
                    edges {
                      node {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const getCollectionsQuery = `
  query getCollections($first: Int = 20) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            url
            altText
          }
        }
      }
    }
  }
`;

export const getProductRecommendationsQuery = `
  query getProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      id
      title
      handle
      description
      availableForSale
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            availableForSale
            sku
            image {
              url
              altText
            }
            selectedOptions {
              name
              value
            }
            compareAtPrice {
              amount
              currencyCode
            }
            priceV2: price {
              amount
              currencyCode
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;
