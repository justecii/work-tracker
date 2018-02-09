/*jshint loopfunc:true */
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
        });

    }
    render(){
        return(
            <VictoryPie
                colorScale={["#61a661", "#b784a7", "#ff3c3d", "#ADD8E6", "#ff0099", "#83f52c", 
                    "#f4a460", "blue", "#ffd700", "#ff6600", "#6e0dd0"
                ]}
                data={[
                    { x: "Eating", y: this.state.eating },
                    { x: "Productivity", y: this.state.product },
                    { x: "Self-care", y: this.state.self },
                    { x: "Sleeping", y: this.state.sleeping },
                    { x: "Chores", y: this.state.chores },
                    { x: "Adulting", y: this.state.adult },
                    { x: "Correspondence", y: this.state.corresp },
                    { x: "Leisure", y: this.state.leisure },
                    { x: "Commute", y: this.state.commute },
                    { x: "Entertainment", y: this.state.entert },
                    { x: "Exercise", y: this.state.exercise }                  
                ]}
                theme={VictoryTheme.material}
                style={{ labels: { fontSize: 6, fill: "#ADD8E6"}}}
                innerRadius={0}
                labelRadius={130}
                events={[{
                    target: "data",
                    eventHandlers: {
                        onMouseEnter: () => {
                            return [
                                {
                                    target: "data",
                                    mutation: (props) => {
                                        const fill = props.style && props.style.fill;
                                        const stroke = props.style.stroke;
                                        active: true;
                                        return { style: { fill: "white", stroke: "#000" }};
                                    }
                                }, {
                                    target: "labels",
                                    mutation: (props) => {
                                        active: true;
                                        {/* display percentage - convert radians to percentage */}
                                        return props.angle === 1 ? null : { text: (props.datum.xName) + "  -  "  + ((props.slice.endAngle-props.slice.startAngle)*15.916).toFixed(1)+ "%", angle: 1};
                                    }
                                }
                            ];
                        },
                        onMouseOut: () => {
                            return [
                                {
                                    target: "data",
                                    mutation: (props) => {
                                        active: false
                                    } 
                                }, {
                                    target: "labels",
                                    mutation: (props) => {
                                        active: false
                                    }
                                }
                            ]
                        },
                        onClick: (e) => {
                            return [
                                {
                                    target: "data",
                                    mutation: (props) => {
                                        console.log(props)
                                        this.setState({
                                            test: props.datum.xName
                                        })
                                        console.log(this.state.test)
                                    }
                                }
                            ]
                        }
                    }
                }]}
            />
        )
    }
}

export default TotalPie;