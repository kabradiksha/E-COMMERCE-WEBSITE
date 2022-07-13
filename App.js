// back-end files name- main.js, product.js

import './App.css';
import Nav from './components/nav';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Footer from './components/footer';
import Signup from './components/signup';
import Privatecomponent from './components/privatecomponent';
import Login from './components/login';
import AddProduct from './components/AddProduct';
import ProductList from './components/productList';
import UpdateProduct from './components/Updateproduct';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
      <Routes>

        <Route element= {<Privatecomponent />}>
          <Route path='/' element={< ProductList/>} />
          <Route path='/add' element={<AddProduct/>} />
          <Route path='/update/:id' element={< UpdateProduct/>} />
          <Route path='/logout' element={<h1>logout Component</h1>} />
        </Route>

          <Route path='/Signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
      </Routes>
      {/* <h1>E-Dashboard</h1> */}
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
