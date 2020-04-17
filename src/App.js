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
                <Row style={{ height: '120px'}}>
                    <CountCards data={this.state.cardCounts}/>
                </Row>
                 <Row>
                    <PieChart data_weekly={this.state.weeklyData} data_daily={this.state.dailyData}/>
                </Row>
                <Row>
                    <TimeSeriesChart data={this.state.timeSeries}/>
                </Row>
                <Row>
                    <MyCalendar data={this.state.calEvents}/>
                </Row>

            </Container>

        );
    }
}

export default App;
