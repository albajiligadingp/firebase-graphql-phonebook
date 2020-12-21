import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

const API_URL = 'http://localhost:4000/graphql/'

const client = new ApolloClient({
    uri: API_URL
});

// Load Data Phonebook
export const loadPhonebookSuccess = phonebook => ({
    type: 'LOAD_PHONEBOOK_SUCCESS',
    phonebook
});

export const loadPhonebookFailure = () => ({
    type: 'LOAD_PHONEBOOK_FAILURE'
});

export const loadPhonebook = () => {
    const phonebooksQuery = gql`
    query {
        phonebooks{
            id
            name
            phone
        }
    }`;
    return dispatch => {
        return client.query({
            query: phonebooksQuery
        })
            .then(response => {
                dispatch(loadPhonebookSuccess(response.data.phonebooks));
            })
            .catch(error => {
                console.error(error);
                dispatch(loadPhonebookSuccess());
            });
    };
};

// Add Data Phonebook
export const postPhonebookSuccess = phonebook => ({
    type: 'POST_PHONEBOOK_SUCCESS',
    phonebook
});

export const postPhonebookFailure = id => ({
    type: 'POST_PHONEBOOK_FAILURE',
    id
});

const postPhonebookRedux = (id, name, phone) => ({
    type: 'POST_PHONEBOOK',
    id,
    name,
    phone
});

export const postPhonebook = (name, phone) => {
    const id = Date.now();
    const addQuery = gql`
    mutation addPhonebook($id: ID!, $name: String!, $phone: String!) {
        addPhonebook(id: $id, name: $name, phone: $phone) {
            id
            name
            phone
        }
    }`;
    return dispatch => {
        dispatch(postPhonebookRedux(id, name, phone));
        return client.mutate({
            mutation: addQuery,
            variables: {
                id,
                name,
                phone
            }
        })
            .then(response => {
                dispatch(postPhonebookSuccess(response.data));
            })
            .catch(err => {
                console.error(err);
                dispatch(postPhonebookFailure());
            });
    };
};

// Update Data Phonebook
export const putPhonebookSuccess = phonebook => ({
    type: 'PUT_PHONEBOOK_SUCCESS',
    phonebook
});

export const putPhonebookFailure = id => ({
    type: 'PUT_PHONEBOOK_FAILURE',
    id
});

const putPhonebookRedux = (id, name, phone) => ({
    type: 'PUT_PHONEBOOK',
    id,
    name,
    phone
});

export const putPhonebook = (id, name, phone) => {
    const updateQuery = gql`
    mutation updatePhonebook($id: ID!, $name: String!, $phone: String!){
        updatePhonebook(id: $id, name: $name, phone: $phone){
            id,
            name,
            phone
        }
    }`;
    return dispatch => {
        dispatch(putPhonebookRedux(id, name, phone));
        return client.mutate({
            mutation: updateQuery,
            variables: {
                id,
                name,
                phone
            }
        })        
            .then(response => {
                dispatch(putPhonebookSuccess(response.data));
            })
            .catch(err => {
                console.error(err);
                dispatch(putPhonebookFailure());
            });
    };
};

// Remove Data Phonebook
const deletePhonebookRedux = id => ({
    type: 'DELETE_PHONEBOOK',
    id
});

export const deletePhonebookSuccess = () => ({
    type: 'DELETE_PHONEBOOK_SUCCESS',
});

export const deletePhonebookFailure = () => ({
    type: 'DELETE_PHONEBOOK_FAILURE'
});

export const deletePhonebook = id => {
    const deleteQuery = gql`
    mutation removePhonebook($id: ID!) {
        removePhonebook(id: $id) {
            id
        }
    }`;
    return dispatch => {
        dispatch(deletePhonebookRedux(id));
        return client.mutate({
            mutation: deleteQuery,
            variables: {
                id
            }
        })
            .then(response => {
                dispatch(deletePhonebookSuccess());
            })
            .catch(err => {
                console.error(err);
                dispatch(deletePhonebookFailure());
            });
    };
};

// Resend Data Phonebook
export const resendPhonebook = (id, name, phone) => {
    const addQuery = gql`
    mutation updatePhonebook($id: ID!, $name: String!, $phone: String!) {
        updatePhonebook(id: $id, name: $name, phone: $phone) {
            id
            name
            phone
        }
    }`;
    return dispatch => {
        return client.mutate({
            mutation: addQuery,
            variables: {
                id,
                name,
                phone
            }
        })
            .then(function (response) {
                dispatch(postPhonebookSuccess(response))
            })
            .catch(function (error) {
                console.error(error);
                dispatch(postPhonebookFailure(id))
            });
    }
}