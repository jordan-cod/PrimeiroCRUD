import Vue from 'vue'
import axios from 'axios'

Vue.use({
    install(Vue) {
        Vue.prototype.$http = axios.create({
            baseURL: 'https://tabela-c135a-default-rtdb.firebaseio.com/'
        })

        Vue.prototype.$http.interceptors.request.use(config => {
            console.log(config.method)
            return config
        })
    }
})