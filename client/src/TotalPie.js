import React, {Component} from 'react';
import axios from 'axios';
import {VictoryPie, VictoryTheme} from 'victory';

class TotalPie extends Component {
    constructor(props){
        super(props)
        this.state={
            acts: [],
            sleeping: 0,
            eating: 0,
            commute: 0,
            chores: 0,
            entert: 0,
            leisure: 0,
            adult: 0,
            product: 0,
            corresp: 0,
            self: 0,
            exercise: 0
        }
    }
    componentDidMount() {
        axios.post('/users/actLog', {
            user: this.props.user.id
        }).then(result => {
            this.setState({
                acts: result.data
            });
            for (var i = 0; i < result.data.length; i++) {
                var catDur = result.data[i].duration;
                switch (result.data[i].category) {
                    case "Sleeping":
                        this.setState(prevState => {
                            return { sleeping: prevState.sleeping + catDur }
                        })
                        break;
                    case "Eating":
                        this.setState(prevState => {
                            return { eating: prevState.eating + catDur }
                        })
                        break;
                    case "Commute/Travel":
                        this.setState(prevState => {
                            return { commute: prevState.commute + catDur }
                        })
                        break;
                    case "Chores":
                        this.setState(prevState => {
                            return { chores: prevState.chores + catDur }
                        })
                        break;
                    case "Entertainment":
                        this.setState(prevState => {
                            return { entert: prevState.entert + catDur }
                        })
                        break;
                    case "Leisure":
                        this.setState(prevState => {
                            return { leisure: prevState.leisure + catDur }
                        })
                        break;
                    case "Adulting":
                        this.setState(prevState => {
                            return { adult: prevState.adult + catDur }
                        })
                        break;
                    case "Productivity":
                        this.setState(prevState => {
                            return { product: prevState.product + catDur }
                        })
                        break;
                    case "Correspondence":
                        this.setState(prevState => {
                            return { corresp: prevState.corresp + catDur }
                        })
                        break;
                    case "Self-care":
                        this.setState(prevState => {
                            return { self: prevState.self + catDur }
                        })
                        break;
                    case "Exercise":
                        this.setState(prevState => {
                            return { exercise: prevState.exercise + catDur }
                        })
                        break;
                    default:
                        console.log(result.data[i])
                }
            }
            console.log(this.state)
        });

    }
    render(){
        return(
            <VictoryPie
                data={[
                    { x: "Sleeping", y: this.state.sleeping },
                    { x: "Exercise", y: this.state.exercise },
                    { x: "Correspondence", y: this.state.corresp },
                    { x: "Eating", y: this.state.eating },
                    { x: "Leisure", y: this.state.leisure },
                    { x: "Commute", y: this.state.commute },
                    { x: "Chores", y: this.state.chores},
                    { x: "Entertainment", y: this.state.entert},
                    { x: "Adulting", y: this.state.adult},
                    { x: "Productivity", y: this.state.product},
                    { x: "Self-care", y: this.state.self}                   
                ]}
                theme={VictoryTheme.material}
            />
        )
    }
}

export default TotalPie;