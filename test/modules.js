import axios from 'axios';
import awaitTo from 'async-await-error-handling';

const counter = {
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

const repos = {
    namespace: 'repos',
    state: {
        all: 0,
        error: '',
        title: 'Repos'
    },
    actions: {
        async getYourRepos ({dispatch, state}, payload) {
            await dispatch('myRepos', payload);
            return {
                all: 11
            };
        },

        async myRepos ({dispatch, state}, payload) {
            let {username} = payload;
            const [err, data] = await awaitTo(axios.get(`https://api.github.com/users/${username}/repos`));
        }
    }  
};

export default {
    counter,
    repos
};
