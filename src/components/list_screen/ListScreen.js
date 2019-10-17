import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import ListDetails from './ListDetails'
import ListNewItem from './ListNewItem'
import ListModal from './ListModal'

export class ListScreen extends Component {
    componentDidMount() {
        document.addEventListener("keydown", this.onKeyPressed.bind(this));
    }
  
    componentWillUnmount() {
        document.removeEventListener("keydown", this.onKeyPressed.bind(this));
    }

    onKeyPressed = (e) => {
        if (e.key === 'z' && e.ctrlKey)
            this.props.undo(e);
        else if (e.key === 'y' && e.ctrlKey)
            this.props.redo(e);
    }

    render() {
        return (
            <div id="todo_list">
                <ListHeading goHome={this.props.goHome} />
                <ListTrash 
                            confirmDialogTrash={this.props.confirmDialogTrash}/>
                <ListDetails ownerChange={this.props.ownerChange} nameChange={this.props.nameChange} todoList={this.props.todoList}/>
                <ListItemsTable 
                            editItem={this.props.editItem}
                            sortTasks={this.props.sortTasks}
                            sortDates={this.props.sortDates}
                            sortStatuses={this.props.sortStatuses}
                            removeItem={this.props.removeItem}
                            moveItemUp={this.props.moveItemUp}
                            moveItemDown={this.props.moveItemDown} 
                            todoList={this.props.todoList} />
                <ListNewItem 
                            createNewItem={this.props.createNewItem}
                            todoList={this.props.todoList}/>
                <ListModal 
                            deleteTodo={this.props.deleteTodo}
                            dontDeleteTodo={this.props.dontDeleteTodo}
                            trashDialog={this.props.trashDialog}/>
            </div>
        )
    }
}

export default ListScreen
