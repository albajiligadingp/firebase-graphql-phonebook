import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postPhonebook } from '../actions';

class AddPhonebook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            addButton: false
        }
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddButton = this.handleAddButton.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleChangeName(event) {
        this.setState({ name: event.target.value });
    }

    handleChangePhone(event) {
        this.setState({ phone: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.addPhonebook(this.state.name, this.state.phone);
        this.setState({ name: '', phone: '' })
    }

    handleAddButton(event) {
        event.preventDefault();
        this.setState({ addButton: true });
    }

    handleCancel(event) {
        event.preventDefault();
        this.setState({ addButton: false });
    }

    form() {
        return (
            <div className="card">
                <div className="card-header">Add Form</div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-inline">
                            <label className="my-1 mr-2 mx-sm-1">Name</label>
                            <input
                                className="form-control"
                                type="text"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChangeName}
                                placeholder="Name"
                            />
                            <label className="my-1 mr-2 mx-sm-1">Phone</label>
                            <input
                                className="form-control"
                                type="text"
                                name="phone"
                                value={this.state.phone}
                                onChange={this.handleChangePhone}
                                placeholder="Phone"
                            />
                            <button type="submit" className="btn btn-success mx-sm-2">
                                <i className="far fa-check-circle mr-2" />
                                Save
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={this.handleCancel}
                            >
                                <i className="fas fa-ban mr-2" />
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    add() {
        return (
            <div>
                <button
                    href="/"
                    onClick={this.handleAddButton}
                    type="button"
                    className="btn btn-info"
                >
                    <i className="fas fa-plus" />
                    Add
                </button>
            </div>
        )
    }

    render() {
        if (this.state.addButton) {
            return this.form();
        } else {
            return this.add();
        }
    }
}

const mapDispatchToProps = dispatch => ({
    addPhonebook: (name, phone) => dispatch(postPhonebook(name, phone))
})

export default connect(
    null,
    mapDispatchToProps
)(AddPhonebook)