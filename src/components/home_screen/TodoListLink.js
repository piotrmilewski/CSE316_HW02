import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class TodoListLink extends Component {
    render() {  
        return (
            <div 
                className='home_list_link'
                onClick={this.props.loadList.bind(this, this.props.todoList)}
            >
                {this.props.todoList.name}<br></br><br></br>
            </div>
        )
    }
}

TodoListLink.propTypes = {
    loadList: PropTypes.func.isRequired,
    todoList: PropTypes.object.isRequired
}

export default TodoListLink
