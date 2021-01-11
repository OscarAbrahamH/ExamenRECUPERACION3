import React, {useContext,useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {ListItem, Header} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ProductosContext} from '../Context/ProductosContext';

const Listado = ({navigation}) => {

    const {lista,setProductos,eliminar,total} = useContext(ProductosContext);
   
    const operacion =(precio,cantidad)=>{
       
         
      return (precio*cantidad);
    }
    return (
    
    <View style={styles.container}>
        <Header
            centerComponent={{ text: 'Lista de Productos', style: { color: '#fff', fontSize:20 } }}
            rightComponent={{ icon: 'add', color: '#fff', onPress:()=>{
                 setProductos({
                     cantidad:"",
                     descripcion:"",
                     precio:""
                     
                 })   

                 navigation.navigate('Formulario',{status:"add"})

            }}}
            containerStyle={{backgroundColor:'#258902'}}
        />
        <ScrollView>
        {
            lista.length>0
            ?
            lista.map((user,i)=>(
                
                <ListItem key={i} bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>Descripción:{user.descripcion}</ListItem.Title>
                        <ListItem.Subtitle>Cantidad:{user.cantidad}</ListItem.Subtitle>
                        <ListItem.Subtitle>Precio:{user.precio}</ListItem.Subtitle>
                        <ListItem.Subtitle>Importe:{operacion(user.precio,user.cantidad)}</ListItem.Subtitle>
                    </ListItem.Content>
                    <View style={styles.buttons}>
                        <Ionicons name='ios-trash' size={30} color={'red'} onPress={()=>eliminar(user.precio,user.cantidad)}/>
                        <Ionicons name='md-create' size={30} color={'green'}  onPress={()=>{
                            setProductos({
                                cantidad:user.cantidad,
                                descripcion:user.descripcion,
                                precio:user.precio
                                
                            })

                            navigation.navigate('Formulario',{status:"edit"})
                        }}/>
            
                    </View>
                </ListItem>
            
            ))
            
            :
            <Text style={{marginTop:50, textAlign:'center', fontSize:20}}>No hay Productos</Text>


        }
          <Text style={{marginTop:50, textAlign:'center', fontSize:20}}>Total ${total}</Text>

        </ScrollView>


    </View>
    );
}
 
export default Listado;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    buttons:{
        width:'25%', 
        flexDirection:'row', 
        justifyContent:'space-between'
    }
});