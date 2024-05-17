
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TodoListPage } from '../pages/TodoListPage'
import { LoginPage } from '../pages/LoginPage'
import { RegisterUser } from '../components/login/RegisterUser'
import { Home } from '../pages/Home'
export function RoutePage (){
    return(
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={<Home/>}/> */}
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterUser/>}/>
                <Route path="/Home" element={<Home/>}/>
                <Route path="/todo-list" element={<TodoListPage/>}/>
            </Routes>
        </BrowserRouter>   
    )
}