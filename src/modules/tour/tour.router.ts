import express from 'express';
import authMiddleware, { UserRole } from '../../middleware/authMiddleware';
import { tourController } from './tour.controller';

const router = express.Router();

router.get('/', authMiddleware(UserRole.OPERATOR), tourController.getTour);

router.post('/', authMiddleware(UserRole.OPERATOR), tourController.createTour);

router.patch('/:paramId', authMiddleware(UserRole.OPERATOR), tourController.updateTour);

router.delete('/:paramId', authMiddleware(UserRole.OPERATOR), tourController.deleteTour);


export const tourRouter = router;