import React, { ReactElement } from 'react';

import Table from 'react-bootstrap/Table';

import { Product } from '../FilterableProductTable';


interface ProductRowProps {
  product: Product
}

const ProductRow = (props: ProductRowProps): ReactElement => {
  return (
    <tr>    {/* Even though <ProductRow> will be compiled into this <tr>, key= must be set with <ProductRow>, i.e. top level */}
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
        <ProductRow key={ product.id } product={ product } />
      )) }
    </tbody>
  </Table>
);

export default ProductTable;
