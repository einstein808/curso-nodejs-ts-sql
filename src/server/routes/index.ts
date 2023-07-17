import { Router } from 'express';
import {StatusCodes} from 'http-status-codes';

const router = Router();

router.get('/', (req, res) => {
    return res.send('olá,dev!');
});
router.post('/', (req, res) => {
    const temp = req.body +123;
    return res.status(StatusCodes.ACCEPTED).json(temp);
});

export {router};