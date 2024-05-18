import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../pages/LoginPage'
import { RegisterUser } from '../components/login/RegisterUser'
import { Home } from '../pages/Home'
import { Diario } from '../pages/Diario'
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
                <Route path="/acceder" element={<LoginPage/>}/>
                <Route path="/registrarme" element={<RegisterUser/>}/>
                <Route path="/diario" element={<Diario/>}/>
            </Routes>
            </div>
            <Pie></Pie>
        </BrowserRouter>   
    )
}