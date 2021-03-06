const { registerUserService, 
  registerUserWithRoleService, 
  getAllUsersService, deleteUserService } = require('../services/userService');
const { created, success } = require('../utils/dictionaries/statusCode');

const registerUserController = async (req, res, next) => {
  try {
    const user = await registerUserService(req.body);
    return res.status(created).json(user);
  } catch (error) {
    next(error);
  }
};

const registerUserWithRoleController = async (req, res, next) => {
  try {
    const user = await registerUserWithRoleService(req.body, req.user);
    return res.status(created).json(user);
  } catch (error) {
    next(error);
  }
};

const getAllUsersController = async (req, res, next) => {
  try {
    const users = await getAllUsersService();
    return res.status(success).json(users);
  } catch (error) {
    next(error);
  }
};

const deleteUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteUserService(id, req.user);
    return res.status(200).json({});
  } catch (error) {
    next(error);
  }
};

module.exports = { 
  registerUserController,
  registerUserWithRoleController,
  getAllUsersController, 
  deleteUserController,
};
