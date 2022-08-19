export function cartLinesAdd(cartId, variantId) {
  return `mutation AddToCart {
    cartLinesAdd(cartId: ${cartId}, lines: [{ quantity: 1, merchandiseId: "${variantId}"}]) {
      cart {
        lines(first: 100) {
          edges {
            node {
              quantity
              merchandise {
                ... on ProductVariant {
                  product {
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
  }`;
}
