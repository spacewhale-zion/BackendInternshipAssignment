const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail'); 
const crypto = require('crypto');

exports.registerUser = async (req, res) => {
  const { name, email, password, adminKey } = req.body;

  let userRole = 'user';
  if (adminKey && adminKey === process.env.ADMIN_SECRET_KEY) {
    userRole = 'admin';
  } else if (adminKey) {
    return res.status(400).json({ errors: [{ msg: 'Invalid Admin Key' }] });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      if (!user.isVerified) {
         const verificationToken = user.getVerificationToken();
         await user.save({ validateBeforeSave: false }); 

         const verifyUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/verify/${verificationToken}`;
         const message = `Please verify your account by clicking the following link: \n\n ${verifyUrl} \n\n If you did not request this email, please ignore it. This link will expire in 10 minutes.`;

         try {
           await sendEmail({
             email: user.email,
             subject: 'Account Verification',
             message,
           });
           return res.status(200).json({ msg: 'Verification email sent. Please check your inbox (and spam folder).' });
         } catch (emailErr) {
            console.error('Email sending error:', emailErr);
            user.verificationToken = undefined;
            user.verificationTokenExpires = undefined;
            await user.save({ validateBeforeSave: false });
            return res.status(500).send('Error sending verification email.');
         }
      }
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    // --- Create New User ---
    user = new User({
      name,
      email,
      password,
      role: userRole,
      isVerified: false, 
    });

    const verificationToken = user.getVerificationToken();

    await user.save();


    const verifyUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/verify/${verificationToken}`;

    const message = `Thank you for registering! Please verify your account by clicking the following link: \n\n ${verifyUrl} \n\n If you did not request this email, please ignore it. This link will expire in 10 minutes.`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Account Verification',
        message,
      });

      res.status(201).json({ msg: 'Registration successful! Please check your email to verify your account.' });

    } catch (emailErr) {
        console.error('Email sending error:', emailErr);
       
        await user.save({ validateBeforeSave: false });

        return res.status(500).send('User registered, but failed to send verification email.');
    }

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error during registration.');
  }
};

// --- Add Verification Handler ---
exports.verifyEmail = async (req, res) => {
    try {

        
        const verificationToken = crypto
            .createHash('sha256')
            .update(req.params.token)
            .digest('hex');

        const user = await User.findOne({
            verificationToken,
            verificationTokenExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid or expired verification token.' });
        }

        // 4. Verification successful
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpires = undefined;
        await user.save();

         res.status(200).json({ msg: 'Email verified successfully! You can now log in.' });


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error during email verification.');
    }
};


// Login User - Add verification check
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    // --- Check if email is verified ---
    if (!user.isVerified) {
       return res.status(401).json({ errors: [{ msg: 'Please verify your email address before logging in.' }] });
    }
    // --- End verification check ---

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getMe = async (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};