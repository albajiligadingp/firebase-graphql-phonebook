import React from 'react';
import ListPhonebook from '../containers/ListPhonebook';
import AddPhonebook from '../containers/AddPhonebook';

function BoxPhonebook(props) {
    return (
        <div className='container mt-2'>
            <div className="card text-center">
                <div className="card-header">
                    <h1>Phone Book Apps</h1>
                </div>
            </div>
            <br />
            <AddPhonebook />
            <br />
            <ListPhonebook />
        </div>
    )
}

export default BoxPhonebook;