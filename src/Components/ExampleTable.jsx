import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText } from "@mui/material";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import React, { useContext, useMemo, useState } from "react";
import { ALPHANUMERIC, DROPDOWN, NUMERIC, REQUIRED, TEXTFIELD,EMAIL, DISPLAYFORM } from "../config";
import { TagsInput } from "react-tag-input-component";
import { DisplayContext, TableContext } from "../Hooks/Contexts";
import { v4 as uuidv4 } from 'uuid';
const typeOfFieldOptions = [TEXTFIELD,DROPDOWN];

export const ExampleTable = ({data,setData}) => {
  
  const [value,setValue] = useState([]);
  const [validation,setValidation] = useState({
    [EMAIL]: false,
    [REQUIRED]:false,
    [NUMERIC]:false,
    [ALPHANUMERIC]:false
  });
  const [validationErrors,setValidationErrors] = useState({});
  const call = () => {};
  const {setDisplayTable} = useContext(DisplayContext);
  const {setTable} = useContext(TableContext);

  const handleCreateField = ({values,table}) => {
    console.log(values);
    // const validationList = [];
    // for(const x in validation){
    //   if(validation[x]){
    //     validationList.push(x);
    //   }
    // }
    // const user = {
    //   ...values,
    //   values: value,
    //   validations:validationList 
    // }
    // const newValidationErrors = validateUser(user);
    // if (Object.values(newValidationErrors).some((error) => error)) {
    //   setValidationErrors(newValidationErrors);
    //   return;
    // }
    // setValidationErrors({});
    // setData((prevData) => [
    //   ...prevData,
    //   {
    //     ...values,
    //     id: uuidv4(),
    //     values:value,
    //     validations: validationList
    //   }
    // ]);
    table.setCreatingRow(null);
  }

  const handleUpdateField = ({values,table}) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    setData((prevData) => 
    prevData.map((eachData) => {
      return eachData.id === values.id ? values : eachData;
    })
  );
    table.setEditingRow(null);  
  }

  const columns = useMemo(() => [
    {
      accessorKey: 'id',
      header: 'id',
      enableEditing: false,
    },
    {
      accessorKey: 'name',
      header: 'Name of Field',
      muiEditTextFieldProps: {
        required: true,
        error: !!validationErrors?.name,
        helperText: validationErrors?.name,
        //remove any previous validation errors when user focuses on the input
        onFocus: () =>
          setValidationErrors({
            ...validationErrors,
            name: undefined,
          }),
      },
    },
    {
      accessorKey: 'type',
      header: 'Type of Field',
      editVariant: 'select',
      editSelectOptions: typeOfFieldOptions,
      muiEditTextFieldProps: {
        required: true,
        error: !!validationErrors?.type,
        helperText: validationErrors?.type,
        //remove any previous validation errors when user focuses on the input
        onFocus: () =>
          setValidationErrors({
            ...validationErrors,
            type: undefined,
          }),
      },
    },
    {
      accessorKey: 'values',
      header: 'DropdownValues',
      muiEditTextFieldProps: {
        required: true,
        error: !!validationErrors?.values,
        helperText: validationErrors?.values,
        //remove any previous validation errors when user focuses on the input
        onFocus: () =>
          setValidationErrors({
            ...validationErrors,
            type: undefined,
          }),
      },
      Edit: ({row}) => (
          <FormControl error={!!validationErrors.values}>
          <TagsInput value={value} onChange={setValue} onBlur={() => {
            setData((prev) => ({
              ...prev,
              values: value
            }))
          }}  placeHolder="Type and Enter" />
          <FormHelperText>{validationErrors.values}</FormHelperText>
          </FormControl>
  ),
  Cell: ({cell,row}) =>  (
    <>
    {
      row.original.type == TEXTFIELD ? <p>NA</p> : cell.getValue().join(",")
    }
    </>
)
      
    },
    {
      accessorKey: 'validations',
      header: 'Validations',
      muiEditTextFieldProps: {
        required: true,
        error: !!validationErrors?.validation,
        helperText: validationErrors?.validation,
        //remove any previous validation errors when user focuses on the input
        onFocus: () =>
          setValidationErrors({
            ...validationErrors,
            type: undefined,
          }),
      },
      Edit: ({row,error}) => (
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard" error={!!validationErrors.validations}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox name="Required" onChange={() => setValidation((prev) => ({
              ...prev,
              [REQUIRED]:!prev[REQUIRED]
            }))}
             />}
            label="Requried"
          />
          <FormControlLabel control={<Checkbox name="Email" onChange={() => {
            console.log("hi")
            setValidation((prev) => ({
              ...prev,
              [EMAIL]:(!prev[EMAIL])
            }))}}  />} 
          label="Email" />
          <FormControlLabel
            control={<Checkbox name="AlphaNumeric" onChange={() => setValidation((prev) => ({
              ...prev,
              [ALPHANUMERIC]:!prev[ALPHANUMERIC]
            }))} />}
            label="AlphaNumeric"
          />
          <FormControlLabel
            control={<Checkbox name="Numeric"  onChange={() => setValidation((prev) => ({
              ...prev,
              [NUMERIC]:!prev[NUMERIC]
            }))} />}
            label="Only Numeric"
          />
        </FormGroup>
        <FormHelperText>{validationErrors.validations}</FormHelperText>
      </FormControl>
      ),
      Cell: ({cell}) =>  (
           <>{cell.getValue().join(",")}</>
      )
    },
    {
      accessorKey: 'order',
      header: 'order'
    }
  ])
  const table = useMaterialReactTable({
    columns,data,
    createDisplayMode: 'row',
    editDisplayMode: 'row',
    enableEditing: true,
    getRowId: (row) => row.id,
    onCreatingRowCancel: () =>  call(),
    onCreatingRowSave:  handleCreateField,
    onEditingRowCancel: () => call(),
    onEditingRowSave:  handleUpdateField,
    renderTopToolbarCustomActions: ({table}) =>  (
      <Button
      variant="contained"
      onClick={() => {
        table.setCreatingRow(true)
      }}
      >
        Create New Field
      </Button>
    )
  })
  return (
    <React.Fragment>
<MaterialReactTable table={table} />
<Button variant="contained" color="success" sx={{m: '2rem'}} onClick={() => {
  setTable(table);
  setDisplayTable(DISPLAYFORM)
}}
  >Convert To Form</Button>
</React.Fragment>
  )
}

const validateUser = (user) => {
  const obj = {};
    if(user.name == ''){
      obj['name'] = "Name can' be defined"
    }
    if(user.type == ''){
      obj['type']= "Type can't be defined"
    }
    if(user.type == DROPDOWN && user.values.length == 0){
      obj['values'] = "values can't be blank"
    }
    if(user.type == TEXTFIELD && user.values.length>0){
      obj['values'] = "No values in case of textfield"
    }
    if(user.validations.includes(NUMERIC) && user.validations.includes(NUMERIC)){
      obj['validations'] = "Numeric and Alphanumeric can't be checked"
    }
    return obj;
}