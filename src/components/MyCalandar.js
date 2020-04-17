import React from 'react';
import {Row, Container, Col} from "react-bootstrap";
import { ResponsiveCalendar } from '@nivo/calendar'



export const MyCalendar = ({ data }) => {
    let date = new Date();
    let cur_year = date.getFullYear();

    return (
        <Container>
            <Row style={{height: '350px', width: '1150px'}}>
                <Col>
                    <ResponsiveCalendar
                        data={data}
                        from={cur_year + "-01-02"}
                        to={cur_year + "-12-31"}
                        emptyColor="#eeeeee"
                        colors={['#baffb3', '#9dfd87', '#6ae84f', '#11f416']}
                        margin={{top: 40, right: 40, bottom: 40, left: 40}}
                        yearSpacing={40}
                        monthBorderColor="#ffffff"
                        dayBorderWidth={2}
                        dayBorderColor="#ffffff"
                    />
                </Col>
            </Row>
        </Container>
    )
}