import { Router } from 'express';

import { list, show, create, edit, destroy } from 'controllers/appUsers';
import { checkJwt } from 'middleware/checkJwt';
import { validatorCreateAppUser } from 'middleware/validation/appUsers/validatorCreate';
import { validatorEditAppUser } from 'middleware/validation/appUsers/validatorEdit';

const router = Router();

router.get('/', [checkJwt], list);
router.get('/:id([0-9]+)', [checkJwt], show);
router.post('/', [checkJwt, validatorCreateAppUser], create);
router.patch('/:id([0-9]+)', [checkJwt, validatorEditAppUser], edit);
router.delete('/:id([0-9]+)', [checkJwt], destroy);

export default router;
