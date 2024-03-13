import {createStore} from "vuex";


import usersModule from "./users/index.js";

const store = createStore({
    modules: {
        users: usersModule,
    },
});

export default store;
