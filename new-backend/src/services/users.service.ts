import bcrypt from 'bcrypt';
import { User } from '../models/user.model';
import { UserAttributes } from '../types/models.interfaces';

export default class UsersService {
  public static async getAllUsers() {
    try {
      const allUsers = await User.findAll();
      if (allUsers.length === 0) {
        throw new Error("There are no registered users yet");
      }
      return allUsers;
    } catch (error) {
      throw error;
    }
  };

  public static async getUserById(id: string) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      throw error;
    }
  };

  public static async createUser(attributes: UserAttributes) {
    try {
      const existingUser = await User.findOne({ where: { name: attributes.name } });
      if (existingUser) {
        throw new Error(`${attributes.name} has already been registered`);
      }

      const hashedPassword = await bcrypt.hash(attributes.password, 10);
      const newUser = await User.create({
        ...attributes,
        password: hashedPassword,
      });
      
      return newUser;
    } catch (error) {
      throw error;
    }
  }
};