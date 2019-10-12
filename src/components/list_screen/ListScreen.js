import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import ListDetails from './ListDetails'
import PropTypes from 'prop-types';

export class ListScreen extends Component {
    render() {
        return (
            <div id="todo_list">
                <ListHeading goHome={this.props.goHome} />
                <ListTrash />
                <ListDetails ownerChange={this.props.ownerChange} nameChange={this.props.nameChange} todoList={this.props.todoList}/>
                <ListItemsTable 
                                removeItem={this.props.removeItem}
                                moveItemUp={this.props.moveItemUp}
                                moveItemDown={this.props.moveItemDown} 
                                todoList={this.props.todoList} />
            </div>
        )
    }
}

export default ListScreen
