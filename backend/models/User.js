const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const nodeCrypto = require('crypto');


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  verificationTokenExpires: Date,
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.getVerificationToken = function () {
  const verificationToken = nodeCrypto.randomBytes(20).toString('hex');

  this.verificationToken = nodeCrypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');

  this.verificationTokenExpires = Date.now() + 10 * 60 * 1000;

  return verificationToken;
};
module.exports = mongoose.model('User', UserSchema);