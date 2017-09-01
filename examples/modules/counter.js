export default {
    namespace: 'counter',
    state: {
        count: 0,
        title: 'Counter'
    },
    actions: {
        increase ({dispatch, state}, payload) {
            const val = state.count + 1;
            return {
                count: val
            };
        },
        decrease ({dispatch, state}, payload) {
            const val = state.count - 1;         
            return {
                count: val
            };
        }
    }  
};
