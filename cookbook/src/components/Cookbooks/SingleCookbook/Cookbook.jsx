import "./cookbook.scss";
import DefaultBook from '../../../assets/book2.webp'
import { useState } from "react"

export default function SingleCookbook({ book }) {
  const [height, setDetails] = useState('200px');
  const display = () => setDetails(height === '200px' ? 'auto' : '200px');


  return <>
        <div className="cookbook" key={book.id} onClick={display}>
          <div className="book"
                style={{
                  backgroundImage: `url(${book.image_url_display || DefaultBook})`,
                  height: height,
                  minHeight: '200px'
                }}
          >
            <h3>{book.title}</h3>
            {height === 'auto' &&
                <p className="book-details">
                  <b className="highlighted">Author:</b> <b><i>{book.user.username || book.user.first_name}</i></b><br/>
                  <span className="mini">Created: {new Date(book.created).toLocaleDateString()}</span><br/><br/>
                  <b className="highlighted">Description:</b><br/>
                  <i>{book.description}</i>
                  {height === 'auto' && book.recipes.length &&
                    <>
                    <br/><br/><b className="highlighted">recipes:</b>
                    {book.recipes.map((recipe)=>
                      <h4>♣ {recipe.title}</h4>
                    )}
                    </>
                  }<br/>
                  <span className="mini"><br/>Updated: {new Date(book.updated).toLocaleDateString()}</span>
                  </p>
            }
            
          </div>
          <div className="details">
            <p>{new Date(book.created).toLocaleDateString()}</p>
            <p>recipes: {book.recipes?.length ?? 0}</p>
          </div>
        </div>
      </>
}
