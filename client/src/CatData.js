import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';
import {Button } from 'react-materialize';
import {VictoryChart, VictoryAxis, VictoryBar, VictoryTheme, VictoryStack} from 'victory';

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
        
        return(
            <div>
                <h3>{this.props.category} - {this.props.user.name}</h3>
                <h5>{totalDur} Total minutes spent</h5><Button>Back</Button>
                <VictoryChart domainPadding={20} theme={VictoryTheme.material} style={{ parent: { maxWidth: "60%" } }} >
                    <VictoryAxis 
                        tickFormat={this.state.dateDataPoint}
                        style={{ tickLabels: { fontSize: 8, padding: 20, angle: 45 } }}
                    />
                    <VictoryAxis 
                        dependentAxis
                        label="Time (min)"
                        style={{tickLabels: {fontSize: 10, padding: 25}}}
                    />
                    <VictoryBar
                        style={{ data: { fill: "red" }}}
                        data={this.state.catData}
                        x="start"
                        y="duration" 
                    />
                </VictoryChart>
            </div>
        )
    }
}

export default CatData;