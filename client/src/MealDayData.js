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
                        calories: parseInt(prevState.calories) + parseInt(result.data[i].calories),
                        protein: parseInt(prevState.protein) + parseInt(result.data[i].protein),
                        fat: prevState.fat + result.data[i].fat,
                        carbs: prevState.carbs + result.data[i].carbs,
                        sugar: parseInt(prevState.sugar) + parseInt(result.data[i].sugar)
                    } 
                })
                console.log(this.state.carbs)
            }
        })
    }

    render(){
        return (
            <div>
                <Icon className='grn'>restaurant_menu</Icon>
                <VictoryLabel text=" Calories" className="grn" />
                <VictoryBar horizontal
                    data={[{ title: "Calories", y: this.state.calories }]}
                    style={{
                        data: { fill: "#61a661" },
                        labels: { fill: (this.state.calories > 1300) ? "white" : "#61a661", fontSize: '6' }
                    }}
                    labels={(d) => `${this.state.calories} Calories`}
                    labelComponent={<VictoryLabel dx={(this.state.calories > 1300) ? -60 : 0} />}
                    y={(d) => (d.y)}
                    width={200}
                    height={10}
                    domain={{ x: [0, 2000] }}
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                    padding={{ left: 0 }}
                />
                <p className="grn">{((this.state.calories)/2000 *100).toFixed(1)} % DV</p>

                <Icon className="orng">redeem</Icon>
                <VictoryLabel text=" Carbohydrates" className="orng" />
                <VictoryBar horizontal
                    data={[{ title: "Calories", y: this.state.carbs }]}
                    style={{
                        data: { fill: "#ff6600" },
                        labels: { fill: (this.state.carbs > 200) ? "white" : "#ff6600", fontSize: '6' }
                    }}
                    labels={(d) => `${this.state.carbs}g Carbs`}
                    labelComponent={<VictoryLabel dx={(this.state.carbs > 200) ? -60 : 0} />}
                    y={(d) => (d.y)}
                    width={200}
                    height={10}
                    domain={{ x: [0, 300] }}
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                    padding={{ left: 0 }}
                />
                <p className="orng">{((this.state.carbs)/300 *100).toFixed(1)} % DV</p>

                <Icon className="purp">pregnant_woman</Icon>
                <VictoryLabel text=" Fats" className="purp" />
                <VictoryBar horizontal
                    data={[{ title: "Fats", y: this.state.fat }]}
                    style={{
                        data: { fill: "#6e0dd0" },
                        labels: { fill: (this.state.fat > 40) ? "white" : "#6e0dd0", fontSize: '6' }
                    }}
                    labels={(d) => `${this.state.fat}g Fat`}
                    labelComponent={<VictoryLabel dx={(this.state.fat > 40) ? -60 : 0} />}
                    y={(d) => (d.y)}
                    width={200}
                    height={10}
                    domain={{ x: [0, (this.state.fat >65) ? this.state.fat : 65] }}
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                    padding={{ left: 0 }}
                />
                <p className="purp">{((this.state.fat)/65*100).toFixed(1)} % DV</p>

                <Icon className="rd">fitness_center</Icon>
                <VictoryLabel text=" Protein" className="rd" />
                <VictoryBar horizontal
                    data={[{ title: "Protein", y: this.state.protein }]}
                    style={{
                        data: { fill: "#ff3c3d" },
                        labels: { fill: (this.state.protein > 30) ? "white" : "#ff3c3d", fontSize: '6' }
                    }}
                    labels={(d) => `${this.state.protein}g Protein`}
                    labelComponent={<VictoryLabel dx={(this.state.protein > 30) ? -60 : 0} />}
                    y={(d) => (d.y)}
                    width={200}
                    height={10}
                    domain={{ x: [0, 50] }}
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                    padding={{ left: 0 }}
                />
                <p className="rd">{((this.state.protein)/50 *100).toFixed(1)} % DV</p>

                <Icon className="yllw">ev_station</Icon>
                <VictoryLabel text=" Sugar" className="yllw" />
                <VictoryBar horizontal
                    data={[{ title: "Sugar", y: this.state.sugar }]}
                    style={{
                        data: { fill: "#ffd700" },
                        labels: { fill: (this.state.sugar > 30) ? "white" : "#ffd700", fontSize: '6' }
                    }}
                    labels={(d) => `${this.state.sugar}g Sugar`}
                    labelComponent={<VictoryLabel dx={(this.state.sugar > 30) ? -60 : 0} />}
                    y={(d) => (d.y)}
                    width={200}
                    height={10}
                    domain={{ x: [0, 50] }}
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                    padding={{ left: 0 }}
                />
                <p className="yllw">{((this.state.sugar)/50*100).toFixed(1)} % DV</p>
                
                
                
                
            </div>
        )
    }
}

export default MealDayData;