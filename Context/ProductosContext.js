import React, {createContext, useState,useEffect} from 'react';
import firebase from '../database/firebase';

export const ProductosContext = createContext();


const ProductosProvider = (props)=>{
    const [productos, setProductos] = useState({
        cantidad:"",
        descripcion:"",
        precio:""
        
    })
    const [total, setTotal]= useState([]);
    const [lista, setLista]= useState([]);
    
    useEffect(()=>{
        firebase.database().ref('Productos').on('value', snapshot=>{
            let ProductosLista=[];
            snapshot.forEach(row=>{
                ProductosLista.push({
                    cantidad:row.val().cantidad,
                    descripcion:row.val().descripcion,
                    precio:row.val().precio
                    
                })
            })

            setLista(ProductosLista)
        })
    },[])




    const eliminar =(precio,cantidad)=>{
        firebase.database().ref('Productos/').set(null).then(()=>{
            alert("Eliminado")
        })

        const temporal = lista.filter((item)=>{
            return;
        })
        const importe=(precio)*(cantidad);
       setTotal(total-importe)
        setLista(temporal)
    }

    
    return(
        <ProductosContext.Provider
         value={{
                productos,
                lista,
                total, 
                setTotal,


                setProductos,
                setLista,
                
                eliminar
            }}
        >
            {props.children}

        </ProductosContext.Provider>
    )
}

export default ProductosProvider;