import express from "express";
import { eventController } from "./event.controller";
import authMiddleware, { UserRole } from "../../middleware/authMiddleware";

const router = express.Router();

router.get('/:paramId', authMiddleware(UserRole.OPERATOR), eventController.getEvent);
router.post('/:paramId', authMiddleware(UserRole.OPERATOR), eventController.createEvent);
router.patch('/:paramId', authMiddleware(UserRole.OPERATOR), eventController.updateEvent);
router.delete('/:paramId', authMiddleware(UserRole.OPERATOR), eventController.deleteEvent);

export const eventRouter = router;