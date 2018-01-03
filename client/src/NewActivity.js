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
        this.handleSubCat = this.handleSubCat.bind(this)
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
        console.log('SUBCAT CHANGED')
        console.log(e.target.value)
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
        var conditionalSub;
        switch (this.state.category) {
            case "Sleeping":
                conditionalSub = (
                    <Input label='Sub-Category' type="select" className="newFormItem" value={this.state.subCat} onChange={this.handleSubCat}>
                        <option onChange={this.handleSubCat} value='Bed'>Bed</option>
                        <option value='Nap'>Nap</option>
                    </Input>
                )
                break;
            case "Eating":
                conditionalSub = (
                    <Input label='Sub-Category' type="select" className="newFormItem" value={this.state.subCat} onChange={this.handleSubCat} >
                        <option value='Cooking'>Cooked at Home</option>
                        <option value='Eating Out'>Eating Out</option>
                        <option value="Snacking">Snacking</option>
                    </Input>
                )
                break;
            case "Commute/Travel":
                conditionalSub = (
                    <Input label='Sub-Category' type="select" className="newFormItem" value={this.state.subCat} onChange={this.handleSubCat} >
                        <option value='Bus'>Bus</option>
                        <option value='Walking'>Walking</option>
                        <option value="Driving">Driving</option>
                        <option value="Flight">Flight</option>
                    </Input>
                )
                break;
            case "Chores":
                conditionalSub = (
                    <Input label='Sub-Category' type="select" className="newFormItem" onInput={(e) => this.handleSubCat(e)}>
                        <option value='Cleaning'>Cleaning</option>
                        <option value='Laundry'>Laundry</option>
                        <option value="Yard">Yard Work</option>
                    </Input>
                )
                break;
            case "Entertainment":
                conditionalSub = (
                    <Input label='Sub-Category' type="select" className="newFormItem" onInput={(e) => this.handleSubCat(e)}>
                        <option value='Internet'>Internet</option>
                        <option value='TV'>TV</option>
                        <option value="Sports">Sports</option>
                        <option value="Movie">Movie</option>
                        <option value="Video Games">Video Games</option>
                    </Input>
                )
                break;
            case "Leisure":
                conditionalSub = (
                    <Input label='Sub-Category' type="select" className="newFormItem" onChange={(e) => this.handleSubCat(e)}>
                        <option value='Drinking'>Drinking</option>
                        <option value='Magic'>MTG</option>
                        <option value="Hanging Out">Hanging Out</option>
                        <option value="Games">Board Games</option>
                    </Input>
                )
                break;
            case "Adulting":
                conditionalSub = (
                    <Input label='Sub-Category' type="select" className="newFormItem" onInput={(e) => this.handleSubCat(e)}>
                        <option value='Paying Bills'>Paying Bills</option>
                        <option value='Health Care'>Health Care</option>
                        <option value="Work">Work</option>
                        <option value="General Apt">General Appointment</option>
                    </Input>
                )
                break;
            case "Productivity":
                conditionalSub = (
                    <Input label='Sub-Category' type="select" className="newFormItem" onInput={(e) => this.handleSubCat(e)}>
                        <option value='Coding'>Coding</option>
                        <option value='Learning'>Learning</option>
                        <option value="Skill Building">Skill Building</option>
                        <option value="Job Applications">Job Apps</option>
                        <option value="Networking">Networking</option>
                    </Input>
                )
                break;
            case "Correspondence":
                conditionalSub = (
                    <Input label='Sub-Category' type="select" defaultValue='Bed' className="newFormItem" onInput={(e) => this.handleSubCat(e)}>
                        <option value='Bed'>Bed</option>
                        <option value='Nap'>Nap</option>
                    </Input>
                )
                break;
            default: 
                conditionalSub = (
                    <Input label="Sub-Category" type="text" className="newFormItem" value={this.state.subCat} onChange={this.handleSubCat} />
                )
        }
        // if (this.state.category === "Sleeping"){
        //     var conditionalSub = (
        //         <Input label='Sub-Category' type="select" className="newFormItem" onInput={(e) => this.handleSubCat(e)}>
        //             <option value='Bed'>Bed</option>
        //             <option value='Nap'>Nap</option>
        //         </Input>
        //     )
        // } else {
        //     var conditionalSub = (
        //         <Input label="Sub-Category" type="text" className="newFormItem" onInput={(e) => this.handleSubCat(e)} />
        //     )
        // }
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
                            <Input label='Category' type="select" className="newFormItem" onChange={(e) => this.handleCat(e)}>
                                <option value='Sleeping'>Sleep</option>
                                <option value='Eating'>Eating</option>
                                <option value='Commute/Travel'>Commute/Travel</option>
                                <option value="Chores">Chores</option>
                                <option value="Self-care">Self-care</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Exercise">Exercise</option>
                                <option value="Leisure">Leisure</option>
                                <option value="Adulting">Adulting</option>
                                <option value="Productivity">Productivity</option>
                                <option value="Correspondence">Correspondence</option>
                            </Input>
                        </Col>
                        <Col s={12} m={4} >
                            {conditionalSub}
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