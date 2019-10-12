import React, { Component } from 'react'
import ListItemCard from './ListItemCard'

export class ListItemsTable extends Component {
    render() {
        var index = 0;
        return (
            <div id="list_items_container">
                <div className="list_item_header_card">
                    <div className="list_item_task_header">Task</div>
                    <div className="list_item_due_date_header">Due Date</div>
                    <div className="list_item_status_header">Status</div>
                </div>
                {
                    this.props.todoList.items.map((todoItem)=>(
                        <ListItemCard
                            index={index++}
                            removeItem={this.props.removeItem}
                            moveItemUp={this.props.moveItemUp} 
                            moveItemDown={this.props.moveItemDown}
                            todoList={this.props.todoList}
                            listItem={todoItem} />
                    ))
                }
            </div>
        )
    }
}

export default ListItemsTable
