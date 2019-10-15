import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class ItemScreen extends Component {
    state = {
        description: '',
        assigned_to: '',
        due_date: '',
        completed: false,
        userCheck: false
    }

    onChecked = (e) => {
        this.setState( { userCheck: true} );
        this.setState( { [e.target.name]: e.target.checked} );
    }

    onChange = (e) => {
        this.setState( { [e.target.name]: e.target.value} );
    }

    submit = () => {
        if (!(this.state.description === ''))
            this.props.todoItem.description = this.state.description;
        if (!(this.state.assigned_to === ''))
            this.props.todoItem.assigned_to = this.state.assigned_to;
        if (!(this.state.due_date === ''))
            this.props.todoItem.due_date = this.state.due_date;
        if (this.state.userCheck)
            this.props.todoItem.completed = this.state.completed;
        if (this.props.newItem)
            this.props.submitNewItem(this.props.todoItem, this.props.todoListKey);
        else
            this.props.submitEditItem(this.props.todoItem, this.props.todoListKey);
    }

    render() {
        return (
            <div id="todo_item">
                <div className="item_prompt">Item</div>
                <div id="item_description_prompt" className="item_prompt">
                    <span>Description:</span>
                    <input id="item_description_textfield"
                           className="item_input" 
                           type="text" 
                           name="description" 
                           defaultValue={this.props.todoItem.description}
                           onChange={this.onChange}></input>
                </div>
                <div id="item_assigned_to_prompt" className="item_prompt">
                    <span>Assigned To:</span>
                    <input id="item_assigned_to_textfield" 
                           className="item_input" 
                           type="text" 
                           name="assigned_to" 
                           defaultValue={this.props.todoItem.assigned_to}
                           onChange={this.onChange}></input>
                </div>
                <div id="item_due_date_prompt" className="item_prompt">
                    <span>Due Date:</span>
                    <input id="item_due_date_textfield" 
                           className="item_input" 
                           type="date" 
                           name="due_date" 
                           defaultValue={this.props.todoItem.due_date}
                           onChange={this.onChange}></input>
                </div>
                <div id="item_completed" className="item_prompt">
                    <span>Completed:</span>
                    <input id="item_completed_checkbox" 
                           className="item_checkbox" 
                           type="checkbox" 
                           name="completed"
                           defaultChecked={this.props.todoItem.completed}
                           onChange={this.onChecked}></input>
                </div>
                <div id="item_button_container">
                    <button id="item_submit_button" 
                            className="item_button" 
                            onClick={this.submit}>Submit</button>
                    <div className="item_button_divider"></div>
                    <button id="item_cancel_button" 
                            className="item_button"
                            onClick={this.props.cancelNewEditItem.bind(this)}>Cancel</button>
                </div>
            </div>
        )
    }
}

ItemScreen.propTypes = {
    currentScreen: PropTypes.string.isRequired,
    todoItem: PropTypes.object.isRequired
}

export default ItemScreen
