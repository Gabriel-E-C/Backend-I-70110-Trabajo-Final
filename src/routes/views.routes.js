import { Router } from "express";
import { productManager } from "./product.routes.js";

const router= Router ();


router.get("/", async (req, res) => {
    try {
        //res.send(await productManager.getProducts())
        let arrayOfProducts = await productManager.getProducts();        
        res.render("home", {arrayOfProducts});
    } catch (error) {
        console.log(`Se produjo un error en router.get "/" dentro de views.routes.js y es: ${error}`)
    }
    
})

router.get("/realTimeProducts", async (req, res) => {
    let arrayOfProducts = await productManager.getProducts();
    
    try {
        res.render("realTimeProducts", {arrayOfProducts});    
    } catch (error) {
        console.log(`Se produjo un error en router.get "/realTimeProducts" dentro de views.routes.js y es: ${error}`)
    }
    
})

export default router;