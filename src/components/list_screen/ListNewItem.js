import React, { Component } from 'react'

export class ListNewItem extends Component {
    render() {
        return (
            <div className="list_item_add_card"
                 onClick={this.props.createNewItem.bind(this, new Date().getTime())}>&#x2b;
            </div>
        )
    }
}

export default ListNewItem
