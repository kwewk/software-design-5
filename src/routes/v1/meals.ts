import { Router } from 'express';

import { list, show, create, edit, destroy } from 'controllers/meals';
import { checkJwt } from 'middleware/checkJwt';
import { validatorCreateMeal } from 'middleware/validation/meals/validatorCreate';
import { validatorEditMeal } from 'middleware/validation/meals/validatorEdit';

const router = Router();

router.get('/', [checkJwt], list);
router.get('/:id([0-9]+)', [checkJwt], show);
router.post('/', [checkJwt, validatorCreateMeal], create);
router.patch('/:id([0-9]+)', [checkJwt, validatorEditMeal], edit);
router.delete('/:id([0-9]+)', [checkJwt], destroy);

export default router;
