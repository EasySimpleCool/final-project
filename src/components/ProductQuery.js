export function productQuery(id) {
  return {
    query: `{
      product(id: "gid://shopify/Product/${id}") {
        title
    priceRange {
         maxVariantPrice{
            amount
        }
    }
    tags
    variants(first: 20) {
        edges {
            node {
                title
                id
                priceV2 {amount}
            }
        } 
    }
    description
    options { 
        values
    }
    featuredImage {
        id
        url
    }
}
}   `,
  };
}
