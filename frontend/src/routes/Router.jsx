import {Route, Routes, BrowserRouter} from "react-router";
import Layout from "../layouts/Layout.jsx";
import NotFound from "../pages/NotFound.jsx";
import MainPage from "../pages/MainPage.jsx";
import ProjectsPage from "../pages/ProjectsPage.jsx";
import {useDispatch, useSelector} from "react-redux";
import CategoryPage from "../pages/CategoryPage.jsx";
import {useEffect} from "react";
import {fetchCategories} from "../slices/categorySlice.js";
import {fetchSections} from "../slices/sectionSlice.js";
import AuthInit from "../components/Auth/AuthInit.jsx";

const slug = (s) => encodeURIComponent(s.toLowerCase().replace(/\s+/g, "-"));

export default function Router () {
    const dispatch = useDispatch()
    const categories = useSelector((s) => s.categories.items)
            .filter((category)=> category.name.toLowerCase()!=='projects')

    useEffect(()=>{
        dispatch(fetchCategories())
        dispatch(fetchSections())
    }, [])

    return <BrowserRouter>
        <AuthInit/>

        <Routes>

            <Route path='/' element={<Layout/>}>
                <Route path='' element={<MainPage/>}/>
                <Route path='projects/' element={<ProjectsPage/>}/>
                {categories.map((category)=><>
                <Route path={`${slug(category.name)}/`} element={<CategoryPage category={category}/>}/>
                </>)}
            </Route>

            <Route path='*' element={<NotFound/>}/>

        </Routes>
    </BrowserRouter>
}