export interface Product {
  id: number
  name: string
  normalized: string
  quant: number
}
export default Product

const ProductListError = undefined;
const ProductListLoading = null
export type ProductList = Product[] | null | undefined;
export { ProductListLoading, ProductListError }
