import Product, { ProductList } from '../Products';
import { normalize, sleep } from '../../utils/functions/utils';


let mockProducts: Product[] | null = null;

const getAllProducts = (): Product[] => {
  if (mockProducts !== null) {
    return mockProducts;
  }

  const createProduct = (_: any, id: number): Product => {
    const name = Math.random().toString(36).substring(7);
    const searchTerm = normalize(name);

    return {
      id,
      name,
      normalized: searchTerm,
      quant: Math.floor(Math.random() * 20)
    }
  };

  mockProducts = Array.from(
    { length: 1000 },    // Any object with .length is array-like
    createProduct
  );

  return mockProducts;
}

const _searchProducts = (term: string, inStockOnly: boolean): ProductList => {
  const splitTerms: string[] = normalize(term).split(/\s+/).filter(Boolean);    // filter out empty string

  let products = getAllProducts();

  products = inStockOnly ?
    products.filter(product => product.quant > 0) :
    products;

  products = splitTerms.length === 0 ?
    products :
    products.filter(product => splitTerms.some(splitTerm => product.name.includes(splitTerm)));

  return products;
}

const searchProducts = async (term: string, inStockOnly: boolean): Promise<string> => {
  await sleep(Math.random() * 1000);

  return new Promise<string>((resolve, reject) => {
    if (Math.random() >= 0.3) {
      resolve(JSON.stringify(_searchProducts(term, inStockOnly)));
    } else {
      reject('Sth wrong');
    }
  });
}

export default searchProducts;
