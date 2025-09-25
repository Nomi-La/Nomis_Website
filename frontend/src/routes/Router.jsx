import {BrowserRouter, Route, Routes} from "react-router";
import Layout from "../layouts/Layout.jsx";
import NotFound from "../pages/NotFound.jsx";
import MainPage from "../pages/MainPage.jsx";
import ProjectsPage from "../pages/ProjectsPage.jsx";
import {useDispatch, useSelector} from "react-redux";
import SectionPage from "../pages/SectionPage.jsx";
import {useEffect} from "react";
import {fetchCategories} from "../slices/categorySlice.js";
import {fetchSections} from "../slices/sectionSlice.js";
import AuthInit from "../components/Auth/AuthInit.jsx";
import {hasNonLatin, slug, sortApiAscending} from "../utils/aids.js";

export default function Router() {
    const user = useSelector((s) => s.auth.user)
    const dispatch = useDispatch()
    const categories = useSelector((s) => s.categories.items)
        .filter((category) => category.name.toLowerCase() !== 'projects')
        .sort(sortApiAscending())

    const projectsCategory = useSelector((s) => s.categories.items)
        .find((category) => category.name.toLowerCase() === 'projects')


    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(fetchSections())
    }, [])

    return <BrowserRouter>
        <AuthInit/>

        <Routes>

            <Route path='/' element={<Layout/>}>

                <Route path='' element={<MainPage user={user}/>}/>

                {projectsCategory &&
                    <Route path='projects/' element={

                        <ProjectsPage categoryId={projectsCategory.id} user={user}/>

                    }/>}

                {categories.map((category, index) => <>
                    <Route key={category.id}
                           path={hasNonLatin(category.name) ? `/sec-${category.id}` : `/${slug(category.name, category.id)}`}
                           element={

                               <SectionPage category={category} user={user} categories={categories} index={index}/>

                           }/>
                </>)}

            </Route>

            <Route path='*' element={<NotFound/>}/>

        </Routes>
    </BrowserRouter>
}