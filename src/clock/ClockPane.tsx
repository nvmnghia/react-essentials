import React, { ReactElement } from 'react';

import { Row, Col, Card } from 'react-bootstrap';

import { ClockClass, ClockFunc } from './Clock';
import { ExamplePane } from '../app/App';


const ClockPaneComponent = (): ReactElement => {
  const clockTypes = ['ClockClass', 'ClockFunc'];    // someObj.constructor.name is changed after minify: https://stackoverflow.com/a/10314492/5959593
  const clockComponents = [ClockClass, ClockFunc];

  const clockElements = clockComponents.map((Clock, idx) => (
    <Col key={ idx } sm={ 6 } className="mb-3">
      <Card>
        <Card.Header>
          <code>{ clockTypes[idx] }</code>
        </Card.Header>
        <Card.Body>
          <Clock />
        </Card.Body>
      </Card>
    </Col>
  ));

  return (
    <Row>
      { clockElements }
    </Row>
  );
}

const ClockPane: ExamplePane = {
  title: 'Clock Class & Func',
  content: ClockPaneComponent
};

export default ClockPane;
