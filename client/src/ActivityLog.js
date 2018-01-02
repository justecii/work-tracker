import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';

class ActivityLog extends Component {
    constructor(props){
        super(props)
        this.state={
            acts: []
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }
    componentDidMount(){
        // console.log(this.props);
        // console.log(this.state);
        console.log(this.props.user.id)
        axios.post('/users/actLog', {
            user: this.props.user.id
        }).then(result =>{
            this.setState({
                acts: result.data
            })
            console.log(this.state.acts)
        })
    }
    render(){
        let mappedActs = this.state.acts.map((item, index) => (
            <tr key={index}>
                <td>{moment(item.day).format('MM-DD-YYYY')}</td>
                <td>{moment(item.start).format('HH:mm')}</td>
                <td>{moment(item.finish).format('HH:mm')}</td>
                <td>{item.duration} minutes</td>
                <td>{item.category}</td>
                <td>{item.subCategory}</td>
                <td>{item.location}</td>
                <td>{item.notes}</td>
            </tr>
        ))
        return(
            <div>
                The Activity Log for <span className="bold">{this.props.user.name}</span>  will be here
                <table>
                    <thead>
                        <th>Date</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Duration</th>
                        <th>Category</th>
                        <th>Sub-Category</th>
                        <th>Location</th>
                        <th>Notes</th>
                    </thead>
                    <tbody>
                        {mappedActs}
                    </tbody>
                </table>
                
            </div>
        )
    }
}

export default ActivityLog;