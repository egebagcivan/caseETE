import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth'
import companyController from '../controllers/company';

const router = Router()

router.use(decodeUserFromToken)
router.get('/', checkAuth, companyController.getCompanies);
router.get('/:id', checkAuth, companyController.getCompany);
router.post('/', checkAuth, companyController.createCompany);
router.put('/:id', checkAuth, companyController.updateCompany);
router.delete('/:id', checkAuth, companyController.deleteCompany);

export default router;
