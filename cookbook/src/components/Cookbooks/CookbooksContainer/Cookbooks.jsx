import './cookbooks.scss'
import SingleCookbook from '../SingleCookbook/Cookbook'
import { Link } from 'react-router-dom'

export default function Cookbooks ({cookbooks}) {
    return <>
        <div className="cookbooks-container">
        <h2 className='main-title'>Cookbooks</h2>
        
        <div className='book-item'>
        {
        cookbooks.map((book) => (
        <SingleCookbook book={book} key={book.id}/>
                ))
            }
            </div>
            

            
        </div>
    </>
}