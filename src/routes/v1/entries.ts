import { Router } from 'express';

import { checkJwt } from 'middleware/checkJwt';
// import { createEntry } from 'controllers/entries/createEntry';
// import { validatorCreateEntry } from 'middleware/validation/entries/validatorCreateEntry';
// import { getEntries } from 'controllers/entries/getEntries';
// import { getAllUserEntries } from 'controllers/entries/getAllUserEntries';

const router = Router();

// router.post('/write', [checkJwt, validatorCreateEntry], createEntry);
// router.get('/getAll', [checkJwt], getEntries);
// router.get('/getAllUserEntries', getAllUserEntries);

export default router;
