import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Error404NotFound } from './components/error404-not-found/error404-not-found';

export const routes: Routes = [
    {
        path:"login",
        component: Login
    },
    {
        path:"register",
        component: Register
    },
    {
        path:"",
        redirectTo:"login",
        pathMatch:"full"
    },
    {
        path:"**",
        component:Error404NotFound
    }
];
