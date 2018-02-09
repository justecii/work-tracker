import React, {Component} from 'react';
import DailyMeals from './DailyMeals';
import NewMeal from './NewMeal';


import axios from 'axios';
import moment from 'moment';

import { Tabs, Tab } from 'react-materialize';

class Meals extends Component{
    constructor(props){
        super(props)
        this.state={
            dates: [],
            meals: []
        }
    }
    componentDidMount() {
        axios.post('/meal/calLog', {
            user: this.props.user.id
        }).then(result => {
            // sorts data by time of occurence, regardless of when input
            var sorted = result.data
            sorted.sort(function (a, b) {
                if (moment(a.time) < moment(b.time))
                    return -1;
                if (moment(a.time) > moment(b.time))
                    return 1;
                else return 0
            });
            this.setState({
                meals: sorted
            });
        })
    }

    render(){
        return(
            <div className="ltBlue">
                <Tabs className='tab-demo z-depth-1'>
                    <Tab title="New Entry" active>
                        <NewMeal user={this.props.user} />
                    </Tab>
                    <Tab title="Daily Calories">
                        <DailyMeals user={this.props.user} meals={this.state.meals} />
                    </Tab>
                    <Tab title="Activity">
                        words will be here
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

export default Meals;