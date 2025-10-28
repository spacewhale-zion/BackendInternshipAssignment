const { check, validationResult } = require('express-validator');

exports.registerRules = [
  check('name', 'Name is required')
    .not().isEmpty()
    .trim() 
    .escape(), 

  check('email', 'Please include a valid email')
    .isEmail()
    .normalizeEmail(),  

  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),

];

exports.loginRules = [
  check('email', 'Please include a valid email')
    .isEmail()
    .normalizeEmail(), 

  check('password', 'Password is required')
    .exists(),
];

exports.taskRules = [
  check('title', 'Title is required')
    .not().isEmpty()
    .trim() 
    .escape(), 

  check('description')
    .optional()
    .trim()
    .escape(),

  check('status')
   .optional()
   .isIn(['pending', 'completed']).withMessage('Status must be either pending or completed') // Validate allowed status values
   .trim()
   .escape(), 
];

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}; 