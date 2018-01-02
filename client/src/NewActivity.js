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
            minDuration: 0,
            activity: '',
            category: '',
            subCat: '',
            location: '',
            addNotes: ''
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
    handleAct(e){
       this.setState({
           activity: e.target.value
       })
    }
    handleCat(e) {
        this.setState({
            category: e.target.value
        })
    }
    handleSubCat(e) {
        this.setState({
            subCat: e.target.value
        })
    }
    handleLoc(e) {
        this.setState({
            location: e.target.value
        })
    }
    handleNote(e) {
        this.setState({
            addNotes: e.target.value
        })
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
                    <Input label='Activity' type="text" className="newFormItem" onInput={(e) => this.handleAct(e)} />
                    <Input label='Category' type="text" className="newFormItem" onInput={(e) => this.handleCat(e)} />
                    <Input label="Sub-Category" type="text" className="newFormItem" onInput={(e) => this.handleSubCat(e)} />
                    <Input label='Location' type="text" className="newFormItem" onInput={(e) => this.handleLoc(e)} />
                    Start Time:<DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={5}
                        dateFormat="LLL"
                        className="newFormItem"
                    />
                    End Time:<DatePicker
                        selected={this.state.endDate}
                        onChange={this.handleEnd}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={5}
                        dateFormat="LLL"
                        className="newFormItem"
                    />
                    <Input label='Notes' type="text" className="newFormItem" onInput={(e) => this.handleNote(e)} />
                    <Button onClick={(e) => this.onClick(e)}>Submit</Button>
                </form>
                <p className="newFormItem">Length {this.state.minDuration} minutes</p>
            </div>
        )
    }
}

export default NewActivity;