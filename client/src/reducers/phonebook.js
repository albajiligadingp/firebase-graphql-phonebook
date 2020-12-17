const phonebook = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_PHONEBOOK_SUCCESS':
            return action.phonebook.map(item => {
                item.sent = true;
                return item;
            });

        case 'LOAD_PHONEBOOK_FAILURE':
            break;

        case 'POST_PHONEBOOK':
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    phone: action.phone,
                    sent: true
                }
            ];

        case 'POST_PHONEBOOK_SUCCESS':
            return action.phonebook.map(item => {
                item.sent = true;
                return item;
            });

        case 'POST_PHONEBOOK_FAILURE':
            return state.map(item => {
                if (item.id === action.id) {
                    item.sent = false;
                }
                return item;
            });

        case 'PUT_PHONEBOOK':
            const newState = [];
            state.map(item => {
                if (item.id === action.id) {
                    item.name = action.name;
                    item.phone = action.phone;
                }
                return newState.push(item);
            });
            return newState;

        case 'PUT_PHONEBOOK_SUCCESS':
            return state.map((item) => {
                if (item.id === action.id) {
                    item.sent = true;
                }
                return item
            })

        case 'PUT_PHONEBOOK_FAILURE':
            return state.map(item => {
                if (item.id === action.id) {
                    item.sent = false;
                }
                return item;
            });

        case 'DELETE_PHONEBOOK':
            return state.filter(item => item.id !== action.id);

        case 'DELETE_PHONEBOOK_SUCCESS':
            return state;

        case 'DELETE_PHONEBOOK_FAILURE':
            break;

        case 'RESEND_PHONEBOOK_SUCCESS':
            return state.map((item) => {
                if (item.id === action.id) {
                    item.sent = true;
                }
                return item
            })

        case 'RESEND_PHONEBOOK_FAILURE':
            break;

        default:
            return state;
    }
};

export default phonebook;
