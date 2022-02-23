const { cryptHashMd5, errorConstructor } = require('../utils/functions');
const { user } = require('../database/models');
const { userAlreadyRegistered } = require('../utils/dictionaries/messagesDefault');
const { conflict } = require('../utils/dictionaries/statusCode');
const { userValidation } = require('../validations/registerUserValidations');
const { generateToken } = require('../auth/authService');


const registerUserService = async (bodyRequest) => {
  const { name, email, password } = bodyRequest;
  userValidation(name, email, password);
  const passwordEncrypted = cryptHashMd5(password);
  const [userRegister, created] = await user.findOrCreate({
    where: { email, name },
    defaults: { name, email, password: passwordEncrypted, role: 'customer' },
  });
  if (!created) throw errorConstructor(conflict, userAlreadyRegistered);
  const { dataValues: { id } } = userRegister;
  const token = generateToken({ id, name });
  return {
    id: userRegister.id,
    name: userRegister.name,
    role: 'customer',
    token,
  };
};

module.exports = {
  registerUserService,
};
