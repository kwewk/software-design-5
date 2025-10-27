import { Router } from 'express';

import appUsers from './appUsers';
import auth from './auth';
import meals from './meals';
import recipes from './recipes';
import users from './users';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/recipes', recipes);
router.use('/meals', meals);
router.use('/app-users', appUsers);

export default router;
