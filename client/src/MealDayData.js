/*jshint loopfunc: true */
import React, {Component} from 'react';
import axios from 'axios';
import { VictoryBar, VictoryLabel } from 'victory';
import { Row, Col, Icon } from 'react-materialize';

class MealDayData extends Component {
    constructor(props){
        super(props)
        this.state={
            calories: 0,
            carbs: 0,
            fat: 0,
            protein: 0,
            sugar: 0,
            meals: []
        }
    }

    componentWillReceiveProps() {
        this.setState({
            calories: 0,
            carbs: 0,
            fat: 0,
            protein: 0,
            sugar: 0

        })
        axios.post('/meal/dailyLog', {
            user: this.props.user.id,
            day: this.props.selected
        }).then(result => {
            this.setState({
                meals: result.data
            })
            console.table(result.data)
            for (var i = 0; i < result.data.length; i++){
                this.setState(prevState => {
                    return {
                        calories: parseInt(prevState.calories, 0) + parseInt(result.data[i].calories, 0),
                        protein: parseInt(prevState.protein, 0) + parseInt(result.data[i].protein, 0),
                        fat: prevState.fat + result.data[i].fat,
                        carbs: prevState.carbs + result.data[i].carbs,
                        sugar: parseInt(prevState.sugar, 0) + parseInt(result.data[i].sugar, 0)
                    } 
                })
                console.log(this.state.carbs)
            }
        })
    }
    

    render(){
        class Chart extends Component {
            render(){
                // if (this.props.category > this.props.max){
                //     alert("You exceeded your Daily Recommended Value for " + this.props.title)
                // }
                return (
                    <VictoryBar horizontal
                        data={[{ title: this.props.title, y: this.props.category }]}
                        style={{
                            data: { fill: this.props.color },
                            labels: { fill: (this.props.category > this.props.mid) ? "white" : this.props.color, fontSize: '6' }
                        }}
                        labels={(d) => `${this.props.category}${this.props.unit} ${this.props.title}`}
                        labelComponent={<VictoryLabel dx={(this.props.category > this.props.mid) ? -60 : 0} />}
                        y={(d) => (d.y)}
                        width={200}
                        height={10}
                        domain={{ x: [0, (this.props.max > this.props.category) ? this.props.max: this.props.category] }}
                        animate={{
                            duration: 2000,
                            onLoad: { duration: 1000 }
                        }}
                        padding={{ left: 0 }}
                        
                    />
                )
            }   
        }
        return (
            <div>
                <Icon className='grn'>restaurant_menu</Icon>
                <VictoryLabel text="Calories" className="grn" />
                <Chart props={this.state} category={this.state.calories} color={"#61a661"} title={"Calories"} mid={1300} max={2000} unit={""} />
                <p className="grn">{((this.state.calories)/2000 *100).toFixed(1)} % DV</p>

                <Icon className="orng">redeem</Icon>
                <VictoryLabel text=" Carbohydrates" className="orng" />
                <Chart props={this.state} category={this.state.carbs} color={"#ff6600"} title={"Carbohydrates"} mid={200} max={300} unit={"g"} />
                <p className="orng">{((this.state.carbs)/300 *100).toFixed(1)} % DV</p>

                <Icon className="purp">pregnant_woman</Icon>
                <VictoryLabel text=" Fats" className="purp" />
                <Chart props={this.state} category={this.state.fat} color={"#6e0dd0"} title={"Fat"} mid={40} max={65} unit={"g"} />
                <p className="purp">{((this.state.fat)/65*100).toFixed(1)} % DV</p>

                <Icon className="rd">fitness_center</Icon>
                <VictoryLabel text=" Protein" className="rd" />
                <Chart props={this.state} category={this.state.protein} color={"#ff3c3d"} title={"Protein"} mid={30} max={50} unit={"g"} />
                <p className="rd">{((this.state.protein)/50 *100).toFixed(1)} % DV</p>

                <Icon className="yllw">ev_station</Icon>
                <VictoryLabel text=" Sugar" className="yllw" />
                <Chart props={this.state} category={this.state.sugar} color={"#ffd700"} title={"Sugar"} mid={30} max={50} unit={"g"} />
                <p className="yllw">{((this.state.sugar)/50*100).toFixed(1)} % DV</p>
                
                
                
                
            </div>
        )
    }
}

export default MealDayData;