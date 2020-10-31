// import React is mandatory for JSX, as it is transpiled to React.createElement()
// https://reactjs.org/docs/jsx-in-depth.html#react-must-be-in-scope
import React, { ReactElement } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

import ClockPane from '../clock/ClockPane';


export interface ExamplePane {
  title: string,
  element: () => ReactElement
}

// All component in CamelCase
// https://reactjs.org/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized
function App() {
  return (
    <Container className="App">    {/* There must be one single wrapper / outer tag */}
      <Tab.Container defaultActiveKey="first">    {/* All HTML attributes & CSS properties in camelCase instead of kebab-case */}
        <Jumbotron>
          <h1 className="display-4" style={{ marginBottom: 10 }}>Examples</h1>
                                      {/* │└─> CSS properties in camelCase and as an object */}
                                      {/* └──> Parse as JS (instead of a string) */}
          <Row>
            {/* Navigation pane
                On the left on non-sm device
                On the top on sm device */}
            <Col sm={3}>    {/* Number has to be wrapped inside {} */}
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">Clock class & func</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">More shit</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>

            {/* Content pane
                On the right on non-sm device
                On the bottom on sm device */}
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  {/* <ClockClass />
                  <ClockFunc /> */}
                  <ClockPane.element/>
                  {/* <FuncComp/> */}
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Jumbotron>
      </Tab.Container>
    </Container>
  );
}

export default App;
