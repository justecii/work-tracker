import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';
import {Button } from 'react-materialize';


const styles ={
    width: 500,
    height: 300,
    padding: 30
}

class CatData extends Component {
    constructor(props){
        super(props)
        this.state={
            catData: [],
            durDataPoint: [],
            dateDataPoint: [],
            data: {}
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
            for (var i = 0; i< this.state.catData.length; i++) {
                var addDur = this.state.catData[i].duration;
                var addDate = moment(this.state.catData[i].day).format('MM/DD/YYYY');
                this.setState({
                    durDataPoint: [...this.state.durDataPoint, addDur],
                    dateDataPoint: [...this.state.dateDataPoint, addDate],
                    data: [ ...this.state.data, {"day": addDate, "duration": addDur }]
                })
            }
        });
    }

    
    render(){
        var totalDur = parseFloat(this.state.durDataPoint.reduce(function(a,b){
            return a +b;
        }, 0));
        
        var mappedDur = this.state.durDataPoint.map((item, index) =>(
            <rect key={index} x={index *100} y="0" width="100" height={item}></rect>
            
        ))
        return(
            <div>
                <h1>{this.props.category} - {this.props.user.name}</h1>
                {totalDur} Total minutes spent
                <svg height='500' width='500'>
                    {mappedDur}
                </svg>
                <Button>Back</Button>
            </div>
        )
    }
}

export default CatData;