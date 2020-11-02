import React, { ReactElement } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import { ClockClass, ClockFunc } from './Clock';
import { ExamplePane } from '../app/App';


const ClockPaneComponent = (): ReactElement => {
  const clockTypes = ['ClockClass', 'ClockFunc'];    // someObj.constructor.name is changed after minify: https://stackoverflow.com/a/10314492/5959593
  const clockComponents = [ClockClass, ClockFunc];

  const clockElements = clockComponents.map((Clock, i) => (
    <Col sm={6}>
      <Card>
        <Card.Header>
          <code>{ clockTypes[i] }</code>
        </Card.Header>
        <Card.Body>
          <Clock/>
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
