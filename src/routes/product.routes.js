import { Router } from "express";
import ProductManager from "../product-manager.js"
import express from "express";

const productManager = new ProductManager ("./src/Data/products.json");
const router = Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.post("/", async (req, res) => {
    let content = req.body;
    try {
        await productManager.addProduct(content);
        res.status(200).send("El producto se ha agregado correctamente");    
    } catch (error) {
        console.log (`Se produjo un error en router.post dentro de product.routes.js. Estoy en el catch. El error es: ${error}`);
    }
    
})

router.put("/:pid", async (req, res) => {
    let dataToModify = req.body;
    let idOfProductToBeModified = req.params.pid;
    
    try {
        await productManager.modifyProduct(idOfProductToBeModified, dataToModify);
        res.status(200).send(`El producto con id ${idOfProductToBeModified} se ha modificado con exito.`);
    } catch (error) {
        console.log (`Se produjo un error en router.put dentro de product.routes.js. Estoy en el catch. El error es: ${error}`);
    }    
});

router.delete("/:pid", async (req, res) => {
    let idOfProductToBeDeleted = req.params.pid;
    
    try {
        await productManager.deleteProductById(idOfProductToBeDeleted);
        res.status(200).send(`El producto con id ${idOfProductToBeDeleted} se ha eliminado con exito.`);
    } catch (error) {
        console.log (`Se produjo un error en router.delete dentro de product.routes.js. Estoy en el catch. El error es: ${error}`);
    }
})

export { productManager };
export default router;