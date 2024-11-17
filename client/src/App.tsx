// import Chat from './components/Chat'
// import Nav from "./components/Nav";
import Cards from './components/Cards'
import Deck from './components/Deck.tsx'

function App() {

  return (
    <div className='flex flex-col lg:flex-row'>
      {/*<Nav />*/}
      <Deck />
      <Cards />
      {/*<Chat />*/}
      {/* <Mapbox/> */}
    </div>
  )
}

export default App
