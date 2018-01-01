import React, {Component} from 'react';
import { Input, Button, Row, Col } from 'react-materialize';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class NewActivity extends Component{
    constructor(props) {
        super(props)
        this.state = {
            startDate: moment(),
            endDate: moment(),
            minDuration: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleEnd = this.handleEnd.bind(this)
    }
    handleChange(date) {
        this.setState({
            startDate: date
        });
    }
    handleEnd(date) {
        this.setState({
            endDate: date
        });
    }
    onClick(e){
        e.preventDefault()
        console.log(this.state)
        var startTime = this.state.startDate._d
        var finishTime = this.state.endDate._d
        var ms = moment(finishTime, "DD/MM/YYYY HH:mm:ss").diff(moment(startTime, "DD/MM/YYYY HH:mm:ss"));
        var d = moment.duration(ms);
        var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm");
        console.log(ms);
        console.log(s);
        var minDur = Math.floor(ms / 60000)
        console.log(minDur + " minutes");
        if (minDur > 0) {
            this.setState({
                minDuration: minDur
            })
        } else {
            console.log("Enter a Valid Time")
        }
    }

    render(){
        return(
            <div>
                <form>
                    <Input label='Activity' type="text"/>
                    <Input label='Category' type="text" />
                    <Input label='Location' type="text" />
                    Start Time:<DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={5}
                        dateFormat="LLL"
                    />
                    End Time:<DatePicker
                        selected={this.state.endDate}
                        onChange={this.handleEnd}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={5}
                        dateFormat="LLL"
                    />
                    <Input label='Notes' type="text" />
                    <Button onClick={(e) => this.onClick(e)}>Submit</Button>
                </form>
                <p>Length {this.state.minDuration} minutes</p>
            </div>
        )
    }
}

export default NewActivity;