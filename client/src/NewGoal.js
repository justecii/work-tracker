import React, {Component} from 'react';

import axios from 'axios'
import {Input, Button} from 'react-materialize';

class NewGoal extends Component {
    constructor(props){
        super(props)
        this.state={
            category: '',
            goalLength: 0,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleCat(e){
        this.setState({
            category: e.target.value
        })
    }
    handleGoal(e){
        this.setState({
            goalLength: e.target.value
        })
    }
    handleSubmit(e){
        axios.post('/activity/goals/new', {
            category: this.state.category,
            length: this.state.goalLength,
            user: this.props.user.id
        })
    }
    
    render(){
        return(
            <div>
                <p>Add a new goal here</p>
                <form>
                    <Input label='Category' type="select" className="newFormItem ltBlue" onChange={(e) => this.handleCat(e)}>
                        <option value='Sleeping'>Sleep</option>
                        <option value='Eating'>Eating</option>
                        <option value='Commute/Travel'>Commute/Travel</option>
                        <option value="Chores">Chores</option>
                        <option value="Self-care">Self-care</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Exercise">Exercise</option>
                        <option value="Leisure">Leisure</option>
                        <option value="Adulting">Adulting</option>
                        <option value="Productivity">Productivity</option>
                        <option value="Correspondence">Correspondence</option>
                    </Input>
                    <Input label="Daily Goal (in minutes)" type="number" className="ltBlue" onInput={(e)=>this.handleGoal(e)}/>
                    <Button onClick={this.handleSubmit}>Save Goal </Button>
                </form>
            </div>
        )
    }
}

export default NewGoal;