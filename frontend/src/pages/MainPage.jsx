import {useDispatch, useSelector} from "react-redux";
import {fetchCategories, fetchCategory} from "../slices/categorySlice.js";

export default function MainPage(){
    const category = useSelector((s)=> s.categories.item)
    const user = useSelector((s)=> s.auth.user)
    const dispatch = useDispatch()

    return <>
        <button onClick={async ()=> {
            await dispatch(fetchCategory(user.id))
        }}>Fetch Categories</button>
        <button onClick={()=> {
            console.log(category)
        }}>See Categories</button>
    </>
}