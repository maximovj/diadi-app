import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RutaProtegida } from '../components/RutaProtegida';
import { RutaPublica } from '../components/RutaPublica';
import { Acceder } from '../pages/auth/Acceder';
import { Registrarme } from '../pages/auth/Registrarme';
import { Inicio } from '../pages/Inicio';
import { NavBar } from '../components/NavBar';
import { Pie } from '../components/Pie';
import { AuthProvider } from '../context/AuthContext';
import { Panel } from '../pages/cuenta/Panel';
import { ConfigurarCuenta } from '../pages/cuenta/ConfigurarCuenta';
import { EditarDiario } from '../pages/diario/EditarDiario';
import { Diarios } from '../pages/diario/Diarios';
import { Tareas } from '../pages/tareas/Tareas';
import { EditarTarea } from '../pages/tareas/EditarTarea';

export function RoutePage() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <NavBar />
                <div className='container container-css my-4'>
                    <Routes>
                        {/* Rutas públicas */}
                        <Route path="/" element={<RutaPublica><Inicio /></RutaPublica>} />
                        <Route path="/inicio" element={<RutaPublica><Inicio /></RutaPublica>} />
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