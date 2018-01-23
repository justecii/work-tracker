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
                        calories: prevState.calories + result.data[i].calories,
                        protein: prevState.protein + result.data[i].protein,
                        fat: prevState.fat + result.data[i].fat,
                        carbs: prevState.carbs + result.data[i].carbs,
                        sugar: prevState.sugar + result.data[i].sugar
                    } 
                })
                console.log(this.state.calories)
            }
        })
    }

    render(){
        return (
            <div>
                <Icon className='grn'>restaurant_menu</Icon>
                <VictoryLabel text=" Calories" className="grn" />
                <p>{this.state.calories} calories</p>
                <Icon className="orng">redeem</Icon>
                <VictoryLabel text=" Carbs" className="orng" />
                <p>{this.state.carbs} g of carbohydrates</p>
                <Icon className="purp">pregnant_woman</Icon>
                <VictoryLabel text=" Fats" className="purp" />
                <p>{this.state.fat} g of fat</p>
                <Icon className="rd">fitness_center</Icon>
                <VictoryLabel text=" Protein" className="rd" />
                <p>{this.state.protein} g of Protein</p>
                <Icon className="yllw">ev_station</Icon>
                <VictoryLabel text=" Sugar" className="yllw" />
                <p>{this.state.sugar} g of Sugar</p>
                
                
                
                
            </div>
        )
    }
}

export default MealDayData;