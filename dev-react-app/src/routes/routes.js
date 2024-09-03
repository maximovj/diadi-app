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

export const Rutas = {
    // Se define rutas, para rutas publicas
    HOME: '/',
    INICIO: '/inicio',
    ACCEDER: '/acceder',
    REGISTRARME: '/registrarme',

    // Se define rutas, para rutas protegidas
    PANEL: '/panel',
    DIARIOS: '/diarios',
    DIARIOS_EDITAR: '/diario/editar',
    TAREAS: '/tareas',
    TAREAS_EDITAR: '/acceder',
    CUENTA_CONFIGURAR: '/cuenta/configurar',
};

export function RoutePage() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <NavBar />
                <div className='container container-css my-4'>
                    <Routes>
                        {/* Rutas públicas */}
                        <Route path={Rutas.HOME} element={<RutaPublica><Inicio /></RutaPublica>} />
                        <Route path={Rutas.INICIO} element={<RutaPublica><Inicio /></RutaPublica>} />
                        <Route path={Rutas.ACCEDER} element={<RutaPublica><Acceder /></RutaPublica>} />
                        <Route path={Rutas.REGISTRARME} element={<RutaPublica><Registrarme /></RutaPublica>} />

                        {/* Rutas protegidas */}
                        <Route path={Rutas.PANEL} element={<RutaProtegida><Panel /></RutaProtegida>} />
                        <Route path={Rutas.DIARIOS_EDITAR} element={<RutaProtegida> <EditarDiario /> </RutaProtegida>} />
                        <Route path={Rutas.TAREAS_EDITAR} element={<RutaProtegida> <EditarTarea /> </RutaProtegida>} />
                        <Route path={Rutas.CUENTA_CONFIGURAR} element={<RutaProtegida><ConfigurarCuenta /></RutaProtegida>} />
                        <Route path={Rutas.DIARIOS} element={<RutaProtegida><Diarios /></RutaProtegida>} />
                        <Route path={Rutas.TAREAS} element={<RutaProtegida><Tareas /></RutaProtegida>} />
                    </Routes>
                </div>
                <Pie />
            </AuthProvider>
        </BrowserRouter>
    );
}