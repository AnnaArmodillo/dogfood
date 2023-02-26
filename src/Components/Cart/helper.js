export function getQueryKey(cart) {
  const cartIDs = [];
  cart.forEach((product) => cartIDs.push(product.id));
  return ['cart', cartIDs];
}
