import React from 'react';

import { ExamplePane } from '../app/App';
import FilterableProductTable from './FilterableProductTable';


const FilterableTablePane: ExamplePane = {
  title: 'Filterable Table',
  content: () => <FilterableProductTable />
}

export default FilterableTablePane;
