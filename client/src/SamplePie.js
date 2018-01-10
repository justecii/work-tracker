import React, {Component} from 'react';

import moment from 'moment';
import axios from 'axios';
import {VictoryBar, VictoryLabel} from 'victory';

class SamplePie extends Component {
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
        this.onClick = this.onClick.bind(this)
    }
    onClick(e){
        e.preventDefault();
        console.log(this.state)
        console.log(this.props)
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
        return(
            <div className='left full'>
                <div className="white">
                    {this.props.user.name} - {moment(this.props.selected).format("MM/DD/YYYY")}
                </div>
                <VictoryLabel text="Productivity" className="mauve" />
                <VictoryBar horizontal
                    data={[{ title: "Productivity", y: this.state.product}]}
                    style={{
                        data: { fill: "#b784a7" },
                        labels: { fill: (this.state.product > 200) ? "white" : "#b784a7", fontSize: '6' }
                    }}
                    labels={(d) => `${parseInt((this.state.product / 60), 0)} hours ${this.state.product % 60} minutes`}
                    labelComponent={<VictoryLabel dx={(this.state.product > 200) ? -60 : 0} />}
                    y={(d) => (d.y)}
                    width={200}
                    height={10}
                    domain={{ x: [0, 600] }}
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                    padding={{ left: 0 }}
                />
                <VictoryLabel text="Sleeping" className="ltBlue" />
                <VictoryBar horizontal
                    data={[{ title: "Sleeping", y: this.state.sleeping }]}
                    style={{
                        data: { fill: "#ADD8E6" },
                        labels: { fill: (this.state.sleeping > 200) ? "white" : "#ADD8E6", fontSize: '6'}
                    }}
                    labels={(d) => `${parseInt((this.state.sleeping/60),0)} hours ${this.state.sleeping%60} minutes`}
                    labelComponent={<VictoryLabel dx={(this.state.sleeping > 200) ? -60 : 0} />}
                    y={(d) => (d.y)}
                    width={200}
                    height={10}
                    domain={{ x: [0, 600] }}
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                    padding={{left: 0}}
                />
                <VictoryLabel text="Adulting" className="neon" />
                <VictoryBar horizontal
                    data={[{ title: "Adulting", y: this.state.adult }]}
                    style={{
                        data: { fill: "#83f52c" },
                        labels: { fill: (this.state.adult > 200) ? "white" : "#83f52c", fontSize: '6' }
                    }}
                    labels={(d) => `${parseInt((this.state.adult / 60), 0)} hours ${this.state.adult % 60} minutes`}
                    labelComponent={<VictoryLabel dx={(this.state.adult > 200) ? -60 : 0} />}
                    y={(d) => (d.y)}
                    width={200}
                    height={10}
                    domain={{ x: [0, 600] }}
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                    padding={{ left: 0 }}
                />
                <VictoryLabel text="Entertainment" className="orng" />
                <VictoryBar horizontal
                    data={[
                        { title: "Entertainment", y: this.state.entert}
                    ]}
                    style={{
                        data: { fill: "#ff6600" },
                        labels: { fill: (this.state.entert > 200) ? "white" : "#ff6600", fontSize: '6' }
                    }}
                    labels={(d) => `${parseInt((this.state.entert / 60), 0)} hours ${this.state.entert % 60} minutes`}
                    labelComponent={<VictoryLabel dx={(this.state.entert > 200) ? -60 : 0} />}
                    y={(d) => (d.y)}
                    width={200}
                    height={10}
                    domain={{ x: [0, 600] }}
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                    padding={{ left: 0 }}
                />
                <VictoryLabel text="Leisure" className="dkblue" />
                <VictoryBar horizontal
                    data={[{ title: "Leisure", y: this.state.leisure }]}
                    style={{
                        data: { fill: "blue" },
                        labels: { fill: (this.state.leisure > 200) ? "white" : "blue", fontSize: '6' }
                    }}
                    labels={(d) => `${parseInt((this.state.leisure / 60), 0)} hours ${this.state.leisure % 60} minutes`}
                    labelComponent={<VictoryLabel dx={(this.state.leisure > 200) ? -60 : 0} />}
                    y={(d) => (d.y)}
                    width={200}
                    height={10}
                    domain={{ x: [0, 600] }}
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                    padding={{ left: 0 }}
                />
                
                <VictoryLabel text="Eating" className="grn" />
                <VictoryBar horizontal
                    data={[{ title: "Eating", y: this.state.eating}]}
                    style={{
                        data: { fill: "#61a661" },
                        labels: { fill: (this.state.eating > 100) ? "white" : "#61a661", fontSize: '6' }
                    }}
                    labels={(d) => `${parseInt((this.state.eating / 60),0)} hours ${this.state.eating % 60} minutes`}
                    labelComponent={<VictoryLabel dx={(this.state.eating > 100) ? -60 : 0} />}
                    y={(d) => (d.y)}
                    width={200}
                    height={10}
                    domain={{ x: [0, 200] }}
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                    padding={{ left: 0 }}
                />
                <VictoryLabel text="Commute/Travel" className="yllw" />
                <VictoryBar horizontal
                    data={[{ title: "Commute", y: this.state.commute}]}
                    style={{
                        data: { fill: "#ffd700" },
                        labels: { fill: (this.state.commute > 100) ? "white" : "#ffd700", fontSize: '6' }
                    }}
                    labels={(d) => `${parseInt((this.state.commute / 60),0)} hours ${this.state.commute % 60} minutes`}
                    labelComponent={<VictoryLabel dx={(this.state.commute > 100) ? -60 : 0} />}
                    y={(d) => (d.y)}
                    width={200}
                    height={10}
                    domain={{ x: [0, 200] }}
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                    padding={{ left: 0 }}
                />
                <VictoryLabel text="Chores" className="pnk" />
                <VictoryBar horizontal
                    data={[{ title: "Chores", y: this.state.chores }]}
                    style={{
                        data: { fill: "#ff0099" },
                        labels: { fill: (this.state.chores > 100) ? "white" : "#ff0099", fontSize: '6' }
                    }}
                    labels={(d) => `${parseInt((this.state.chores / 60),0)} hours ${this.state.chores % 60} minutes`}
                    labelComponent={<VictoryLabel dx={(this.state.chores > 100) ? -60 : 0} />}
                    y={(d) => (d.y)}
                    width={200}
                    height={10}
                    domain={{ x: [0, 200] }}
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                    padding={{ left: 0 }}
                />
                
                
                <VictoryLabel text="Correspondence" className="ltBrown" />
                <VictoryBar horizontal
                    data={[
                        { title: "Correspondence", y: this.state.corresp }
                    ]}
                    style={{
                        data: { fill: "#f4a460" },
                        labels: { fill: (this.state.corresp > 100) ? "white" : "#f4a460", fontSize: '6' }
                    }}
                    labels={(d) => `${parseInt((this.state.corresp / 60),0)} hours ${this.state.corresp % 60} minutes`}
                    labelComponent={<VictoryLabel dx={(this.state.corresp > 100) ? -60 : 0} />}
                    y={(d) => (d.y)}
                    width={200}
                    height={10}
                    domain={{ x: [0, 200] }}
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                    padding={{ left: 0 }}
                />
                <VictoryLabel text="Self-Care" className="rd" />
                <VictoryBar horizontal
                    data={[
                        { title: "Self-Care", y: this.state.self}
                    ]}
                    style={{
                        data: { fill: "#ff3c3d" },
                        labels: { fill: (this.state.self > 100) ? "white" : "#ff3c3d", fontSize: '6' }
                    }}
                    labels={(d) => `${parseInt((this.state.self / 60),0)} hours ${this.state.self % 60} minutes`}
                    labelComponent={<VictoryLabel dx={(this.state.self > 100) ? -60 : 0} />}
                    y={(d) => (d.y)}
                    width={200}
                    height={10}
                    domain={{ x: [0, 200] }}
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                    padding={{ left: 0 }}
                />
                <VictoryLabel text="Exercise" className="purp" />
                <VictoryBar horizontal
                    data={[
                        { title: "Exercise", y: this.state.exercise}
                    ]}
                    style={{
                        data: { fill: "#6e0dd0" },
                        labels: { fill: (this.state.exercise > 100) ? "white" : "#6e0dd0", fontSize: '6' }
                    }}
                    labels={(d) => `${parseInt((this.state.exercise / 60),0)} hours ${this.state.exercise % 60} minutes`}
                    labelComponent={<VictoryLabel dx={(this.state.exercise > 100) ? -60 : 0} />}
                    y={(d) => (d.y)}
                    width={200}
                    height={10}
                    domain={{ x: [0, 200] }}
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                    padding={{ left: 0 }}
                />
            </div>
        )
    }
}

export default SamplePie;