import { Router } from 'express';

import page404 from './pages/404';
import pageRoot from './pages/root';
import v1 from './v1/';

const router = Router();
/**
 * @swagger
 * /customers:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.use(`/v1`, v1);

router.use(pageRoot); 
router.use(page404);

export default router;
