import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import {Schema} from 'yup';
import * as yup from 'yup';

type TValidation = ( schema: Schema<any>)=> RequestHandler;


export const validation:TValidation = (schema)=> async (req, res, next)=>{
    try {
        await schema.validate(req.body, { abortEarly: false });
        return next();
    } catch (error) {
        const yupError = error as yup.ValidationError;
        const validationError: Record<string, string> = {};
        yupError.inner.forEach(error => {
            if (error.path === undefined) return;
            validationError[error.path] = error.message;

        });
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: validationError,
        });

    }

};