import { Home, Register, Login, Secret } from '../components';

/**
 * Config
 * You can make your web route here
 *
 * example
 * const route = {
 *   path: "string" {required},
 *   component: "node" {required},
 *   label: "string" {optional},
 *   auth: "boolean" {optional}
 * }
 */

const webRoute = [
  {
    path: '/',
    component: Home,
    label: 'Home',
    exact: true,
  },
  {
    path: '/register',
    component: Register,
    label: 'Register',
  },
  {
    path: '/Login',
    component: Login,
    label: 'Login',
  },
  {
    path: '/Secret',
    component: Secret,
    auth: true,
    label: 'Secret',
  },
];

export default webRoute;
