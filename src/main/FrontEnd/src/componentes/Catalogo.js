import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Button, Col, FormGroup, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Input, Label } from "reactstrap";
import HeaderApp from "./HeaderApp";

const Catalogo = () => {

    const [productos, setProductos] = useState([]);
    const [filtro, setFiltro] = useState('');
    const [nombre, setNombre] = useState('');
    const [categoria, setCategoria] = useState('');
    const [precio, setPrecio] = useState('');
    const [show, setShow] = useState(false);


    const obtenerTProductos = () =>{
        axios.get('http://localhost:8080/ATDA/api/v1/product/obtainEvery')
        .then(({data}) => setProductos(data));
    }

    const obtenerProductosCate = (category) =>{
        axios.get(`http://localhost:8080/ATDA/api/v1/product/obtainCategory/${category}`)
        .then(({data}) => setProductos(data));
    }

    const obtenerProductosName = (name) =>{
        axios.get(`http://localhost:8080/ATDA/api/v1/product/obtainName/${name}`)
        .then(({data}) => setProductos(data));
    }

    const obtenerProductosPrice = (price) =>{
        axios.get(`http://localhost:8080/ATDA/api/v1/product/obtainPrice/${price}`)
        .then(({data}) => setProductos(data));
    }

    const obtenerProductosDisponi = () =>{
        axios.get('http://localhost:8080/ATDA/api/v1/product/obtainAvailability')
        .then(({data}) => setProductos(data));
    }

    useEffect(obtenerTProductos, []);

    const datosProductos = productos.map(productos =>{
        return (
            <tr key={productos.id}>
                <td className="text-center">{productos.name}</td>
                <td className="text-center">{productos.category}</td>
                {productos.availability ?
                <td className="text-center">Si</td>
                :
                <td className="text-center">No</td>
                }
                <td className="text-center">{'$ '+productos.price}</td>
                <td className="text-center">{productos.stock}</td>
                <td className="text-center">{productos.description}</td>
                <td className="text-center">
                    <img className="text-center" src={productos.image} width="200px" height="200px" alt="Imagen lo disponible"></img>
                </td>
            </tr>
        )
    });

    const actualizarTablita = () =>{
        if(filtro === 'name'){
            obtenerProductosName(nombre);
        }else{
            if(filtro === 'category'){
                obtenerProductosCate(categoria);
            }else{
                if(filtro === 'price'){
                    obtenerProductosPrice(precio);
                }else{
                    if(filtro === 'disponi'){
                        obtenerProductosDisponi();
                    }else{
                        setShow(true);
                    }
                }
            }
        }
    }

    return ( 
        <>
            <HeaderApp/>
            <div className='container-fluid'>
                <Col>
                    <h1 className="mb-3">
                        CATALOGO PRODUCTOS
                    </h1>
                        <Alert show={show} variant="danger">
                            <Alert.Heading>ERROR!</Alert.Heading>
                            <p>
                            Para poder realizar un filtro del catalogo,
                                es necesario que selecciones alguno: por categoria,
                                por nombre, por precio y por disponibilidad.
                            </p>
                            <hr />
                            <div className="d-flex justify-content-end">
                                <Button onClick={() => setShow(false)} variant="outline-danger">
                                    ¡Vale!
                                </Button>
                            </div>
                        </Alert>
                    <FormGroup className="mb-3">
                        <h4 className="mb-3">CONSULTAS</h4>
                        <Col sm = {6}>
                            <FormGroup>                            
                                <Label>
                                    <Input type='radio' name = "radioInput" id ="radioInput" onChange={() => {setFiltro('name')}}/> {' '}
                                        Consultar por nombre
                                </Label>
                                <Col sm = {10}>
                                    <Input name = "nameInputFilter" id ="nameInputFilter" placeholder='Digita el nombre del prodcuto' onChange={(e) => {setNombre(e.target.value)}}/>
                                </Col>                                                                             
                            </FormGroup>
                            <FormGroup>                            
                                <Label>
                                    <Input type='radio' name = "radioInput" id ="radioInput" onChange={() => {setFiltro('category')}}/> {' '}
                                        Consultar por categoria
                                </Label>
                                <Col sm = {10}>
                                    <Input type='select' name = "category" id ="categoryInput" onChange={(e) => {setCategoria(e.target.value)}}>
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
                            <FormGroup>                            
                                <Label>
                                    <Input type='radio' name = "radioInput" id ="radioInput" onChange={() => {setFiltro('price')}}/> {' '}
                                        Consultar por menor precio
                                </Label>
                                <Col sm = {10}>
                                    <Input name = "priceInputFilter" id ="priceInputFilter" placeholder='Digita el precio' onChange={(e) => {setPrecio(e.target.value)}}/>
                                </Col>                                                                             
                            </FormGroup>
                            <FormGroup>                            
                                <Label>
                                    <Input type='radio' name = "radioInput" id ="radioInput" onChange={() => {setFiltro('disponi')}}/> {' '}
                                        Consultar por disponibilidad
                                </Label>                                                                          
                            </FormGroup>
                        </Col>                                            
                    </FormGroup>
                    <div className='text-left mb-5'>
                        <Link to="/">
                            <Button variant="outline-danger" className='me-5' >Regresar</Button> 
                        </Link>
                            <Button variant="outline-success" className='ms-5' onClick={() => actualizarTablita()}>Filtrar</Button>
                    </div>                    
                    <Table bordered responsive>
                        <thead className="table-active">
                            <tr>
                                <th className="text-center">Nombre</th>
                                <th className="text-center">Categoria</th>
                                <th className="text-center">Disponibilidad</th>
                                <th className="text-center">Precio</th>
                                <th className="text-center">Stock</th>
                                <th className="text-center">Descripción</th>
                                <th className="text-center">Imagen</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datosProductos}
                        </tbody>
                    </Table>
                </Col>
            </div>
        </>
     );
}
 
export default Catalogo;