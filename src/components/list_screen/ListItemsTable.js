import React, { Component } from 'react'
import ListItemCard from './ListItemCard'

export class ListItemsTable extends Component {
    render() {
        var index = 0;
        return (
            <div id="list_items_container">
                <div className="list_item_header_card">
                    <div className="list_item_task_header"
                         onClick={this.props.sortTasks.bind(this, this.props.todoList.key)}>Task</div>
                    <div className="list_item_due_date_header"
                         onClick={this.props.sortDates.bind(this, this.props.todoList.key)}>Due Date</div>
                    <div className="list_item_status_header"
                         onClick={this.props.sortStatuses.bind(this, this.props.todoList.key)}>Status</div>
                </div>
                {
                    this.props.todoList.items.map((todoItem)=>(
                        <ListItemCard 
                            key={todoItem.key}
                            editItem={this.props.editItem}
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
