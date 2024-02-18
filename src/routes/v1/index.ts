import { Router } from 'express';

import auth from './auth';
import users from './users';
import entries from './entries'
import images from './images'
import automation from './automation'

const router = Router();

router.use('/auth', auth);
// router.use('/users', users);
// router.use('/entries', entries)
// router.use('/images', images)
// router.use('/automation', automation)

export default router;
