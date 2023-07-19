import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
interface ICidade {

    nome: string;
    estado: string;
}
const bodyValidation: yup.Schema<ICidade> = yup.object().shape({
    nome: yup.string().required().min(3),
    estado: yup.string().required().min(3)

});
export const createBodyValidator: RequestHandler = async (req, res, next) => {
    try {
        await bodyValidation.validate(req.body, { abortEarly: false });
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
export const create: RequestHandler = async (req, res) => {




    console.log(req.body.nome);
    return res.send('Create');
};