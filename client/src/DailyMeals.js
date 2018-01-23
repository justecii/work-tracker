import React, {Component} from 'react';
import MealDayData from './MealDayData';

import axios from 'axios';
import moment from 'moment';
import { Row, Col, Button } from 'react-materialize';

class DailyMeals extends Component{
    constructor(props){
        super(props)
        this.state={
            dates: [],
            meals: [],
            selected: ''
        }
        this.handleDate = this.handleDate.bind(this)
    }

    componentDidMount() {
        let uniqueDates = Array.from(new Set(this.props.meals.map(item => item.day)));
        if (uniqueDates !== "") {
            this.setState({
                dates: uniqueDates
            })
        }
    }
    handleDate(e) {
        e.preventDefault();
        this.setState({
            selected: e.target.value
        })

    }
    render(){
        let mappedDates = this.state.dates.map((item, index) => (
            <Button key={index} onClick={this.handleDate} value={item} className="full ltBlue white">{moment(item).format("MM/DD/YYYY")}</Button>
        ))
        return(
            <div className="ltBlue">
                <Row>
                    <Col s={12} m={3}>
                        {mappedDates}
                    </Col>
                    <Col s={12} m={9}>
                        <MealDayData user={this.props.user} selected={this.state.selected} />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default DailyMeals;