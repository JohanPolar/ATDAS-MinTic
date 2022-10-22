import axios from 'axios';
import { useEffect, useState } from 'react';
import { Alert, Button, Col, Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import {Label, Form, FormGroup, Input} from 'reactstrap';
import HeaderApp from './HeaderApp';

const FormularioEditar = () => {

    const [nombre, setNombre] = useState('');
    const [categoria, setCategoria] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [disponi, setDisponi] = useState('');
    const [image, setImage] = useState('');
    const [show, setShow] = useState(false);

    const {id} = useParams();

    useEffect(() => {
        if(id !== 'new'){
            axios.get(`http://localhost:8080/ATDA/api/v1/product/obtainOne/${id}`)
            .then(({data}) =>{
                setNombre(data.name);
                setCategoria(data.category);
                setPrecio(data.price);
                setStock(data.stock);
                setDescripcion(data.description);
                setDisponi(data.availability);
                setImage(data.image);
                console.log(data);
            });
            
        }
    }, [id]);


    const inicializar = () =>{
        document.getElementById("formu").reset();
    }

    const enviarProductosV = () =>{  
        let valoresNuevos = {
            id:id,
            name: nombre,
            category:categoria,
            price: precio,
            stock: stock,
            description : descripcion,
            availability : disponi,
            image:image
        }

        valoresNuevos = JSON.stringify(valoresNuevos);

        axios.put('http://localhost:8080/ATDA/api/v1/product/update', valoresNuevos, {headers:{'Content-Type' : 'application/json'}})
        .then(() => console.log(valoresNuevos))
        
        inicializar();

    }


    const twoActions = () =>{
        enviarProductosV();
        setShow(true);
    }

    return ( 
        <>
            <HeaderApp/>
            <h1 className="mb-3"> EDITAR PRODUCTO</h1>
            <Container fluid className='justify-content-center'>
                <Alert show={show} variant="success">
                    <Alert.Heading>ACTUALIZADO!</Alert.Heading>
                    <p>
                        Se ha actualizado de manera satisfactoria el producto, puede volver
                        a Listado de productos y ver su cambio.
                    </p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button onClick={() => setShow(false)} variant="outline-success">
                            ¡Listos!
                        </Button>
                    </div>
                </Alert>
                <Form id='formu'>
                    <FormGroup className="mb-3" row>
                        <Label for="name" sm={1}>Nombre</Label>
                        <Col sm = {4}>
                            <Input name = "name" id ="nameInput" defaultValue={nombre} placeholder='Digita el nombre del producto' onChange={(e) => {setNombre(e.target.value)}}/>
                        </Col>
                    </FormGroup>
                    <FormGroup className="mb-3" row>
                        <Label for="category" sm={1}>Categoria</Label>
                        <Col sm = {3}>
                            <Input type='select' name = "category" id ="categoryInput" value={categoria} placeholder='Aseo/Hogar/Tecnologia/Etc' onChange={(e) => {setCategoria(e.target.value)}}>
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
                            <Input type='number' name = "price" id ="priceInput" defaultValue={precio} placeholder='Digita el precio del producto' onChange={(e) => {setPrecio(e.target.value)}}/>
                        </Col>
                    </FormGroup>

                    <FormGroup className="mb-3" row>
                        <Label for="stock" sm={1}>Stock</Label>
                        <Col sm = {2}>
                            <Input type='number' name = "stock" id ="stockInput" defaultValue={stock} placeholder='Digita el stock del producto' onChange={(e) => {setStock(e.target.value)}}/>
                        </Col>                        
                    </FormGroup>

                    <FormGroup className="mb-3" row>
                        <Label for="description" sm={1}>Descripción</Label>
                        <Col sm = {6}>
                            <Input type='textarea' name = "description" id ="descriptionInput" defaultValue={descripcion} placeholder='Digita la descripción del producto' onChange={(e) => {setDescripcion(e.target.value)}}/>
                        </Col>                        
                    </FormGroup>

                    <FormGroup className="mb-3" row>
                        <Label for="image" sm={1}>Imagen</Label>
                        <Col sm = {4}>
                            <Input name = "image" id ="imageInput" defaultValue={image} placeholder='Digita el nombre del producto' onChange={(e) => {setImage(e.target.value)}}/>
                        </Col>
                    </FormGroup>

                    <FormGroup check className="mb-3" row>
                        <div className='mb-3'>Por favor marque la casilla si el producto se encuentra disponible</div>
                        <Col sm = {6}>
                            <FormGroup check>                            
                                <Label check>
                                    <Input type='checkbox' name = "availability" id ="avaInput" checked={disponi} onChange={(e) => {setDisponi(e.target.value)}}/> {' '}
                                    Disponibilidad
                                </Label>                                         
                            </FormGroup>
                        </Col>                                            
                    </FormGroup>
                    <div className='text-left mb-5'>
                        <Link to="/product/obtainEvery">
                            <Button variant="outline-danger" className='me-5' >Regresar</Button> 
                        </Link>
                            <Button variant="outline-success" className='ms-5' onClick={() => twoActions()}>Guardar</Button>
                    </div>
                </Form>
            </Container>
        </>
     );
}
 
export default FormularioEditar;