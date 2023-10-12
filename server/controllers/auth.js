import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// SignUp
export const signUp = asyncHandler(async (req, res, next) => {
  /*
    Check if user exists (email)
        - If user exists, return an Error
        - If user doesn't exist:
            - Secure the pw with bcrypt
            - Store the user in DB
            - Sign a token
            - Return the token 
*/
  const { firstName, lastName, username, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser)
    throw new ErrorResponse('An account with this Email already exists', 409);

  const hash = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    firstName,
    lastName,
    username,
    email,
    password: hash,
  });

  // const token = jwt.sign({ uid: newUser._id }, process.env.JWT_SECRET, {
  //   expiresIn: '1800s',
  // });

  const token = jwt.sign({ uid: newUser._id }, process.env.JWT_SECRET);
  res.status(201).send({ status: 'success' });
});

// Login
export const signIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email }).select('+password');
  if (!existingUser) throw new ErrorResponse('User does not exist', 404);

  const match = await bcrypt.compare(password, existingUser.password);
  if (!match) throw new ErrorResponse('Password is incorrect', 401);

  const token = jwt.sign({ uid: existingUser._id }, process.env.JWT_SECRET);
  res.cookie('token', token, { httpOnly: true, maxAge: 1800000 }); // 30mn
  res.status(200).send({ status: 'success' });
});

export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.uid);
  res.json(user);
});

export const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie('token');
  res.status(200).send({ status: 'success' });
});
