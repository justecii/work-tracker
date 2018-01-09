import React, {Component} from 'react';
import SamplePie from './SamplePie';

import axios from 'axios';
import moment from 'moment';

class DayData extends Component {
    constructor(props) {
        super(props)
        this.state={
            acts: [],
            dates: [],
            selected: ''
        }
        this.handleClick = this.handleClick.bind(this);
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
        console.log(this.props.acts)
        let uniqueDates = Array.from(new Set(this.props.acts.map(item => item.day)));
        if (uniqueDates !== "") {
            this.setState({
                dates: uniqueDates
            })
        }

    }
    handleClick(e){
        e.preventDefault();
        console.log(this.props)
        console.log(this.state)
    }
    render(){
        let mappedDates = this.state.dates.map((item, index) =>(
            <li key={index}>{moment(item).format("MM/DD/YYYY")}</li>
        ))
        return(
            <div>
                <ul s={3}>
                    {mappedDates}
                </ul>
                <div>
                    <SamplePie user={this.props.user} selected={this.state.selected} />
                </div>
            </div>
        )
    }
}

export default DayData;