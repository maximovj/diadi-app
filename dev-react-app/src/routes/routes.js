import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Acceder } from '../components/Acceder'
import { Registrarme } from '../components/Registrarme'
import { Home } from '../pages/Home'
import { Diarios } from '../components/Diarios'
import { NavBar } from '../components/NavBar'
import { Pie } from '../components/Pie'
import { Tareas } from '../components/Tareas'

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