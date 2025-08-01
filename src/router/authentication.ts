import { register } from '../controllers/authentication';
import express from 'express';

export default (router: express.Router) => {
    console.log("Here too")
    router.post('/auth/register', register);
}