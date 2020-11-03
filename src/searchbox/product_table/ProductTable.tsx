import React, { ReactElement } from 'react';

import Table from 'react-bootstrap/Table';

import { Product } from '../FilterableProductTable';


interface ProductRowProps {
  product: Product
}

const ProductRow = (props: ProductRowProps): ReactElement => {
  return (
    <tr>
      <td>{ props.product.id }</td>
      <td>{ props.product.name }</td>
      <td>{ props.product.quantity }</td>
    </tr>
  );
};

interface ProductTableProps {
  products: Product[]
};

const ProductTable = (props: ProductTableProps) => (
  <Table>
    <thead>
      <tr className="font-weight-bold">
        <td>ID</td>
        <td>Name</td>
        <td>Quantity</td>
      </tr>
    </thead>
    <tbody>
      { props.products.map(product => (
        <ProductRow product={ product } />
      )) }
    </tbody>
  </Table>
);

export default ProductTable;
