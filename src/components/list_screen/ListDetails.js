import React, { Component } from 'react'

export class ListDetails extends Component {
    getListName() {
        if (this.props.todoList) {
            let name = this.props.todoList.name;
            return this.props.todoList.name;
        }
        else
            return "";
    }
    getListOwner() {
        if (this.props.todoList) {
            let owner = this.props.todoList.owner;
            return this.props.todoList.owner;
        }
    }

    render() {
        return (
            <div id="list_details_container">
                <div id="list_details_name_container" className="text_toolbar">
                    <span id="list_name_prompt">Name:</span>
                    <input 
                        defaultValue={this.getListName()} 
                        type="text" 
                        id="list_name_textfield"
                        onChange={this.props.nameChange.bind(this, this.props.todoList.key)} />
                </div>
                <div id="list_details_owner_container" className="text_toolbar">
                    <span id="list_owner_prompt">Owner:</span>
                    <input 
                        defaultValue={this.getListOwner()}
                        type="text" 
                        id="list_owner_textfield"
                        onChange={this.props.ownerChange.bind(this, this.props.todoList.key)} />
                </div>
            </div>
        )
    }
}

export default ListDetails