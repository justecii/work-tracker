import React, {Component} from 'react';
import ActDayData from './ActDayData';

import axios from 'axios';
import moment from 'moment';
import {Row, Col, Button} from 'react-materialize';

class DayData extends Component {
    constructor(props) {
        super(props)
        this.state={
            acts: [],
            dates: [],
            selected: ''
        }
        this.handleDate = this.handleDate.bind(this);
    }
    componentDidMount() {
        axios.post('/users/actLog', {
            user: this.props.user.id
        }).then(result => {
            // sorts data by time of occurence, regardless of when input
            var sorted = result.data
            sorted.sort(function (a, b) {
                if (moment(a.start) < moment(b.start))
                    return -1;
                if (moment(a.start) > moment(b.start))
                    return 1;
                else return 0
            });
            this.setState({
                acts: result.data
            });
        });
        let uniqueDates = Array.from(new Set(this.props.acts.map(item => item.day)));
        if (uniqueDates !== "") {
            this.setState({
                dates: uniqueDates
            })
        }
    }
    handleDate(e){
        e.preventDefault();
        this.setState({
            selected: e.target.value
        })

    }

    render(){
        let mappedDates = this.state.dates.map((item, index) =>(
            <Button key={index} onClick={this.handleDate} value={item} className="full ltBlue white">{moment(item).format("MM/DD/YYYY")}</Button>
        ))
        return(
            <div>
                <Row>
                    <Col s={12} m={2}>
                        <p>Choose a Date:</p>
                        {mappedDates}
                    </Col>
                    <Col s={0} m={1}>
                    </Col>
                    <Col s={12} m={9}>
                    <ActDayData user={this.props.user} selected={this.state.selected} />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default DayData;