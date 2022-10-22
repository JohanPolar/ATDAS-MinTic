import React from 'react';
import './App.css';
import ListaProductos from './componentes/ListaProductos';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Inicio from './componentes/Inicio';
import Catalogo from './componentes/Catalogo';
import FormularioProductos from './componentes/FormularioProductos';import FormularioEditar from './componentes/FormularioEditar';
;


function App() {
    console.log();
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Inicio/>}/>
                <Route path='/product/obtainEvery' element={<ListaProductos/>}/>
                <Route path='/product/formulario/new' element={<FormularioProductos/>}/>
                <Route path='/product/formularioEdit/:id' element={<FormularioEditar/>}/>
                <Route path='/product/catalogo' element={<Catalogo/>}/>
            </Routes>
        </Router>
    )
}

export default App;