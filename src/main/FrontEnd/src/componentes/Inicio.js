import { Button, Container} from "react-bootstrap";
import { Link } from "react-router-dom";
import AlertDismissible from "./AlertDismissible";
import './detalles.css'
import HeaderApp from "./HeaderApp";

const Inicio = () => {
    return ( 
        <div style={
            {
                backgroundImage : `url("https://static.vecteezy.com/system/resources/previews/002/937/591/non_2x/light-gray-gradient-blur-backdrop-vector.jpg")`,
                height:'100vh'
            }
        }>
            <AlertDismissible/>
            <HeaderApp/>
            <Container fluid>
                <h1 className="text-dark text-center espacio">
                    <hr></hr>
                    BIENVENIDO
                </h1>
                <hr></hr>
                <h1 className="text-dark text-center">
                    A TIRO DE AS
                </h1>
                <hr></hr>
                <ul className="text-center mt-5">
                    <Link to="/product/obtainEvery">
                        <Button variant="outline-dark btn-lg" className="me-5">
                            LISTADO DE PRODUCTOS
                        </Button>
                    </Link>
                    <Link to="/product/catalogo">
                        <Button variant="outline-dark btn-lg">
                            CATALOGO DE PRODUCTOS
                        </Button>
                    </Link>
                </ul>
            </Container>
        </div>
     );
}
 
export default Inicio;