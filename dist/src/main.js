import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faSquarePlus, faTrash, faCheck, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faSquarePlus, faTrash, faCheck, faPenToSquare)

/* Routes */
import { createWebHistory, createRouter } from 'vue-router'
import TodoList from './components/TodoList.vue'
import TodoItem from './components/TodoItem.vue'

const routes = [
    {
        path: '/',
        component: TodoList
    },
    {
        path: '/item/:index',
        component: TodoItem,
        name: 'item',
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')