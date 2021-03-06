import VueRouter from 'vue-router'
import Login from '../Vue/pages/Login'
import AuthCallback from '../Vue/pages/AuthCallback'
import Dashboard from '../Vue/pages/Dashboard'
import Double from '../Vue/pages/Dashboard/Double'
import Classic from '../Vue/pages/Dashboard/Classic'

const Schema = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: "/",
            component: Dashboard,
            children: [
                {
                    path: "/double",
                    component: Double,
                    meta: { roles: [], private: false },
                },
                {
                    path: "/classic",
                    component: Classic,
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
        {
            path: "*",
            redirect: "/"
        }
    ]
})

export default Schema;
