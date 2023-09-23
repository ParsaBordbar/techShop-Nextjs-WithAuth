import { Router } from "express";
import { SignUpSchema, SignInSchema, User } from "../../models/index.js";
import { validateMiddleWare} from '../../middleware/index.mjs'
import {signUpUserController } from '../../controller/index.mjs'
import bcrybt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const AuthRoutes = Router();

AuthRoutes.post('/sign-up',validateMiddleWare(SignUpSchema), signUpUserController)
AuthRoutes.post('/sign-in',validateMiddleWare(SignInSchema), async(req, res) => {
    const isUser = await User.findOne({ email: req.body.email });
    if(!isUser) return res.status(400).json({
        msg: 'email or password is wrong!'
    });
    const passwordValidate = await bcrybt.compare(req.body.password, isUser.password);

    if(!passwordValidate){
        return res.status(400).json({
            msg: 'email or password is wrong'
        })
    }
    const token = jwt.sign({ user: isUser }, process.env.JWT_SECRET_KEY)
    console.log(token);
    res.status(200).json({
        token
    })
})