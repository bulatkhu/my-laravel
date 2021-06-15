import VueRouter from 'vue-router'
import App from '../Vue/App'
import Login from '../Vue/pages/Login'
import AuthCallback from '../Vue/pages/AuthCallback'
import Dashboard from '../Vue/pages/Dashboard'
import Double from '../Vue/pages/Dashboard/Double'

const Schema = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: "/",
            component: App,
            meta: { roles: [], private: false },
            children: [
                {
                    path: "/",
                    component: Dashboard,
                    children: [
                        {
                            path: "/double",
                            component: Double,
                            meta: { roles: [], private: false },
                        }
                    ]
                },
                {
                    path: "/auth",
                    component: Login,
                    meta: { roles: [], private: false },
                },
                {
                    path: "/auth/callback",
                    component: AuthCallback
                },
            ]
        },
        {
            path: "*",
            redirect: "/"
        }
    ]
})

export default Schema;
