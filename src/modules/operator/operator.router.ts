import express from 'express';
import authMiddleware, { UserRole } from '../../middleware/authMiddleware';
import { operatorController } from './operator.controller';

const router = express.Router();

router.get('/', authMiddleware(UserRole.OPERATOR), operatorController.getOperator);

router.post('/', authMiddleware(UserRole.OPERATOR), operatorController.createOperator);

router.patch('/', authMiddleware(UserRole.OPERATOR), operatorController.updateOperator);

export const operatorRouter = router;