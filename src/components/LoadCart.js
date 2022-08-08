import sendShopifyStorefrontRequest from "./Cart";

export async function handler(event) {
  const { cartId } = event.queryStringParameters;

  const data = await sendShopifyStorefrontRequest({
    query: `
        query GetCart($cartId: ID!) {
            cart(id: $cartId) {
            checkoutUrl
            estimatedCost {
                totalAmount {
                amount
                }
            }
            lines(first: 100) {
                edges {
                node {
                    quantity
                    estimatedCost {
                    subtotalAmount {
                        amount
                        currencyCode
                    }
                    totalAmount {
                        amount
                        currencyCode
                    }
                    }
                    merchandise {
                    ... on ProductVariant {
                        title
                        product {
                        title
                        }
                        priceV2 {
                        amount
                        currencyCode
                        }
                    }
                    }
                }
                }
            }
            }
        }
        `,
    variables: { cartId },
  });

  return {
    body: JSON.stringify(data)
  }
}
