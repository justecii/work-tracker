import React, {Component} from 'react';
import CatData from './CatData';
import TotalPie from './TotalPie';
import DayData from './DayData';
import NewActivity from './NewActivity';
import axios from 'axios';
import moment from 'moment';
import {Tabs, Tab, Button} from 'react-materialize';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect
} from 'react-router-dom';

class ActivityLog extends Component {
    constructor(props){
        super(props)
        this.state={
            acts: [],
            category: "",
            about: true,
            redirect: this.props.redirect
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
        this.handleInfo = this.handleInfo.bind(this);
    }
    componentDidMount(){
        axios.post('/users/actLog', {
            user: this.props.user.id
        }).then(result =>{
            // sorts data by time of occurence, regardless of when input
            var sorted = result.data
            sorted.sort(function(a, b){
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
        
    }
    handleRedirect(e){
        var cat = e.target.value
        this.setState({
            redirect: true,
            category: cat
        })
    }
    handleInfo(e){
        e.preventDefault();
        console.log(this.state)
        this.setState({
            about: false
        })
    }
    render(){
        let mappedActs = this.state.acts.map((item, index) => (
            <tr key={index}>
                <td><a onClick={this.handleRedirect}>{moment(item.day).format('MM-DD-YYYY')}</a></td>
                <td>{moment(item.start).format('HH:mm')}</td>
                <td>{moment(item.finish).format('HH:mm')}</td>
                <td>{item.duration} minutes</td>
                <td><Button onClick={(e) => this.handleRedirect(e)} value={item.category} className="full ltBlue white">{item.category}</Button></td>
                <td>{item.subCategory}</td>
                <td>{item.location}</td>
                <td>{item.notes}</td>
            </tr>
        ));
        let aboutInfo;
        if (this.state.about) {
           aboutInfo = (
               <div className="yllw">WORDS GO HERE</div>
           )
        } else {
            aboutInfo =(
                <div></div>
            )
        }
        if (this.state.redirect) {
            return (
                <CatData user={this.props.user} category={this.state.category} />
            )
        } else {
            return (
                <div>
                    {/* The Activity Log for <span className="bold">{this.props.user.name}</span>  will be here */}
                    
                    <Tabs className='tab-demo z-depth-1' >
                        <Tab title="New Activity">
                            <NewActivity user={this.props.user} />
                        </Tab>
                        <Tab title="Log">
                            <table className="ltBlue">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Start</th>
                                        <th>End</th>
                                        <th>Duration</th>
                                        <th>Category</th>
                                        <th>Sub-Category</th>
                                        <th>Location</th>
                                        <th>Notes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mappedActs}
                                </tbody>
                            </table>
                        </Tab>
                        <Tab title="Total">
                            <TotalPie user={this.props.user} />
                        </Tab>
                        <Tab title="Day Tracker" onClick={this.handleInfo} >
                            <DayData user={this.props.user} acts={this.state.acts} onClick={this.handleInfo} />
                        </Tab>
                    </Tabs>
                    {aboutInfo}
                </div>
            )
        }
    }
}

export default ActivityLog;