import express from "express";
import userAccountController from "../controllers/userAccount.controller.js";
import validate from "../middleware/validation.middleware.js";
import authorization from '../middleware/authorization.middleware.js';

const router = express.Router();

router.post('/register', validate('register'), userAccountController.register);
router.post('/login', userAccountController.login);
router.delete('/user/:user',
    authorization.isOwnerOrHasRole('user', 'Administrator'),
    userAccountController.deleteUser);
router.patch('/user/:user',
    validate('updateUser'),
    authorization.isOwner('user'),
    userAccountController.updateUser);
router.patch('/user/:user/role/:role',
    validate('changeRoles', 'params'),
    authorization.hasRole('Administrator'),
    userAccountController.addRole);
router.delete('/user/:user/role/:role',
    validate('changeRoles', 'params'),
    authorization.hasRole('Administrator'),
    userAccountController.deleteRole);
router.patch('/password', userAccountController.changePassword);
router.get('/user/:user', userAccountController.getUser);

export default router;