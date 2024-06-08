import React, { useContext, useState } from "react";
import { TableContext } from "../../Hooks/Contexts";
import { MakeForm } from "../DataForm/MakeForm";

export const Form = () => {
    const {table} = useContext(TableContext);
    const rows =  table.getRowModel().rows.map((eachRow) => eachRow.original);
    const [formValues,setFormValues] = useState({});
  
  return (
    <div className="App">
       <MakeForm formData={rows} formValues={formValues} setFormValues={setFormValues}/> 
    </div>
  
  );
}