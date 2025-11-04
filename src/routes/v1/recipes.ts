import { Router } from 'express';

import { list, show, create, edit, destroy } from 'controllers/recipes';
import { checkJwt } from 'middleware/checkJwt';
import { validatorCreateRecipe } from 'middleware/validation/recipes/validatorCreate';
import { validatorEditRecipe } from 'middleware/validation/recipes/validatorEdit';

const router = Router();

router.get('/', [checkJwt], list);
router.get('/:id([0-9]+)', [checkJwt], show);
router.post('/', [checkJwt, validatorCreateRecipe], create);
router.patch('/:id([0-9]+)', [checkJwt, validatorEditRecipe], edit);
router.delete('/:id([0-9]+)', [checkJwt], destroy);

export default router;
