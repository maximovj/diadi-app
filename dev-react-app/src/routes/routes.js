import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Acceder } from '../pages/Acceder'
import { Registrarme } from '../pages/Registrarme'
import { Home } from '../pages/Home'
import { Diarios } from '../pages/Diarios'
import { Tareas } from '../pages/Tareas'
import { NavBar } from '../components/NavBar'
import { Pie } from '../components/Pie'

export function RoutePage (){
    return(
        <BrowserRouter>
            <NavBar></NavBar>
            <div className='container container-css my-4'>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/inicio" element={<Home/>}/>
                <Route path="/acceder" element={<Acceder/>}/>
                <Route path="/registrarme" element={<Registrarme/>}/>
                <Route path="/diarios" element={<Diarios/>}/>
                <Route path="/tareas" element={<Tareas/>}/>
            </Routes>
            </div>
            <Pie></Pie>
        </BrowserRouter>   
    )
}