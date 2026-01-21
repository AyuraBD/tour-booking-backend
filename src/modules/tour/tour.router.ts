import express from 'express';
import authMiddleware, { UserRole } from '../../middleware/authMiddleware';
import { tourController } from './tour.controller';

const router = express.Router();

router.get('/', tourController.getTour);

router.get('/all', tourController.getAllTours);

router.post('/', authMiddleware(UserRole.OPERATOR), tourController.createTour);

router.patch('/:paramId', authMiddleware(UserRole.OPERATOR), tourController.updateTour);

router.delete('/:paramId', authMiddleware(UserRole.OPERATOR), tourController.deleteTour);


export const tourRouter = router;