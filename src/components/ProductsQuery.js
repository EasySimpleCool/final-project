export const productsQuery = `
{
    products(first: 10) {
      edges {
        node {
          id
          handle
          title
          priceRange {
            maxVariantPrice {
              amount
            }
          }
          featuredImage {
            id
            url
          }
        }
      }
    }
  }
  `;