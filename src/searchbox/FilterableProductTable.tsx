import React, { useState } from 'react';

import ProductTable from './product_table/ProductTable';
import SearchBox from './searchbox/SearchBox';


export interface Product {
  id: number
  name: string
  normalized_name: string
  quantity: number
}

const normalize = (term: string): string => term.toLowerCase().normalize('NFC');

const getProducts = (): Product[] => {
  const createProduct = (_: any, i: number): Product => {
    const name = Math.random().toString(36).substring(7);
    const searchTerm = normalize(name);

    return {
      id: i,
      name,
      normalized_name: searchTerm,
      quantity: Math.floor(Math.random() * 20)
    }
  };

  return Array.from(
    { length: 1000 },    // Any object with .length is array-like
    createProduct
  );
}

const allProducts = getProducts();

const FilterableProductTable = () => {
  // DOWNWARD dataflow:
  // - Data is passed as props.
  // - State is created, might be from props.
  // - State is passed as props to a child components.
  //   In this case specifically, when that state changes, the changes
  //   propagates to the child components.

  // When downward is not enough: sync states...
  // - from child to parent: as props can be a function (i.e. parent passes
  //   functions to children), just call it to pass state to parent.
  // - between non child-parent pairs: store state in a common ancestor.
  // The above is called LIFTING STATE UP.

  // TODO: compare to unidirectional dataflow of Angular.

  // Q: Shouldn't props be immutable?
  // A: Props are immutable in the sense that the component can't
  //    mutate its props. Parent component can change data that
  //    was already passed as props to child component and that
  //    changes is propagated down as explained.
  // Tl;DR: props are states managed by parents.

  // let [productsToDisplay, setProductsToDisplay]: [Product[], Function] = useState(getProducts);
  // TODO: the above line does NOT assign allProducts to productsToDisplay, although it SHOULD
  // In an attempt to fix that, the following line throws "Too many re-renders" exception
  // setMatchedProduct(products);

  // TODO: Every search will use setProductsToDisplay, which changes state,
  // forcing a re-render, and thus changes allProducts
  // const allProducts = getProducts();
  let [productsToDisplay, setProductsToDisplay]: [Product[], Function] = useState([]);

  // The below are wrongs. searchTerm and inStockOnly can not be state.
  // They are just args for the search process.
  // During implementation, I tried to make those 2 variable into state,
  // which leads to many confusion.
  // let [searchTerm, setSearchTerm]: [string, Function] = useState('');
  // let [inStockOnly, setInStockOnly]: [boolean, Function] = useState(true);

  const handleSearch = (term: string, inStockOnly: boolean): void => {
    const splitTerms = normalize(term).split(/\s+/).filter(Boolean);    // filter out empty string

    let matchedProducts = allProducts;

    matchedProducts = splitTerms.length === 0 ?
      matchedProducts :
      matchedProducts.filter(product => splitTerms.some(splitTerm => product.name.includes(splitTerm)));

    matchedProducts = inStockOnly ?
      matchedProducts.filter(product => product.quantity > 0) :
      matchedProducts;

    setProductsToDisplay(matchedProducts);
  }

  return (
    <div>
      <SearchBox onSearch={ handleSearch } />
      <ProductTable products={ productsToDisplay } />
    </div>
  );
}

export default FilterableProductTable;
