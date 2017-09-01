export default {
    namespace: 'todo',
    state: {
        list: [],
        total: 0,
        title: 'ToDo'
    },
    actions: {
        addTodo ({dispatch, state}, payload) {
            let list = [].concat(state.list, payload.item);
            return {
                list,
                total: list.length
            };
        },
        deleteTodo ({dispatch, state}, payload) {
            let list = [].concat(state.list);
            list.splice(payload.index, 1);
            return {
                list,
                total: list.length
            };
        }
    }  
};
