import { useState } from 'react';
import './App.css';
import AddProducts from './components/AddProducts';
import ProductsDisplay from './components/ProductsDisplay';

function App() {
  const [refresh, setRefresh] = useState(false);
  return (
    <div className='bg-black'>
     <h1 className="text-5xl font-semibold underline text-white text-center py-4">Product's Management</h1>
     <AddProducts setRefresh={setRefresh}/>
     <ProductsDisplay refresh={refresh}/>
    </div>
  );
}

export default App;
