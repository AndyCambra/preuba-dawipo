import { ProductsController } from "../controllers/_products/ProductsController";
import { ConnectorsController } from "../controllers/_connectors/ConnectorsController";
import { UsersController } from "../controllers/_users/UsersController";

const productController = new ProductsController();
const connectorController = new ConnectorsController();
const userController = new UsersController();

export { productController, connectorController, userController };
