import {Route, Routes, BrowserRouter} from "react-router";
import Layout from "../layouts/Layout.jsx";
import NotFound from "../pages/NotFound.jsx";
import MainPage from "../pages/MainPage.jsx";
import ProjectsPage from "../pages/ProjectsPage.jsx";

export default function Router () {
    return <BrowserRouter>
        <Routes>

            <Route path='/' element={<Layout/>}>
                <Route path='' element={<MainPage/>}/>
                <Route path='projects/' element={<ProjectsPage/>}/>
            </Route>

            <Route path='*' element={<NotFound/>}/>

        </Routes>
    </BrowserRouter>
}