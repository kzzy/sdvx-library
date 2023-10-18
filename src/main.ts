import './styles.css'
import { createApp, provide, h } from 'vue'
import router from '@/router/index'
import App from './App.vue'

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core"
import { provideApolloClient } from '@vue/apollo-composable'

const httpLink = new HttpLink({
    uri: "http://127.0.0.1:8000/graphql",
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
})

createApp({
    setup () {
        provideApolloClient(apolloClient)
    },

    render: () => h(App),
}).use(router).mount('#app')