import { Router } from "express";
import CartManager from "../cart-manager.js"
import express from "express";

const cartManager = new CartManager("./src/Data/cart.json");
const router = Router();

//Rutas para Carritos

router.post("/", async (req, res) => {
    try {
        let newCart = await cartManager.createNewCart();
        res.status(200).send(`Un nuevo carrito ha sido creado con exito.`);    
    } catch (error) {
        res.status(500).send(`Error en servidor`)
    } 
})

router.get("/:cid", async (req, res) => {
    let cartID = req.params.cid;
    let selectedCart;

    try {
        selectedCart = await cartManager.getCartById (cartID);
        res.json(selectedCart);
    } catch (error) {
        res.status(500).send(`Error en router.get con "/:cid" dentro de cart.routes.js el error es ${error}`)
    }
})

router.put("/:cid/product/:pid", async (req, res) => {
    let cartID = req.params.cid;
    let productID = req.params.pid
    let quantity = req.body.quantity || 1;
    let updatedCart;

    try {
        updatedCart = await cartManager.addProductsToCart(cartID, productID, quantity);
        res.json(updatedCart);
    } catch (error) {
        res.status(500).send(`Error en router.put dentro de cart.routes.js el error es ${error}`)
    }
})

export default router;