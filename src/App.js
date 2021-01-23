import store from './redux-local'
import { Provider } from 'react-redux'
import Routes from './components/Routes'

function App () {
  return (
    <Provider store={store}>
      <Routes>
        <div className='App' />
      </Routes>
    </Provider>
  )
}

export default App
