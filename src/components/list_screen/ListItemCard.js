import React, { Component } from 'react'
//import { green } from 'ansi-colors'

export class ListItemCard extends Component {
    getCompletedStyle = () => {
        return {
            color: this.props.listItem.completed ? 'green' : 'red'
        }
    }
    
    render() {
        return (
            <div className='list_item_card'>
                <div className='list_item_card_description'>
                    {this.props.listItem.description}
                </div>
                <div className='list_item_card_assigned_to'>
                    Assigned To: <strong>{this.props.listItem.assigned_to}</strong>
                </div>
                <div className='list_item_card_due_date'>
                    {this.props.listItem.due_date}
                </div>
                <div style={this.getCompletedStyle()} className='list_item_card_completed'>
                    {this.props.listItem.completed ? 'Completed' : 'Pending'}
                </div>
                <div className='list_item_card_toolbar'>
                    <button className='list_item_card_button'>&#x21e7;</button>
                    <button className='list_item_card_button' onClick={this.props.moveItemDown.bind(this, this.props.listItem.key, this.props.todoList.key)}>&#x21e9;</button>
                    <button className='list_item_card_button'>&#10005;</button>
                </div>
            </div>
        )
    }
}

export default ListItemCard
