// services/jsonService.js
const fs = require('fs/promises');
const path = require('path');

const filePath = path.join(__dirname, '..', 'products.json');

async function getAllProducts() {
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

async function getProductById(id) {
  const products = await getAllProducts();
  return products.find(p => p.id == id);
}

async function saveProducts(products) {
  await fs.writeFile(filePath, JSON.stringify(products, null, 2));
}

async function addProduct(newProduct) {
  const products = await getAllProducts();
  const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
  const product = { id: newId, ...newProduct };

  products.push(product);
  await saveProducts(products);

  return product;
}

async function updateProduct(id, updatedData) {
  const products = await getAllProducts();
  const index = products.findIndex(p => p.id == id);

  if (index === -1) {
    return null;
  }

  products[index] = { id, ...updatedData };
  await saveProducts(products);
  return products[index];
}

async function deleteProduct(id) {
  const products = await getAllProducts();
  const index = products.findIndex(p => p.id == id);

  if (index === -1) {
    return false;
  }

  products.splice(index, 1);
  await saveProducts(products);
  return true;
}

async function patchProduct(id, partialData) {
  const products = await getAllProducts();
  const index = products.findIndex(p => p.id == id);

  if (index === -1) {
    return null;
  }

  const updatedProduct = { ...products[index], ...partialData };
  products[index] = updatedProduct;

  await saveProducts(products);
  return updatedProduct;
}

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  patchProduct
};
