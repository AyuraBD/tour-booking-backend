import express  from 'express';
import { customerController } from './customer.controller';
import authMiddleware, { UserRole } from '../../middleware/authMiddleware';

const router = express.Router();

router.get('/', authMiddleware(UserRole.CUSTOMER), customerController.getCustomer);
router.post('/', authMiddleware(UserRole.CUSTOMER), customerController.createCustomer);
router.patch('/', authMiddleware(UserRole.CUSTOMER), customerController.updateCustomer);
export const customerRouter = router;