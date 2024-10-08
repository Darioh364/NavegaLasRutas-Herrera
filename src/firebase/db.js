import { getFirestore, collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { app } from "./config"

const db = getFirestore(app)


export const traerProductos = async (setProductos) => {
    const querySnapshot = await getDocs(collection(db, "Productos"));
    const productos = []
    querySnapshot.forEach((doc) => {
        productos.push(doc.data())
    })

    setProductos(productos)
}

export const traerProductosPorCategoria = async (categoria, setProductos) => {
    const productosRef = collection(db, "Productos")
    const q = query(productosRef, where("categoria", "==", categoria))
    const querySnapshot = await getDocs(q);
    const productos = []

    querySnapshot.forEach((doc) => {
        productos.push(doc.data())
    });
    setProductos(productos)
}

export const traerProductosPorId = async (itemId, setProducto) =>{
    const productosRef = collection(db, "Productos")
    const q = query(productosRef, where("id", "==", itemId))
    const querySnapshot = await getDocs(q);
    const productosId = []

    querySnapshot.forEach((doc) => {
        productosId.push(doc.data())
    });
    setProducto(productosId[0]);
}

export const crearOrden = async (orden) => {
    try {
        const docRef = await addDoc(collection(db, "ordenCompra"), orden);
        return docRef.id
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}