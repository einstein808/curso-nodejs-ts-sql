import { Request, Response } from 'express';
import { BAD_REQUEST, StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
interface ICidade {

    nome: string;
    estado: string;
}
const bodyValidation: yup.Schema<ICidade> = yup.object().shape({
    nome: yup.string().required().min(3)

});
export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
    let validatedData: ICidade | undefined = undefined;
    try {
        validatedData = await bodyValidation.validate(req.body, { abortEarly: false });
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


    console.log(validatedData);
    return res.send('Create');
};