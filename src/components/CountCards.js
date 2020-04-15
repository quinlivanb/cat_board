import React from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";

export const CountCards = ({data}) => {
    return (
        <Container fluid>
          <Row>
              <Col>
                <Card style={{ width: '250px'}}>
                  <Card.Body>
                    <Card.Title>Events today</Card.Title>
                    <Card.Text> {data[0]} </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card style={{ width: '250px' }}>
                  <Card.Body>
                    <Card.Title>Events this week</Card.Title>
                    <Card.Text> {data[1]} </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card style={{ width: '250px' }}>
                  <Card.Body>
                    <Card.Title>Events all time</Card.Title>
                    <Card.Text> {data[2]} </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
          </Row>
        </Container>
    )
};