import React, { ReactElement } from 'react';

import { Alert, Spinner, Table } from 'react-bootstrap';

import Product, { ProductList, ProductListError, ProductListLoading } from '../Products';

import styles from './ProductTable.module.css';


interface ProductRowProps {
  product: Product
};

const ProductRow = (props: ProductRowProps): ReactElement => {
  return (
    <tr>    {/* Even though <ProductRow> will be compiled into this <tr>, key= must be set with <ProductRow>, i.e. top level */ }
      <td>{ props.product.id }</td>
      <td>{ props.product.name }</td>
      <td>{ props.product.quant }</td>
    </tr>
  );
};

interface ProductTableProps {
  products: ProductList
  onSearchAgain: () => void
};

const ProductTable = (props: ProductTableProps) => {
  let contentElement;
  const { products, onSearchAgain } = props;

  if (!products || products.length === 0) {
    // Single info line
    let line;

    switch (products) {
      case ProductListError:
        line = (
          <Alert variant="warning" style={ { textAlign: 'center' } } onClick={ onSearchAgain }>
            Error retrieving data. Click this banner to search again.
          </Alert>
        );
        break;

      case ProductListLoading:
        line = <Spinner animation="grow" />;
        break;

      default:
        // Nothing found
        line = (
          <Alert variant="info" style={ { textAlign: 'center' } } onClick={ onSearchAgain }>
            Nothing found. Click this banner to search again.
          </Alert>
        );
    }

    contentElement = (
      <tr>
        <td colSpan={ 3 } className={ styles.infoRow }>
          { line }
        </td>
      </tr>
    );

  } else {
    // Rows of data
    contentElement = products.map(product => <ProductRow key={ product.id } product={ product } />);
  }

  return (
    <Table>
      <thead>
        <tr className="font-weight-bold">
          <td>ID</td>
          <td>Name</td>
          <td>Quantity</td>
        </tr>
      </thead>
      <tbody>
        { contentElement }
      </tbody>
    </Table>
  );
};

export default ProductTable;
