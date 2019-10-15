import React, { Component } from 'react'

export class ListModal extends Component {
    modalClass = () => {
        let className="modal";
        if (this.props.trashDialog)
            className+=" is_visible"
        return className;
    }

    dialogClass = () => {
        let className="modal_dialog"
        if (this.props.trashDialog)
            className+=" is_slide"
        else
            className+=" is_slide_out"
        return className;
    }

    render() {
        return (
            <div className={this.modalClass()}>
                <div className={this.dialogClass()}>
                    <p>Delete list?</p>
                    <p><b>Are your sure you want to delete this list?</b></p>
                    <div className="modal_button_divider"></div>
                    <button className="modal_button"
                            onClick={this.props.deleteTodo}>Yes</button>
                    <div className="modal_button_divider"></div>
                    <button className="modal_button"
                            onClick={this.props.dontDeleteTodo}>No</button>
                    <p>The list will not be retreivable.</p>
                </div>
            </div>
        )
    }
}

export default ListModal
