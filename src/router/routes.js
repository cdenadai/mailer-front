// import DashboardLayout from '@/views/layouts/DashboardLayout.vue';
import AuthLayout from '../views/layouts/AuthLayout.vue';
import LoggedLayout from '../views/layouts/LoggedLayout.vue';
import store from '../store';

import NotFound from '@/views/NotFoundPage.vue';

const loginGuard = (to, from, next) => {
  let loggedIn = store.getters['auth/loggedIn'];
	if (loggedIn) {
		next({ name: 'home' })
	} else {
		next()
	}
}

const loggedGuard = (to, from, next) => {
  let loggedIn = store.getters['auth/loggedIn'];
  if (!loggedIn) {
		next({ name: 'login' })
  } else {
		next()
	}
}

const routes = [
  {
    path: '/',
    redirect: 'home',
    component: LoggedLayout,
    beforeEnter: loggedGuard,
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/emails',
        name: 'emails',
        component: () => import('../views/emails/index.vue')
      },
      {
        path: '/emails/create',
        exact: true,
        name: 'emailsCreate',
        component: () => import('../views/emails/register.vue')
      },
      {
        path: '/emails/:id/edit',
        name: 'emailsEdit',
        component: () => import('../views/emails/register.vue')
      }
    ]
  },
  {
    path: '/',
    redirect: 'welcome',
    component: AuthLayout,
    beforeEnter: loginGuard,
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue')
      },
      {
        path: '/welcome',
        name: 'welcome',
        component: () => import('../views/Welcome.vue')
      },
      { path: '*', component: NotFound }
    ]
  }
];

export default routes;