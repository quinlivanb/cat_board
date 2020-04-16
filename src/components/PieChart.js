import React from 'react';
import { ResponsivePie } from '@nivo/pie'
import {Row, Col, Container} from "react-bootstrap";

const MyPie = ({data}) => {
    return(
        <ResponsivePie
            data={data}
            radialLabel = {'label'}
            margin={{top: 40, right: 40, bottom: 40, left: 40}}
            innerRadius={0.45}
            padAngle={1}
            cornerRadius={4}
            colors={{scheme: 'nivo'}}
            borderColor={{from: 'color', modifiers: [['darker', '0.1']]}}
            radialLabelsSkipAngle={0}
            radialLabelsTextXOffset={10}
            radialLabelsTextColor="#333333"
            radialLabelsLinkOffset={3}
            radialLabelsLinkDiagonalLength={20}
            radialLabelsLinkHorizontalLength={35}
            radialLabelsLinkStrokeWidth={3}
            radialLabelsLinkColor={{from: 'color'}}
            slicesLabelsSkipAngle={20}
            slicesLabelsTextColor="#333333"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            isInteractive={false}
        />
    )
};

export const PieChart = ({data_weekly, data_daily}) => {
    return (
        <Container>
            <Row>
                <Col lg={6} style={{ height: '300px', width: '300px'}}>
                    <MyPie data={data_weekly}/>
                </Col>

                <Col lg={6} style={{ height: '300px', width: '300px'}}>
                    <MyPie data={data_daily}/>
                </Col>
            </Row>
        </Container>
    )
};