import { BaseController } from "../BaseController";
import User from "../../models/User";

export class UsersController extends BaseController<User> {
  constructor() {
    super(User);
  }

  public async getUserByEmail(email: string) {
    return this.model.findOne({ where: { email } });
  }

  public async login(
    email: string,
    password: string,
    loginFunction: (email: string, password: string) => Promise<any>
  ) {
    return loginFunction(email, password);
  }
}
