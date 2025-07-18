// controllers/productController.js


const useFirestore = true; // Cambiá esto a false si querés usar JSON
const jsonService = require('../services/jsonService');
const firestoreService = require('../services/firestoreService');
const service = useFirestore ? firestoreService : jsonService;


async function getProducts(req, res, next) {
  try {
    const products = await service.getAllProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
}

const getProductById = async (req, res, next) => {
  try {
    const id = req.params.id; // Mantener como string
    const product = await service.getProductById(id);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, stock } = req.body;

    if (!name || !description || price == null || stock == null) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const newProduct = await service.addProduct({ name, description, price, stock });

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, description, price, stock } = req.body;

    if (!name || !description || price == null || stock == null) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const updated = await service.updateProduct(id, { name, description, price, stock });

    if (!updated) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(updated);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleted = await service.deleteProduct(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};

const patchProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const partialData = req.body;

    const allowedFields = ['name', 'description', 'price', 'stock'];
    const isValid = Object.keys(partialData).every(key => allowedFields.includes(key));

    if (!isValid) {
      return res.status(400).json({ message: 'Campos no válidos en la solicitud' });
    }

    const updated = await service.patchProduct(id, partialData);

    if (!updated) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(updated);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  patchProduct
};