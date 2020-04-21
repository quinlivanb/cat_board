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
                    margin={{top: 10, right: 110, bottom: 50, left: 60}}
                    xScale={{ type: 'time', format: '%Y-%m-%d', precision: 'day',}}
                    xFormat="time:%Y-%m-%d"
                    yScale={{type: 'linear'}}
                    curve="natural"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        format: '%b %d',
                        tickValues: 'every day',
                        legend: 'time scale',
                        legendOffset: +40,
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