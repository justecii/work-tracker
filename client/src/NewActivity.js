import React, {Component} from 'react';
import { Input, Button, Row, Col } from 'react-materialize';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from 'axios';

import 'react-datepicker/dist/react-datepicker.css';

class NewActivity extends Component{
    constructor(props) {
        super(props)
        this.state = {
            startDate: moment(),
            endDate: moment(),
            minDuration: 0,
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
        // var d = moment.duration(ms);
        // var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm");
        var actDate = moment(startTime).format("MM-DD-YYYY")
        var minDur = Math.floor(ms / 60000)
        if (minDur > 0) {
            this.setState({
                minDuration: minDur
            })
            axios.post('/activity/new', {
                day: actDate,
                start: startTime,
                finish: finishTime,
                duration: minDur,
                category: this.state.category,
                subCategory: this.state.subCat,
                notes: this.state.addNotes,
                location: this.state.location,
                user: this.props.user.id
            })
        } else {
            console.log("Enter a Valid Time")
        }
    }

    render(){
        return(
            <div>
                <form>
                    <Row>
                        <Col s={12} m={6} >
                            Start Time:<DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={5}
                                dateFormat="LLL"
                                className="newFormItem"
                            />
                        </Col>
                        <Col s={12} m={6} >
                            End Time:<DatePicker
                                selected={this.state.endDate}
                                onChange={this.handleEnd}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={5}
                                dateFormat="LLL"
                                className="newFormItem"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col s={12} m={4} >
                            <Input label='Category' type="text" className="newFormItem" onInput={(e) => this.handleCat(e)} />
                        </Col>
                        <Col s={12} m={4} >
                            <Input label="Sub-Category" type="text" className="newFormItem" onInput={(e) => this.handleSubCat(e)} />
                        </Col>
                        <Col s={12} m={4} >
                            <Input label='Location' type="text" className="newFormItem" onInput={(e) => this.handleLoc(e)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col s={12} m={8} >
                            <Input label='Notes' type="text" className="newFormItem fullWidth" onInput={(e) => this.handleNote(e)} />
                        </Col>
                        <Col s={12} m={4} >
                            <Button onClick={(e) => this.onClick(e)}>Submit</Button>
                        </Col>
                    </Row>
                </form>
                <p className="newFormItem">Length {this.state.minDuration} minutes</p>
            </div>
        )
    }
}

export default NewActivity;