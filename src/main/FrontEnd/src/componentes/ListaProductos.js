import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import HeaderApp from "./HeaderApp";

const  ListaProductos = () => {

    const [productos, setProductos] = useState([]);

    const obtenerTProductos = () =>{
        /*fetch('http://localhost:8080/ATDA/api/v1/product/obtainEvery')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setProductos(data);}
        )*/

        axios.get('http://localhost:8080/ATDA/api/v1/product/obtainEvery')
        .then(({data}) => setProductos(data));
    }

    useEffect(obtenerTProductos, []);

    const eliminarProductos = (id) =>{
        axios.delete(`http://localhost:8080/ATDA/api/v1/product/delete/${id}`)
        .then(() => obtenerTProductos());
    }

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
                <td className="text-center">{'$'+productos.price}</td>
                <td className="text-center">{productos.stock}</td>
                <td className="text-center">{productos.description}</td>
                <td className="text-center">
                    <ButtonGroup>
                        <Link to={'/product/formularioEdit/' + productos.id}>
                            <Button variant="outline-secondary">
                                <div>
                                    Editar
                                </div>
                                <FontAwesomeIcon icon={faEdit} className="cursor-pointer"/>
                            </Button>
                        </Link>
                    </ButtonGroup>
                </td>
                <td className="text-center">
                    <ButtonGroup>
                        <Button variant="outline-danger" onClick={() => eliminarProductos(productos.id)}>
                            <div>
                                Eliminar
                            </div>
                            <FontAwesomeIcon icon={faTrash} className="cursor-pointer"/>
                        </Button>
                    </ButtonGroup>
                </td>
            </tr>
        )
    });

    return (
        <>
            <HeaderApp/>
            <div className='container-fluid'>
                    <Row>
                        <Col>
                            <h1 className="mb-3">
                                LISTA PRODUCTOS
                            </h1>
                            <div className="d-grid gap-2 mb-3">
                                <Button variant="outline-dark" size="lg">
                                    <Link to='/product/formulario/new'>
                                        NUEVO PRODUCTO
                                    </Link>
                                </Button>
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
                                        <th className="text-center">Editar</th>
                                        <th className="text-center">Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {datosProductos}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
            </div>
        </>
    );
}
 
export default ListaProductos;