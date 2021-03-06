import { Router } from 'express'
import multer from 'multer';

import { CreateUserController } from '../modules/accounts/useCases/createUser/createUserController';
import { UpdateUSerAvatarController } from '../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';

import uploadConfig from "../config/upload";
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRoutes = Router()

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUSerAvatarController = new UpdateUSerAvatarController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch("/avatar",
ensureAuthenticated,
uploadAvatar.single("avatar"),
updateUSerAvatarController.handle);

export { usersRoutes }