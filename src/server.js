import express from 'express';
import ProductManager from './ProductManager.js';

const server = express();
server.use(express.urlencoded({ extended: true }));
server.listen(3000, () => console.log("Listening on port 3000"))

server.get('/products/', async (req, res) => {
    const limit = req.query.limit
    if(limit != null || limit > 0){
        const products = await ProductManager.getProducts()
        const productsLimit = products.slice(0, limit)
        res.json(productsLimit)
    }else{
        const products = await ProductManager.getProducts()
        res.json(products)
    }
});
        
server.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const products = await ProductManager.getProducts();
    const product = products.find(product => product.id == id)
    if(!product){
        res.send('<h1 style="color:red; text-align:center;">Producto no encontrado</h1>')
    }
    res.json(product)

});

server.get('*', (req, res) => {
    res.send('<h1 style="color:red; text-align:center;">Error</h1>')
});
