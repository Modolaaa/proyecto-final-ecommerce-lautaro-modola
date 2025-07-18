import { db } from '../models/data.js';

import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const productsCollection = collection(db, "products");

// Obtener todos los productos
async function getAllProducts() {
  try {
    const snapshot = await getDocs(productsCollection);
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  } catch (error) {
    console.error(error);
  }
}

// Obtener producto por ID
async function getProductById(id) {
  try {
    const docRef = doc(productsCollection, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
}

// Agregar producto
async function addProduct(productData) {
  try {
    const docRef = await addDoc(productsCollection, productData);
    return { id: docRef.id, ...productData };
  } catch (error) {
    console.error(error);
  }
}

// Actualizar completamente
async function updateProduct(id, completeProductData) {
  try {
    const docRef = doc(productsCollection, id);
    await setDoc(docRef, completeProductData); 
    return { id, ...completeProductData };
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Actualizar parcialmente
async function patchProduct(id, partialData) {
  try {
    const docRef = doc(productsCollection, id);
    await updateDoc(docRef, partialData);
    return { id, ...partialData };
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Eliminar producto
async function deleteProduct(id) {
  try {
    const docRef = doc(productsCollection, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  patchProduct,
  deleteProduct
};