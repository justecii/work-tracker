import React, {Component} from 'react';
import { Input, Button, Row, Col } from 'react-materialize';
import moment from 'moment';
import axios from 'axios';

import DatePicker from 'react-datepicker';

class NewMeal extends Component{
    constructor(props){
        super(props)
        this.state={
            startDate: moment(),
            day: '',
            meal: '',
            mealTitle: '',
            calories: 0,
            protein: 0,
            fat: 0,
            carbs: 0,
            sugar: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit =this.handleSubmit.bind(this)
    }
    handleChange(date) {
        this.setState({
            startDate: date
        });
    }
    // saving food information to database
    handleMeal(e) {
        this.setState({
            meal: e.target.value
        })
    }
    handleMealTitle(e) {
        this.setState({
            mealTitle: e.target.value
        })
    }
    handleCalories(e) {
        this.setState({
            calories: parseInt(e.target.value, 0)
        })
    }
    handleProtein(e) {
        this.setState({
            protein: parseInt(e.target.value, 0)
        })
    }
    handleFat(e) {
        this.setState({
            fat: parseInt(e.target.value, 0)
        })
    }
    handleCarbs(e) {
        this.setState({
            carbs: parseInt(e.target.value, 0)
        })
    }
    handleSugar(e) {
        this.setState({
            sugar: parseInt(e.target.value, 0)
        })
    }
    handleSubmit(e){
        e.preventDefault();
        var startTime = this.state.startDate._d
        var actDate = moment(startTime).format("MM-DD-YYYY")
        if (this.state.calories > 0) {
            axios.post('/meal/new', {
                title: this.state.mealTitle,
                mealType: this.state.meal,
                calories: this.state.calories,
                protein: this.state.protein,
                fat: this.state.fat,
                carbs: this.state.carbs,
                sugar: this.state.sugar,
                time: startTime,
                day: actDate,
                user: this.props.user.id
            })
        }
    }
    render(){
        return(
            <div className="ltBlue">
                <form>
                    <Row>
                        <Col s={12} m={6} >
                            Time:<DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={5}
                                dateFormat="LLL"
                                className="newFormItem left"
                            />
                        </Col>
                        <Col s={12} m={6} >
                            <Input label="Meal Title" type="text" onChange={(e) => this.handleMealTitle(e)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col s={12} m={6} >
                            <Input label="Meal" type="select" onChange={(e) => this.handleMeal(e)}>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Diner">Diner</option>
                                <option value="Snack">Snack</option>
                                <option value="Other">Other (Brunch, etc)</option>
                            </Input>
                        </Col>
                        <Col s={12} m={6} >
                            <Input label="Calories" type="number" onChange={(e) => this.handleCalories(e)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col s={12} m={6} >
                            <Input label="Protein (grams)" type="number" onChange={(e) => this.handleProtein(e)} />
                        </Col>
                        <Col s={12} m={6} >
                            <Input label="Fat (grams)" type="number" onChange={(e) => this.handleFat(e)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col s={12} m={6} >
                            <Input label="Carbs (grams)" type="number" onChange={(e) => this.handleCarbs(e)} />
                        </Col>
                        <Col s={12} m={6} >
                            <Input label="Sugar (grams)" type="number" onChange={(e) => this.handleSugar(e)} />
                        </Col>
                    </Row> 
                    <Button onClick={this.handleSubmit}>Save Meal</Button>
                </form>
            </div>
        )
    }
}

export default NewMeal;