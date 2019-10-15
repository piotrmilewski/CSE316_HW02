import React, { Component } from 'react'
//import { green } from 'ansi-colors'

export class ListItemCard extends Component {
    getCompletedStyle = () => {
        return {
            color: this.props.listItem.completed ? 'green' : 'red'
        }
    }

    getDownButtonClass = () => {
        return (this.props.todoList.items.length-1) !== this.props.index ? 'list_item_card_button': 'list_item_card_button_disabled' 
    }

    getDownDisabled = () => {
        return (this.props.todoList.items.length-1) !== this.props.index ? false : true
    }

    getUpButtonClass = () => {
        return this.props.index !== 0 ? 'list_item_card_button': 'list_item_card_button_disabled' 
    }

    getUpDisabled = () => {
        return this.props.index !== 0 ? false : true
    }

    render() {
        return (
            <div className='list_item_card' onClick={this.props.editItem.bind(this, this.props.todoList.key, this.props.listItem.key)}>
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
                    <button className={this.getUpButtonClass()}
                            disabled={this.getUpDisabled()}                            
                            onClick={this.props.moveItemUp.bind(this, this.props.listItem.key, this.props.todoList.key)}>&#x21e7;</button>
                    <button className={this.getDownButtonClass()}
                            disabled={this.getDownDisabled()}
                            onClick={this.props.moveItemDown.bind(this, this.props.listItem.key, this.props.todoList.key)}>&#x21e9;</button>
                    <button className='list_item_card_button'
                            onClick={this.props.removeItem.bind(this, this.props.listItem.key, this.props.todoList.key)}>&#10005;</button>
                </div>
            </div>
        )
    }
}

export default ListItemCard
