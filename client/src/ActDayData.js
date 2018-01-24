import React, {Component} from 'react';

import moment from 'moment';
import axios from 'axios';
import {VictoryBar, VictoryLabel} from 'victory';
import {Row, Col, Icon} from 'react-materialize';

class ActDayData extends Component {
    constructor(props) {
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

    componentWillReceiveProps(){
        this.setState({
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
        })
        axios.post('/users/dailyLog', {
            user: this.props.user.id,
            day: this.props.selected
        }).then(result => {
            this.setState({
                acts: result.data
            })
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
    render() {
        class Chart extends Component {
            render() {
                return (
                    <VictoryBar horizontal
                        data={[{ title: this.props.title, y: this.props.category }]}
                        style={{
                            data: { fill: this.props.color },
                            labels: { fill: (this.props.category > this.props.mid) ? "white" : this.props.color, fontSize: '6' }
                        }}
                        labels={(d) => `${parseInt((this.props.category / 60), 0)} hours ${this.props.category % 60} minutes`}
                        labelComponent={<VictoryLabel dx={(this.props.category > this.props.mid) ? -60 : 0} />}
                        y={(d) => (d.y)}
                        width={200}
                        height={10}
                        domain={{ x: [0, (this.props.max > this.props.category) ? this.props.max : this.props.category] }}
                        animate={{
                            duration: 2000,
                            onLoad: { duration: 1000 }
                        }}
                        padding={{ left: 0 }}

                    />
                )
            }
        }
        return(
            <div className='left full'>
                <p>
                    {this.props.user.name} - {moment(this.props.selected).format("MM/DD/YYYY")}
                </p>
                <Icon className='mauve'>computer</Icon>
                <VictoryLabel text=" Productivity" className="mauve" />
                <Chart props={this.state} category={this.state.product} color={"#b784a7"} title={"Productivity"} mid={200} max={600} />

                <Icon className="ltBlue">airline_seat_individual_suite</Icon>
                <VictoryLabel text=" Sleeping" className="ltBlue" />
                <Chart props={this.state} category={this.state.sleeping} color={"#ADD8E6"} title={"Sleeping"} mid={200} max={600} />

                <Icon className="neon">store</Icon>
                <VictoryLabel text=" Adulting" className="neon" />
                <Chart props={this.state} category={this.state.adult} color={"#83f52c"} title={"Adulting"} mid={200} max={600} />

                <Icon className="orng">devices</Icon>
                <VictoryLabel text=" Entertainment" className="orng" />
                <Chart props={this.state} category={this.state.entert} color={"#ff6600"} title={"Entertainment"} mid={200} max={600} />
                
                <Icon className='dkblue'>local_bar</Icon>
                <VictoryLabel text=" Leisure" className="dkblue" />
                <Chart props={this.state} category={this.state.leisure} color={"blue"} title={"Leisure"} mid={200} max={600} />
                
                <Icon className='grn'>local_dining</Icon>
                <VictoryLabel text=" Eating" className="grn" />
                <Chart props={this.state} category={this.state.eating} color={"#61a661"} title={"Eating"} mid={100} max={200} />
                
                <Icon className="yllw">drive_eta</Icon>
                <VictoryLabel text=" Commute/Travel" className="yllw" />
                <Chart props={this.state} category={this.state.commute} color={"#ffd700"} title={"Commute"} mid={100} max={200} />
                
                <Icon className="pnk">home</Icon>
                <VictoryLabel text=" Chores" className="pnk" />
                <Chart props={this.state} category={this.state.chores} color={"#ff0099"} title={"Chores"} mid={100} max={200} />
                
                <Icon className="ltBrown">mode_edit</Icon>
                <VictoryLabel text=" Correspondence" className="ltBrown" />
                <Chart props={this.state} category={this.state.corresp} color={"#f4a460"} title={"Correspondence"} mid={100} max={200} />
                
                <Icon className="rd">wc</Icon>
                <VictoryLabel text=" Self-Care" className="rd" />
                <Chart props={this.state} category={this.state.self} color={"#ff3c3d"} title={"Self-Care"} mid={100} max={200} />
                
                <Icon className="purp">directions_run</Icon>
                <VictoryLabel text=" Exercise" className="purp" />
                <Chart props={this.state} category={this.state.exercise} color={"#6e0dd0"} title={"Exercise"} mid={100} max={200} />
                
            </div>
        )
    }
}

export default ActDayData;