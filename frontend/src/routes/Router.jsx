import {Route, Routes, BrowserRouter} from "react-router";
import Layout from "../layouts/Layout.jsx";
import NotFound from "../pages/NotFound.jsx";
import MainPage from "../pages/MainPage.jsx";
import ProjectsPage from "../pages/ProjectsPage.jsx";
import {useSelector} from "react-redux";
import CategoryPage from "../pages/CategoryPage.jsx";

export default function Router () {

    const categories = useSelector((s) => s.categories.items)

    return <BrowserRouter>
        <Routes>

            <Route path='/' element={<Layout/>}>
                <Route path='' element={<MainPage/>}/>
                <Route path='projects/' element={<ProjectsPage/>}/>
                {categories.map((category)=><>
                <Route path={`${category.name}/`} element={<CategoryPage category={category}/>}/>
                </>)}
            </Route>

            <Route path='*' element={<NotFound/>}/>

        </Routes>
    </BrowserRouter>
}