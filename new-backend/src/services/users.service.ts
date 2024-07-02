import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { IUser } from '../types/models.interfaces';

export default class UserService {
  public static async getAllUsers(): Promise<IUser[]> {
    try {
      const allUsers: IUser[] = await User.findAll();
      if (allUsers.length === 0) {
        throw new Error('There are no users available');
      }
      return allUsers;
    } catch (error) {
      throw error;
    }
  }

  public static async getUserByUsername(username: string): Promise<IUser> {
    try {
      const user = await User.findOne({ where: { email: username } });
      if (!user) {
        throw new Error(`Username ${username} not found`);
      }
      return user as IUser;
    } catch (error) {
      throw error;
    }
  }

  public static async getUserById(id: string): Promise<IUser> {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error(`User with ID ${id} not found`);
      }
      return user as IUser;
    } catch (error) {
      throw error;
    }
  }

  public static async registerUser(userData: IUser): Promise<IUser> {
    const { email } = userData;

    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error(`${email} has already been registered`);
      }

      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashedPassword;

      const newUser: IUser = await User.create(userData);

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  public static async login(email: string, password: string): Promise<string> {
    try {
      const user: IUser | null = await User.findOne({ where: { email } });

      if (!user) {
        throw new Error('User not found');
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' },
      );

      return token as string;
    } catch (error) {
      throw error;
    }
  }

  public static async updateUserByUsername(
    username: string,
    newData: Partial<IUser>,
  ): Promise<IUser> {
    try {
      const [updatedRows] = await User.update(newData, {
        where: { email: username },
      });
      if (updatedRows === 0) {
        throw new Error(`Username ${username} not found`);
      }
      const updatedUser = await User.findOne({ where: { email: username } });
      return updatedUser as IUser;
    } catch (error) {
      throw error;
    }
  }

  public static async updateUserById(
    id: string,
    newData: Partial<IUser>,
  ): Promise<IUser> {
    try {
      const [updatedRows] = await User.update(newData, { where: { id } });
      if (updatedRows === 0) {
        throw new Error(`User with ID ${id} not found`);
      }
      const updatedUser = await User.findByPk(id);
      return updatedUser as IUser;
    } catch (error) {
      throw error;
    }
  }

  public static async deleteAllUsers(): Promise<void> {
    try {
      await User.destroy({ where: {} });
    } catch (error) {
      throw error;
    }
  }

  public static async deleteUserByUsername(username: string): Promise<void> {
    try {
      await User.destroy({ where: { email: username } });
    } catch (error) {
      throw error;
    }
  }

  public static async deleteUserById(id: string): Promise<void> {
    try {
      const deletedRows = await User.destroy({ where: { id } });
      if (deletedRows === 0) {
        throw new Error(`User with ID ${id} not found`);
      }
    } catch (error) {
      throw error;
    }
  }
}
