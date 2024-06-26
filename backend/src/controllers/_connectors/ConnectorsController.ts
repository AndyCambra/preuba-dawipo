import { BaseController } from "../BaseController";
import Connector from "../../models/Connector";

export class ConnectorsController extends BaseController<Connector> {
  constructor() {
    super(Connector);
  }
}
