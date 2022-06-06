import React from 'react';

class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editInputValue: this.props.element.title,
            editable: false,
        };
    }

    //this function to call when edit btn is clicked for enable edit
    handleOnEditClick = () => {
        this.setState({editable: true});
    };

    //this function to call when value of edit input is changed for store it in the state
    handleInputChange = (event) => {
        this.setState({ editInputValue: event.target.value });
    }

    //this function to call when update btn is clicked to call handleEdit in app.js to change item title
    handleInputUpdate = () => {
        this.setState({editable: false});
        this.props.handleEdit(this.props.index, this.state.editInputValue);
    }

    //this function to call when cancel btn is clicked to disable edit & cancel changes 
    handleInputCancel = () => {
        this.setState({editable: false, editInputValue: this.props.element.title});
    }

    render() {
        return (
            (this.state.editable?

                <div className="listItem">
                    <input id="inputEdit" value={this.state.editInputValue} onChange={(e) => this.handleInputChange(e)} />
                    <div>
                        <button className="btnUpdate" onClick={() => this.handleInputUpdate()}> Update </button>
                        <button className="btnCancel" onClick={() => this.handleInputCancel()}> Cancel </button>
                    </div>
                </div>

                :

                <div className="listItem">
                    <input key={this.props.index} type="checkbox" defaultChecked={this.props.element.isChecked} onChange={(event) => this.props.toggleChange(event, this.props.index)} />
                    <p id={'para-' + this.props.index} className={this.props.element.isChecked ? "checked" : ""}> {this.props.element.title}</p>
                    <div>
                        <button className="btnEdit" onClick={() => this.handleOnEditClick()}>edit</button>
                        <button className="btnDelete" onClick={() => this.props.deleteItem(this.props.index)} >delete</button>
                    </div>
                </div>
            )
        )
    }

}

export default ListItem;
