import React, {Component} from 'react';
import NewGoal from './NewGoal';

import axios from 'axios'

class Goals extends Component {
    constructor(props){
        super(props)
        this.state={
            allGoals: []
        }
    }
    componentDidMount(){
        axios.post('/activity/goals', {
            user: this.props.user.id
        }).then(result => {
            this.setState({
                allGoals: result.data
            })
            console.log(this.state.allGoals)
        })
    }
    

    render(){
        let mappedGoals = this.state.allGoals.map((item, index) =>(
            <div className="ltBlue" key={index}>{item.category} for {item.length} minutes</div>
        ))
        return(
            <div>
                <p>My Goals:</p>
                {mappedGoals}
                <NewGoal user={this.props.user}/>
            </div>
        )
    }
}

export default Goals;