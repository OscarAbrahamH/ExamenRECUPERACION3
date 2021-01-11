import React, {useContext} from 'react';
import {TextInput, View, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-elements'
import {Formik} from 'formik';
import * as Yup from 'yup';
import {ProductosContext} from '../Context/ProductosContext';
import Constants from 'expo-constants';
import firebase from '../database/firebase'

const validations =Yup.object().shape({
    
    cantidad:Yup.number().typeError('campo numérico').max(99999999,"Número grande").required('Obligatorio'),
    descripcion: Yup.string().min(2,'descripción chica').max(50,'Descripción Grande').required('Obligatorio'),
    precio:Yup.number().typeError('campo numérico').max(99999999,"Número grande").required('Obligatorio')
})

export default function Formulario({route,navigation}){
    const {status} = route.params;
    const {productos,lista,total,setProductos,setLista,setTotal}= useContext(ProductosContext);

    return(
        <View style={styles.container}>
            <Text style={styles.header}>PRODUCTOS</Text>

            <Formik
                initialValues={productos}
                onSubmit={(values,{resetForm})=>{
                     firebase.database().ref('Productos/'+productos.id).update(productos).then(()=>{
                         alert("Enviado")
                     })
                    const temporal = lista.filter(al=>al!=productos);
                    const importe=(productos.cantidad)*(productos.precio);
                    setTotal(total-importe);
                    setLista([...temporal,productos]);
                    resetForm({
                        
                        cantidad:"",
                        descripcion:"",
                        precio:"",
                    
                    })
                    navigation.navigate('Listado')

                    console.log(lista) 
                }}
                validationSchema={validations}
                validate={(values)=>{
                    setProductos(values)
                }}
            >
            {
                ({handleChange, handleBlur, handleSubmit, setFieldValue, handleReset, errors, values})=>(
                    <View>
                        
                        <TextInput
                            style={styles.textinput}
                            onChangeText={handleChange('descripcion')}
                            onBlur={handleBlur('descripcion')}
                            placeholder="Descripción"
                            value={values.descripcion}
                        
                        />
            
                        {errors.descripcion && <Text style={styles.texterror}>{errors.descripcion}</Text>}

                        <TextInput
                            style={styles.textinput}
                            onChangeText={handleChange('cantidad')}
                            onBlur={handleBlur('cantidad')}
                            placeholder="Cantidad"
                            value={values.cantidad}                        

                        />

                        {errors.cantidad && <Text style={styles.texterror}>{errors.cantidad}</Text>}
                        <TextInput
                            style={styles.textinput}
                            onChangeText={handleChange('precio')}
                            onBlur={handleBlur('precio')}
                            placeholder="Precio"
                            value={values.precio}                        

                        />

                        {errors.precio && <Text style={styles.texterror}>{errors.precio}</Text>}

                       
                       

                        <View style={{marginTop:20}}>
                            <Button
                                buttonStyle={styles.buttons}
                                onPress={handleSubmit}
                                title="Enviar"
                            />

                            {
                                status==="add"
                                &&
                                <Button
                                buttonStyle={styles.buttons}
                                onPress={handleReset}
                                title="Limpiar"
                                />

                            }
                        


                        </View>

                    </View>
                )


            }    
                
            </Formik>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'center',
      margin:20,
      marginTop:Constants.statusBarHeight
   
    },
    texterror:{
      color:'red'
    },
    textinput:{
      borderRadius:10, 
      height: 40, 
      borderColor: 'gray', 
      borderWidth: 1, 
      margin:5, 
      paddingLeft:15, 
      backgroundColor:'white',
      elevation: 5,
    },
    buttons:{
      backgroundColor:'gray', 
      color:'black', 
      marginTop:10, 
      borderRadius:10
    },
    header:{
      fontSize:20, 
      textAlign:'center', 
      marginBottom:40
    },
    picker:{
      margin:5, 
      borderRadius: 10, 
      borderWidth: 1, 
      borderColor: 'gray', 
      overflow: 'hidden',
      elevation: 5,
    }
  
  });