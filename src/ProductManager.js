import fs from 'fs'

class ProductManager {
  constructor() {
    try {
      this.products = fs.readFileSync("Productos.json", 'utf8')
      this.products = JSON.parse(this.products)
    } catch (error) {
      this.products = []
    }
  }

  async getProducts() {
    return this.products
  }


  async createProduct(nombre, detalles, precio, codigo, stock) {

    let product = {
      nombre,
      detalles,
      precio,
      codigo,
      stock
    }

    let products = await this.getProducts()

    if (products.length === 0) {
      product["id"] = 1
    }
    else {
      product["id"] = products[products.length - 1]["id"] + 1
    }

    this.products.push(product)

    try {
      await fs.promises.writeFile('Productos.json', JSON.stringify(this.products, null, '\t'))
      console.log('Producto creado')
    } catch (error) {
      console.log(error)
    }
  }
  
}

//  const product = new ProductManager();

//  product.createProduct("Manzana", "Roja", 30, "GK00", 5)
//  product.createProduct("Pera", "Grande", 25, "TF53", 3)

export default new ProductManager()
