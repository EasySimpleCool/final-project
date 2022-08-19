export function cartLinesRemove(cartId, variantId) {
  return `mutation cartLinesRemove {
        cartLinesRemove(cartId: ${cartId}, lines: [{ quantity: 1, merchandiseId: ${variantId}}]) {
            cart {
                id
              }
            userErrors {
              field
              message
            }
          }
        }`;
}
