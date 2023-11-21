import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import authService from '../services/auth.service.js';

const router = Router();

router.post('/auth', userController.signIn);
router.post('/users', userController.create);
router.get('/users', (req, res, next) => authService.verifyToken(req, res, next), userController.findAll);
router.get('/users/:id', (req, res, next) => authService.verifyToken(req, res, next), userController.findById);
router.put('/users/:id', (req, res, next) => authService.verifyToken(req, res, next), userController.update);
router.delete('/users/:id', (req, res, next) => authService.verifyToken(req, res, next), userController.delete);

router.post('/users/:userId/phone', (req, res, next) => authService.verifyToken(req, res, next), userController.createUserPhone);
router.put('/users/:phoneId/phone', (req, res, next) => authService.verifyToken(req, res, next), userController.updateUserPhone);

export default router;
