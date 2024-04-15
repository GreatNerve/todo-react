

import Todo from './components/Todo'
import { Provider } from 'react-redux'
import {store} from './lib/store'
import { Toaster } from "@/components/ui/toaster"
import Footer from './components/Footer'

function App() {

  return (
    <Provider store={store}>
        <header className="App-header mt-12">
          <h1 className='text-center text-4xl font-bold text-primary'>Todo App</h1>
        </header>
          <Todo />
          <Toaster />
          <Footer />
    </Provider>
  )

}

export default App
