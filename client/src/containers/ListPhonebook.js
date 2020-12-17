import React, { Component } from 'react';
import ItemPhonebook from './ItemPhonebook';
import { connect } from 'react-redux';
import { loadPhonebook } from '../actions'

class ListPhonebook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameFilter: '',
            phoneFilter: '',
        }
        this.handleChangeNameFilter = this.handleChangeNameFilter.bind(this);
        this.handleChangePhoneFilter = this.handleChangePhoneFilter.bind(this);
    }

    componentDidMount() {
        this.props.getPhonebook();
    }

    handleChangeNameFilter(event) {
        this.setState({ nameFilter: event.target.value });
    }

    handleChangePhoneFilter(event) {
        this.setState({ phoneFilter: event.target.value });
    }

    filter() {
        const { nameFilter, phoneFilter } = this.state;
        return (
            <div className='card'>
                <div className='card-header'>
                    Search Form
                    </div>
                <div className='card-body'>
                    <form>
                        <div className="form-inline">
                            <label className="my-1 mr-2 mx-sm-1">Name</label>
                            <input
                                className="form-control mx-sm-1"
                                type="text"
                                name="nameFilter"
                                placeholder="Name"
                                value={nameFilter}
                                onChange={this.handleChangeNameFilter}
                            />
                            <label className="my-1 mr-2 mx-sm-1">Phone</label>
                            <input
                                className="form-control mx-sm-1"
                                type="text"
                                name="phoneFilter"
                                value={phoneFilter}
                                placeholder="Phone"
                                onChange={this.handleChangePhoneFilter}
                            />
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    render() {
        let { phonebook } = this.props;
        let { nameFilter, phoneFilter } = this.state;

        if (nameFilter && phoneFilter) {
            const filterItems = (name, phone) => {
                return phonebook.filter(item => {
                    return (
                        item.name.toLowerCase().indexOf(name.toLowerCase()) > -1 &&
                        item.phone.indexOf(phone) > -1
                    );
                });
            };
            phonebook = filterItems(nameFilter, phoneFilter);
        }
        if (nameFilter) {
            const filterItems = name => {
                return phonebook.filter(item => {
                    return item.name.toLowerCase().indexOf(name.toLowerCase()) > -1;
                });
            };
            phonebook = filterItems(nameFilter);
        }
        if (phoneFilter) {
            const filterItems = phone => {
                return phonebook.filter(item => {
                    return item.phone.indexOf(phone) > -1;
                });
            };
            phonebook = filterItems(phoneFilter);
        }

        const listNode = phonebook.map((item, index) =>
            <ItemPhonebook
                index={index + 1}
                key={item.id}
                id={item.id}
                name={item.name}
                phone={item.phone}
                sent={item.sent}
            />
        )

        return (
            <div>
                {this.filter()}
                <table className="table table-striped mt-3">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listNode}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    phonebook: state.phonebook
})

const mapDispatchToProps = (dispatch) => ({
    getPhonebook: () => dispatch(loadPhonebook())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListPhonebook)