import { Router } from "express"; // Cambio: Importa usando `import`
import connectorsRouter from "./connectors"; // Cambio: Importa usando `import`
import productsRouter from "./products"; // Cambio: Importa usando `import`
import usersRouter from "./users"; // Cambio: Importa usando `import`

const router = Router();

router.use("/connectors", connectorsRouter);
router.use("/products", productsRouter);
router.use("/users", usersRouter);

export default router; // Cambio: Exporta usando `export default`
