import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User';

interface AuthRequest extends Request {
  user?: any;
  body: any;
  params: any;
}

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
      return;
    }

    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: 'User already exists'
      });
      return;
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password
    });

    sendTokenResponse(user, 201, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
      return;
    }

    const { email, password } = req.body;

    // Check for user
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
      return;
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    
    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
      return;
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({
    success: true,
    message: 'User logged out successfully'
  });
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  const user = await User.findById(req.user.id);
  
  res.status(200).json({
    success: true,
    data: user
  });
};

// @desc    Forgot password
// @route   POST /api/auth/forgotpassword
// @access  Public
export const forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'There is no user with that email'
      });
      return;
    }

    // Get reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPasswordToken field
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Set expire
    const resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    await User.findByIdAndUpdate(user._id, {
      resetPasswordToken,
      resetPasswordExpire
    });

    // Create reset url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/resetpassword/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    // Here you would send email with reset token
    // For now, we'll just send the token in response (NOT RECOMMENDED FOR PRODUCTION)
    res.status(200).json({
      success: true,
      message: 'Email sent',
      resetToken // Remove this in production
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reset password
// @route   PUT /api/auth/resetpassword/:resettoken
// @access  Public
export const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resettoken)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      res.status(400).json({
        success: false,
        message: 'Invalid token'
      });
      return;
    }

    // Set new password
    user.password = req.body.password;
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Update password
// @route   PUT /api/auth/updatepassword
// @access  Private
export const updatePassword = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    if (!(await user!.matchPassword(req.body.currentPassword))) {
      res.status(401).json({
        success: false,
        message: 'Password is incorrect'
      });
      return;
    }

    user!.password = req.body.newPassword;
    await user!.save();

    sendTokenResponse(user!, 200, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Google OAuth authentication
// @route   POST /api/auth/google
// @access  Public
export const googleAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // This would integrate with Google OAuth
    // For now, return a placeholder response
    res.status(501).json({
      success: false,
      message: 'Google OAuth not yet implemented'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Refresh JWT token
// @route   POST /api/auth/refresh
// @access  Public
export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  res.status(501).json({
    success: false,
    message: 'Token refresh not yet implemented'
  });
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user: any, statusCode: number, res: Response): void => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + (parseInt(process.env.JWT_COOKIE_EXPIRE!) || 30) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        carbonFootprint: user.carbonFootprint,
        sustainabilityScore: user.sustainabilityScore
      }
    });
};
