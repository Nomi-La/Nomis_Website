import './sass/main.scss'
import { useSelector, useDispatch } from 'react-redux'
import { setMessage } from './store/slice/testSlice'

function App() {
  const message = useSelector(state => state.test.message)
  const dispatch = useDispatch()

  return (
    <div>
      <h1>CookBook App</h1>
      <p>{message}</p>
      <button onClick={() => dispatch(setMessage('Updated from UI!'))}>
        Change Message
      </button>
    </div>
  )
}
export default App