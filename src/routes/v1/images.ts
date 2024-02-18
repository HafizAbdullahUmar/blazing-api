// import { getImage, storeImage } from 'controllers/images';
import multer from 'multer';
import { Router } from 'express';

import { validatorImageStore } from 'middleware/validation/images';
const upload = multer({ dest: 'uploads/' }); // specify the folder to store uploaded files

const router = Router();

// router.post('/upload',upload.single('file'), [validatorImageStore], storeImage);
// router.get('/image/:id', getImage);
export default router;
