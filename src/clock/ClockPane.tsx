import React, { ReactElement } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import { ClockClass, ClockFunc } from './Clock';
import { ExamplePane } from '../app/App';


const ClockPaneComponent = (): ReactElement => {
  return (
    <Row>
      <Col sm={6}>
        <Card>
          <Card.Header>
            <code>ClockClass</code>
          </Card.Header>
          <Card.Body>
            <ClockClass/>
          </Card.Body>
        </Card>
      </Col>
      <Col sm={6}>
        <Card>
          <Card.Header>
            <code>ClockFunc</code>
          </Card.Header>
          <Card.Body>
            <ClockFunc/>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

const ClockPane: ExamplePane = {
  title: 'Clock Class & Func',
  content: ClockPaneComponent
};

export default ClockPane;
