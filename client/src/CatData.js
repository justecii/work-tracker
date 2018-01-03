import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';
import {Button} from 'react-materialize';

class CatData extends Component {
    constructor(props){
        super(props)
        this.state={
            catData: []
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }
    componentDidMount(){
        axios.post('/activity/category', {
            user: this.props.user,
            category: this.props.category
        }).then(result =>{
            this.setState({
                catData: result.data
            })
            console.log(this.state.catData)
            console.log(this.state.catData[0].duration)
        });
        
    }
    render(){
        let mappedData = this.state.catData.map((index, item) => (
            <tr key={index}>
                <td>{moment(item.day).format('MM-DD-YYYY')}</td>
                <td>{moment(item.start).format('HH:mm')}</td>
                <td>{moment(item.finish).format('HH:mm')}</td>
                <td>{item.duration}</td>
            </tr>
        ))
        return(
            <div>
                <h1>{this.props.category} - {this.props.user.name}</h1>
                {mappedData}
            </div>
        )
    }
}

export default CatData;