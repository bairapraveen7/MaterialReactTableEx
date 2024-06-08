import logo from './logo.svg';
import './App.css';
import { Table } from '@mui/material';
import {ExampleTable} from './Components/ExampleTable';
import { DisplayContext,TableContext } from './Hooks/Contexts';
import { Form } from './Components/Form/Form';
import { useState } from 'react';

function App() {
  const [table,setTable] = useState();
  const [data,setData] = useState([]);
  const [displayTable,setDisplayTable] = useState(true);
  return (
    <div className="App">
      <TableContext.Provider value={{
        table,setTable
      }}>
      <DisplayContext.Provider value={{
        displayTable,setDisplayTable
      }}>
      {displayTable ? <ExampleTable data={data} setData={setData} /> : <Form /> }
      </DisplayContext.Provider>
      </TableContext.Provider>
    </div>
  );
}

export default App;
