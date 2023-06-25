import {BrowserRouter} from "react-router-dom";
import {Navbar, MainPage, StarsCanvas, Connect} from './components'
const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <MainPage />
          <StarsCanvas />
        </div>
      </div>
      <div className="relative z-0">
        <Connect />
      </div>
    </BrowserRouter>
  )
}
export default App
