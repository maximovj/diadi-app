import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Acceder } from '../pages/Acceder'
import { Registrarme } from '../pages/Registrarme'
import { Home } from '../pages/Home'
import { Diarios } from '../pages/Diarios'
import { Tareas } from '../pages/Tareas'
import { NavBar } from '../components/NavBar'
import { Pie } from '../components/Pie'
import { Panel } from '../pages/Panel'
import { RutaProtegida } from '../components/RutaProtegida'
import { RutaPublica } from '../components/RutaPublica'
import { AuthProvider } from '../context/AuthContext';
import { ConfigurarCuenta } from '../pages/cuenta/ConfigurarCuenta';
import { EditarDiario } from '../pages/diario/EditarDiario'
import { EditarTarea } from '../pages/tareas/EditarTarea'

export function RoutePage() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <NavBar />
                <div className='container container-css my-4'>
                    <Routes>
                        {/* Rutas públicas */}
                        <Route path="/" element={<RutaPublica><Home /></RutaPublica>} />
                        <Route path="/inicio" element={<RutaPublica><Home /></RutaPublica>} />
                        <Route path="/acceder" element={<RutaPublica><Acceder /></RutaPublica>} />
                        <Route path="/registrarme" element={<RutaPublica><Registrarme /></RutaPublica>} />

                        {/* Rutas protegidas */}
                        <Route path="/panel" element={<RutaProtegida><Panel /></RutaProtegida>} />
                        <Route path='/diario/editar' element={<RutaProtegida> <EditarDiario /> </RutaProtegida>} />
                        <Route path='/tareas/editar' element={<RutaProtegida> <EditarTarea /> </RutaProtegida>} />
                        <Route path="/cuenta/configurar" element={<RutaProtegida><ConfigurarCuenta /></RutaProtegida>} />
                        <Route path="/diarios" element={<RutaProtegida><Diarios /></RutaProtegida>} />
                        <Route path="/tareas" element={<RutaProtegida><Tareas /></RutaProtegida>} />
                    </Routes>
                </div>
                <Pie />
            </AuthProvider>
        </BrowserRouter>
    );
}