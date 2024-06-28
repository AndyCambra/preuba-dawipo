import bcrypt from 'bcrypt';
import { User } from '../models/user.model';
import { UserAttributes } from '../types/models.interfaces';

export default class UserService {
  public static async getAllUsers() {
    try {
      const allUsers = await User.findAll();
      if (allUsers.length === 0) {
        throw new Error('There are no users available');
      }
      return allUsers;
    } catch (error) {
      throw error;
    }
  }

  public static async getUserByName(name: string) {
    try {
      const user = await User.findOne({ where: { name } });
      if (!user) {
        throw new Error(`User with name ${name} not found`);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

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
  }

  public static async getUserByEmail(email: string) {
    try {
      const user = await User.findOne({ where: { email } });
      return user;
    } catch (error) {
      throw error;
    }
  }

  public static async registerUser(
    userData: UserAttributes | UserAttributes[],
  ): Promise<User | User[]> {
    try {
      const dataArray = Array.isArray(userData) ? userData : [userData];

      const createPromises = dataArray.map(async (data) => {
        const { email } = data;
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
          throw new Error(`${data.name} has already been registered`);
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;

        return await User.create(data);
      });

      const createdUsers = await Promise.all(createPromises);

      return Array.isArray(userData) ? createdUsers : createdUsers[0];
    } catch (error) {
      throw error;
    }
  }

  public static async updateUserByName(name: string, newData: UserAttributes) {
    try {
      const [updatedRows] = await User.update(newData, { where: { name } });
      if (updatedRows === 0) {
        throw new Error(`No users with name ${name} found`);
      }
      const updatedUsers = await User.findAll({ where: { name } });
      return updatedUsers;
    } catch (error) {
      throw error;
    }
  }

  public static async updateUserById(id: string, newData: UserAttributes) {
    try {
      const [updatedRows] = await User.update(newData, { where: { id } });
      if (updatedRows === 0) {
        throw new Error(`User with ID ${id} not found`);
      }
      const updatedUser = await User.findByPk(id);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  public static async deleteAllUsers() {
    try {
      await User.destroy({ where: {} });
    } catch (error) {
      throw error;
    }
  }

  public static async deleteUserByName(name: string) {
    try {
      await User.destroy({ where: { name } });
    } catch (error) {
      throw error;
    }
  }

  public static async deleteUserById(id: string) {
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
