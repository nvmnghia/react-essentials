import React, { ReactElement, useEffect, useRef } from 'react';

import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';


interface SearchBoxProps {
  onSearch: (term: string, isInStockOnly: boolean) => void
}

const SearchBox = (props: SearchBoxProps): ReactElement => {
  const defaultSearchTerm = 'wrd';
  const defaultInStockOnly = true;

  const preventReloadOnEnter = (event: React.FormEvent): void =>
    event.preventDefault();

  // TODO: find a better way to call useRef<>()
  const searchTextInputElement = useRef<HTMLInputElement>(null !);    // "...lying to TypeScript that it's not null": https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/hooks/#useref
  const getSearchTerm = (): string => searchTextInputElement.current.value;    // .current is used to access the element

  const inStockOnlyCheckboxElement = useRef<HTMLInputElement>(null !);
  const isInStockOnly = (): boolean => inStockOnlyCheckboxElement.current.checked;

  const search = (_?: any): void => props.onSearch(getSearchTerm(), isInStockOnly());

  useEffect(
    () => search(),
    []    // Make useEffect triggers once
  );

  return (
    <Form onSubmit={ preventReloadOnEnter }>
      <Form.Group>
        <FormControl type="search" ref={ searchTextInputElement } autoFocus
          onChange={ search } defaultValue={ defaultSearchTerm }    // defaultValue= is unique to react-bootstrap; value= fixes the input at that value
          placeholder="Search something" aria-label="Search something" />
      </Form.Group>
      <Form.Group>
        <Form.Check ref={ inStockOnlyCheckboxElement }
          onChange={ search } defaultChecked={ defaultInStockOnly }
          label="Only show products in stock" aria-label="Only show products in stock" />
      </Form.Group>
    </Form>
  );
};

export default SearchBox;
