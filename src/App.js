import React, { Component } from 'react';
import { PieChart } from './components/PieChart';
import { CountCards } from './components/CountCards';
import { TimeSeriesChart } from './components/TimeSeriesChart';
import { MyCalendar } from './components/MyCalandar';
import { Container, Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

class App extends Component {

    intervalID;

    state = {
        dailyData: [],
        weeklyData: [],
        cardCounts: [],
        timeSeries: [],
        calEvents: []
    };

    async updateDailyData() {
        fetch('/daily_data')
            .then(res => res.json())
            .then(data => {this.setState({dailyData: data})})
            .catch(e => {console.log(e)})
    }

    async updateWeeklyData() {
        fetch('/weekly_data')
            .then(res => res.json())
            .then(data => {this.setState({weeklyData: data})})
            .catch(e => {console.log(e)})
    }

    async updateCardCounts() {
        fetch('/card_counts')
            .then(res => res.json())
            .then(data => {this.setState({cardCounts: data})})
            .catch(e => {console.log(e)})
    }

    async updateTimeSeries() {
        fetch('/time_series')
            .then(res => res.json())
            .then(data => {this.setState({timeSeries: data})})
            .catch(e => {console.log(e)})
    }

    async updateCalData() {
        fetch('/cal_events')
            .then(res => res.json())
            .then(data => {this.setState({calEvents: data})})
            .catch(e => {console.log(e)})
    }

    async updateAll (){
        this.updateDailyData();
        this.updateWeeklyData();
        this.updateCardCounts();
        this.updateTimeSeries();
        this.updateCalData();
    }

    componentDidMount() {
       this.updateAll();
       this.intervalID = setInterval(this.updateAll.bind(this), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
      }

    render() {
        return (
            <Container>
                <Row style={{ height: '75px', width: '1150px'}}>
                    <h1> Cat Board </h1>
                </Row>
                <Row style={{ height: '140px'}}>
                    <CountCards data={this.state.cardCounts}/>
                </Row>
                 <Row>
                     <h4> Daily and weekly break downs </h4>
                     <PieChart data_weekly={this.state.weeklyData} data_daily={this.state.dailyData}/>
                </Row>
                <Row style={{ height: '450px'}}>
                    <h4> Time series trends </h4>
                    <TimeSeriesChart data={this.state.timeSeries}/>
                </Row>
                <Row  style={{ height: '350px'}}>
                    <h4> Event calendar </h4>
                    <MyCalendar data={this.state.calEvents}/>
                </Row>

            </Container>

        );
    }
}

export default App;
