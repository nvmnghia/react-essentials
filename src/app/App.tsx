// import React is mandatory for JSX, as it is transpiled to React.createElement()
// https://reactjs.org/docs/jsx-in-depth.html#react-must-be-in-scope
import React, { ReactElement } from 'react';

import { Jumbotron, Container, Tab, Row, Col, Nav } from 'react-bootstrap';

import ClockPane from '../clock/ClockPane';
import FilterableTablePane from '../searchbox/FilterableProductTablePane';

// 2 ways to import css:
// - webpack: affects global
//   Depends on webpack
import './App.css';
// - Module: class selector affects local (i.e. only where included)
//   Other selectors still affects global
import styles from './App.module.css';


export interface ExamplePane {
  title: string,
  content: () => ReactElement
}

// All components in CamelCase
// Otherwise they're treated as HTML tag
// https://reactjs.org/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized
function App() {
  const panes: ExamplePane[] = [ClockPane, FilterableTablePane];

  const paneNavElements: ReactElement[] = panes.map((pane, idx) => (
    <Nav.Item key={ idx } >    {/* Key just needs to be unique among siblings */}
      <Nav.Link eventKey={ `example-panel-${idx}` }>
        { pane.title }
      </Nav.Link>
    </Nav.Item>
  ));

  const paneContentElements: ReactElement[] = panes.map((pane, idx) => (
    <Tab.Pane key={ idx } eventKey={ `example-panel-${idx}` } unmountOnExit={ true }>
      <pane.content />    {/* Component name with dot notation doesn't have to be in CamelCase */}
    </Tab.Pane>
  ));

  return (
    <Container>    {/* There must be one single wrapper / outer tag */}
      <Tab.Container defaultActiveKey="example-panel-0">    {/* All HTML attributes & CSS properties in camelCase instead of kebab-case */}
        <Jumbotron>
          <h1 className={ styles.title + " display-4 mb-4" } style={ { marginBottom: 10 } }>Examples</h1>
                                           {/* │ └─> CSS properties in camelCase and as an object */}
                                           {/* └──> Parse as JS (instead of a string) */}
          <Row>
            {/* Navigation pane
                On the left on >= sm device
                On the top on < sm (i.e. xs) device */}
            <Col sm={ 3 } className="mb-3">    {/* Number has to be wrapped inside {} */}
              <Nav variant="pills" className="flex-column">
                { paneNavElements }
              </Nav>
            </Col>

            {/* Content pane */ }
            <Col sm={ 9 }>
              { paneContentElements }
            </Col>
          </Row>
        </Jumbotron>
      </Tab.Container>
    </Container>
  );
}

export default App;
