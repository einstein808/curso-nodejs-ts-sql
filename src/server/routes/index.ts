import { Router } from 'express';

import { CidadesController } from '../controllers';
const router = Router();


router.get('/', (req, res) => {
    return res.send('olá,dev!');
});
router.post('/cidades', CidadesController.createBodyValidator, CidadesController.create);

export { router };