import { Router } from 'express';

import { CidadesController } from '../controllers';
const router = Router();


router.get('/', (req, res) => {
    return res.send('olá,dev!');
});
router.get('/cidades', CidadesController.create);

export { router };