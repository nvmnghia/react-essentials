import React, { useState } from 'react';

import { ProductList, ProductListError, ProductListLoading } from '../Products';
import searchProducts from './MockApi';
import ProductTable from '../product_table/ProductTable';
import SearchBox from '../searchbox/SearchBox';


// DOWNWARD dataflow:
// - Data is passed as props.
// - State is created, might be from props.
// - State is further passed as props to a child components.
//   In this case specifically, when that state changes,
//   the changes propagates to the child components.

// When downward is not enough: sync states...
// - from child to parent: as props can be a function (i.e. parent passes
//   functions to children), just call it to pass state to parent.
// - between non child-parent pairs: store state in a common ancestor.
//   (i.e. LIFTING STATE UP).

// TODO: compare to unidirectional dataflow of Angular & Jetpack.

// Q: Shouldn't props be immutable?
// A: Props are immutable in the sense that the component can't
//    mutate its props. Parent component can change data that
//    was already passed as props to child component and that
//    changes is propagated down as explained.
// Tl;DR: props are states managed by parents.

const FilterableProductTable = () => {

  // let [productsToDisplay, setProductsToDisplay]: [Product[], Function] = useState(getProducts);
  // TODO: the above line does NOT assign the result of getProducts
  // to productsToDisplay, although it SHOULD.
  // In an attempt to fix that, the following line throws
  // "Too many re-renders" exception:
  // setMatchedProduct(products);

  // TODO: Every search will use setProductsToDisplay, which changes state,
  // forcing a re-render, and thus changes allProducts
  // const allProducts = getProducts();

  let [productsToDisplay, setProductsToDisplay] = useState<ProductList>([]);

  const search = (term: string, inStockOnly: boolean): void => {
    setProductsToDisplay(ProductListLoading);

    setSearchTerm(term);
    setInStockOnly(inStockOnly);

    searchProducts(term, inStockOnly)
      .then(products => setProductsToDisplay(JSON.parse(products)))
      .catch(_ => setProductsToDisplay(ProductListError));
  }

  // The search arguments are states only for the searching again use case.
  let [currentTerm, setSearchTerm]: [string, Function] = useState('');
  let [currentInStockOnly, setInStockOnly]: [boolean, Function] = useState(true);

  const searchAgain = () => search(currentTerm, currentInStockOnly);

  return (
    <div>
      <SearchBox onSearch={ search } />
      <ProductTable products={ productsToDisplay } onSearchAgain={ searchAgain } />
    </div>
  );

}

export default FilterableProductTable;
