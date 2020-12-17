import axios from 'axios'

const API_URL = 'http://localhost:4000/api/'

const request = axios.create({
    baseURL: API_URL,
    timeout: 1000
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
    return dispatch => {
        return request
            .get('phonebook')
            .then(response => {
                dispatch(loadPhonebookSuccess(response.data));
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
    return dispatch => {
        dispatch(postPhonebookRedux(id, name, phone));
        return request
            .post('phonebook', { id, name, phone })
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
    console.log(id, name, phone);
    return dispatch => {
        dispatch(putPhonebookRedux(id, name, phone));
        return request
            .put(`phonebook/${id}`, { name, phone })
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
    return dispatch => {
        dispatch(deletePhonebookRedux(id));
        return request
            .delete(`phonebook/${id}`)
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
export const resendPhonebookSuccess = (id) => ({
    type: 'RESEND_PHONEBOOK_SUCCESS',
    id
})

export const resendPhonebookFailure = () => ({
    type: 'RESEND_PHONEBOOK_FAILURE'
})

export const resendPhonebook = (id, nama, umur) => {
    return dispatch => {
        return request.post('phonebook', { id, nama, umur })
            .then(function (response) {
                dispatch(resendPhonebookSuccess(id))
            })
            .catch(function (error) {
                console.error(error);
                dispatch(resendPhonebookFailure())
            });
    }
}