import './notFound.scss'
import NOtFound from '../assets/404.jpg'

const NotFound = () => {
    return (
            <div className='not-found-outer'>
                <h1 className="not-found-page">The page you&apos;re looking for does not exist</h1>
                <img src={NOtFound} alt='404'/>
            </div>
             )
}

export default NotFound
