import axios from 'axios';
import { useState } from 'react';
import { Button, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {Label, Form, FormGroup, Input} from 'reactstrap';
import HeaderApp from './HeaderApp';

const FormularioProductos = () => {

    const [nombre, setNombre] = useState('');
    const [categoria, setCategoria] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [disponi, setDisponi] = useState('');
    const [image, setImage] = useState('');


    const inicializar = () =>{
        document.getElementById("formu").reset();
    }

    const enviarProductosN = () =>{     
        let valoresNuevos = {
            name: nombre,
            category:categoria,
            price: precio,
            stock: stock,
            description : descripcion,
            availability : disponi,
            image : image
        }

        valoresNuevos = JSON.stringify(valoresNuevos);

        axios.post('http://localhost:8080/ATDA/api/v1/product/save', valoresNuevos, {headers:{'Content-Type' : 'application/json'}})
        .then(() => console.log(valoresNuevos))
        
        inicializar();

    }

    return ( 
        <>
            <HeaderApp/>
            <h1 className="mb-3"> NUEVO PRODUCTO</h1>
            <Container fluid className='justify-content-center'>
                <Form id='formu'>
                    <FormGroup className="mb-3" row>
                        <Label for="name" sm={1}>Nombre</Label>
                        <Col sm = {4}>
                            <Input name = "name" id ="nameInput" /*defaultValue={product.name || ''}*/ placeholder='Digita el nombre del prodcuto' onChange={(e) => {setNombre(e.target.value)}}/>
                        </Col>
                    </FormGroup>
                    <FormGroup className="mb-3" row>
                        <Label for="category" sm={1}>Categoria</Label>
                        <Col sm = {3}>
                            <Input type='select' name = "category" id ="categoryInput" /*defaultValue={product.category || 'Seleccione una opción ...'}*/ placeholder='Aseo/Hogar/Tecnologia/Etc' onChange={(e) => {setCategoria(e.target.value)}}>
                                <option>Seleccione una opción ...</option>
                                <option>Aseo</option>
                                <option>Muebles</option>
                                <option>Mascotas</option>
                                <option>Deportes</option>
                                <option>Papeleria</option>
                                <option>Vestimenta</option>
                                <option>Jugueteria</option>
                                <option>Tecnología</option>
                                <option>Alimentación</option>
                                <option>Salud y bienestar</option>
                                <option>Hogar y decoración</option>
                                <option>Herramientas y ferreteria</option>
                            </Input>
                        </Col>
                    </FormGroup>

                    <FormGroup className="mb-3" row>
                        <Label for="price" sm={1}>Precio</Label>
                        <Col sm = {2}>
                            <Input type='number' name = "price" id ="priceInput" /*defaultValue={product.price || ''}*/ placeholder='Digita el precio del producto' onChange={(e) => {setPrecio(e.target.value)}}/>
                        </Col>
                    </FormGroup>

                    <FormGroup className="mb-3" row>
                        <Label for="stock" sm={1}>Stock</Label>
                        <Col sm = {2}>
                            <Input type='number' name = "stock" id ="stockInput" /*defaultValue={product.stock}*/ placeholder='Digita el stock del producto' onChange={(e) => {setStock(e.target.value)}}/>
                        </Col>                        
                    </FormGroup>

                    <FormGroup className="mb-3" row>
                        <Label for="description" sm={1}>Descripción</Label>
                        <Col sm = {6}>
                            <Input type='textarea' name = "description" id ="descriptionInput" /*defaultValue={product.description}*/ placeholder='Digita la descripción del producto' onChange={(e) => {setDescripcion(e.target.value)}}/>
                        </Col>                        
                    </FormGroup>

                    <FormGroup className="mb-3" row>
                        <Label for="image" sm={1}>Imagen</Label>
                        <Col sm = {4}>
                            <Input name = "image" id ="imageInput" /*defaultValue={product.name || ''}*/ placeholder='Pegue la Url de la imagen ' onChange={(e) => {setImage(e.target.value)}}/>
                        </Col>
                    </FormGroup>

                    <FormGroup check className="mb-3" row>
                        <div className='mb-3'>Por favor marque la casilla si el producto se encuentra disponible</div>
                        <Col sm = {6}>
                            <FormGroup check>                            
                                <Label check>
                                    <Input type='checkbox' name = "availability" id ="avaInput" /*defaultValue={product.availability}*/ value={'true'} onChange={(e) => {setDisponi(e.target.value)}}/> {' '}
                                    Disponibilidad
                                </Label>                                         
                            </FormGroup>
                        </Col>                                            
                    </FormGroup>
                    <div className='text-left mb-5'>
                        <Link to="/product/obtainEvery">
                            <Button variant="outline-danger" className='me-5' >Regresar</Button> 
                        </Link>
                            <Button variant="outline-success" className='ms-5' onClick={() => enviarProductosN()}>Guardar</Button>
                    </div>
                </Form>
            </Container>
        </>
     );
}
 
export default FormularioProductos;