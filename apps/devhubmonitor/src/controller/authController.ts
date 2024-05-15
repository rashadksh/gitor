import { session } from 'express-session';
import express, { Request, Response } from 'express';
import moment from 'moment';
import {
  IBasicLoginInput,
  IBasicSignupInput,
  InvalidPasswordError,
  UserAlreadyExistsError,
  UserDoesNotExistError,
} from '@dev-hub-monitor/types';
import { ERROR_MESSAGES } from '@dev-hub-monitor/validation';

import { AuthService } from '../service/authService';
import { UserMapper } from '../lib/mappers/user.mapper';
import {
  validateSignupData,
  validateLoginData,
} from '../lib/validations/validateData ';

const router = express.Router();
const authService = new AuthService();

router.post(
  '/signup/basic',
  validateSignupData,
  async (req: Request, res: Response) => {
    const body: IBasicSignupInput = req.body;
    try {
      const user = await authService.registerUser(body);
      const userJson = await UserMapper.dbToJSON(user);
      return res.json(userJson);
    } catch (e) {
      switch (true) {
        case e instanceof UserAlreadyExistsError:
          return res.status(409).json({ message: e.message });
        default:
          return res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  },
);

router.post('/login/basic', validateLoginData, async (req: any, res: any) => {
  try {
    const body: IBasicLoginInput = req.body;
    const { accessToken, refreshToken } = await authService.loginUser(body);
    const refreshTokenExpiryDate = moment().add(1, 'days').toDate();

    return res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        expires: refreshTokenExpiryDate,
      })
      .status(200)
      .json({ message: 'Login successful', accessToken });
  } catch (e) {
    switch (true) {
      case e instanceof UserDoesNotExistError:
        return res.status(409).json({ message: e.message });
      case e instanceof InvalidPasswordError:
        return res.status(409).json({ message: e.message });
      default:
        return res
          .status(500)
          .json({ message: ERROR_MESSAGES.BASIC_LOGIN_FAILED });
    }
  }
});
export default router;
