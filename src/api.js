export async function fetchProducts() {
  const res = await fetch("http://localhost:5001/api/products");
  return res.json();
}
