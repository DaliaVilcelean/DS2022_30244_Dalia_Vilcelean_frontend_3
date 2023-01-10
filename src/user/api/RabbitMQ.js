const refreshMessages = 'REFRESH_MESSAGES';
const initialState = { messages: [], isLoading: false };


export const actionCreators = {
    refreshAction: () => async (dispatch) => {
        const url =`https://localhost:44368/api/ReceiveData/Refresh`;
        const response = await fetch(url);
        const messages = await response.json();
        console.log(url)
        dispatch({ type: refreshMessages, messages });
        console.log(messages)
        return messages
    },

    sendToQAction: () => async (dispatch) => {
        const url = `https://localhost:44368/api/ReceiveData/SendToQ`;
        console.log(url)
        const response = await fetch(url);
        return response
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === refreshMessages) {
        return {
            ...state,
            messages: action.messages,
            isLoading: false
        };
    }
    return state;
};