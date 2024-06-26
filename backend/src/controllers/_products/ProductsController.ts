import { BaseController } from "../BaseController";
import Product from "../../models/Product";

export class ProductsController extends BaseController<Product> {
  constructor() {
    super(Product);
  }
}
