import React, {Component} from 'react';
import CatData from './CatData';
import axios from 'axios';
import moment from 'moment';
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
            redirect: this.props.redirect
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }
    componentDidMount(){
        axios.post('/users/actLog', {
            user: this.props.user.id
        }).then(result =>{
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
    render(){
        let mappedActs = this.state.acts.map((item, index) => (
            <tr key={index}>
                <td><a onClick={this.handleRedirect}>{moment(item.day).format('MM-DD-YYYY')}</a></td>
                <td>{moment(item.start).format('HH:mm')}</td>
                <td>{moment(item.finish).format('HH:mm')}</td>
                <td>{item.duration} minutes</td>
                <td><button onClick={(e) => this.handleRedirect(e)} value={item.category}>{item.category}</button></td>
                <td>{item.subCategory}</td>
                <td>{item.location}</td>
                <td>{item.notes}</td>
            </tr>
        ));
        if (this.state.redirect) {
            return (
                <CatData user={this.props.user} category={this.state.category} />
            )
        } else {
            return (
                <div>
                    The Activity Log for <span className="bold">{this.props.user.name}</span>  will be here
                    <table>
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

                </div>
            )
        }
    }
}

export default ActivityLog;