import React from 'react';
import {Row, Container, Col} from "react-bootstrap";
import { ResponsiveLine } from '@nivo/line'


export const TimeSeriesChart = ({ data }) => {
    return (
        <Container>
            <Row style={{ height: '350px', width: '1150px'}}>
                <Col>
                <ResponsiveLine
                    data={data}
                    margin={{top: 50, right: 110, bottom: 50, left: 60}}
                    xScale={{type: 'point'}}
                    curve="natural"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: 'bottom',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Daily Events',
                        legendOffset: 36,
                        legendPosition: 'middle'
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'count',
                        legendOffset: -40,
                        legendPosition: 'middle'
                    }}
                    enableGridX={false}
                    colors={{scheme: 'nivo'}}
                    lineWidth={8}
                    pointSize={10}
                    pointColor={{theme: 'background'}}
                    pointBorderWidth={3}
                    pointBorderColor={{from: 'serieColor'}}
                    pointLabel="y"
                    pointLabelYOffset={-12}
                    enableArea={true}
                    areaOpacity={0.25}
                    useMesh={true}
                />
                </Col>
            </Row>
        </Container>
    )
};