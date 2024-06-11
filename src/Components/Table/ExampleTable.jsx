import {
  Box,
  Button,
  Checkbox,
  Dialog,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  ALPHANUMERIC,
  DROPDOWN,
  NUMERIC,
  REQUIRED,
  TEXTFIELD,
  EMAIL,
  DISPLAYFORM,
} from "../../config";
import { TagsInput } from "react-tag-input-component";
import { DisplayContext, TableContext } from "../../Hooks/Contexts";
import { v4 as uuidv4 } from "uuid";
import { Delete, Edit } from "@mui/icons-material";
const typeOfFieldOptions = [TEXTFIELD, DROPDOWN];

export const ExampleTable = ({ data, setData }) => {
  const { setDisplayTable } = useContext(DisplayContext);
  const { setTable } = useContext(TableContext);
  const [createValue, setCreateValue] = useState([]);
  const [createValidation, setCreateValidation] = useState({
    [EMAIL]: false,
    [REQUIRED]: false,
    [NUMERIC]: false,
    [ALPHANUMERIC]: false,
  });
  const [editValue, setEditValue] = useState([]);
  const [editValidation, setEditValidation] = useState({
    [EMAIL]: false,
    [REQUIRED]: false,
    [NUMERIC]: false,
    [ALPHANUMERIC]: false,
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (row,event,setValidation) => {
    const obj = {};
    for(const x of row.original.validations){

    }
    setAnchorEl(event.currentTarget);
    setValidation({
      [EMAIL]: row.original.validations.includes(EMAIL),
      [REQUIRED]: row.original.validations.includes(REQUIRED),
      [NUMERIC]: row.original.validations.includes(NUMERIC),
      [ALPHANUMERIC]: row.original.validations.includes(ALPHANUMERIC),
    })
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickingCancel = (setValue,setValidation) => (
    setValidationErrors({}),
    setValue([]),
    setValidation({
      [EMAIL]: false,
      [REQUIRED]: false,
      [NUMERIC]: false,
      [ALPHANUMERIC]: false,
    })
  );

  const dropDownValuesComponent = (row,value,setValue) => {
    return (
    <FormControl error={!!validationErrors.values}>
      <TagsInput
        value={row.original.values || value}
        onChange={setValue}
        placeHolder="Type and Enter"
      />
      <FormHelperText>{validationErrors.values}</FormHelperText>
    </FormControl>
    )
  };

  const validationComponent = (row,validation,setValidation) => {
    return (
    <> 
    <Button
      id="basic-button"
      aria-controls={open ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={(event) => handleClick(row,event,setValidation)}
    >
    select Validations
    </Button>
    <FormControl
      sx={{ m: 3 }}
      component="fieldset"
      variant="standard"
      error={!!validationErrors.validations}
    >
    <Menu
    id="basic-menu"
    anchorEl={anchorEl}
    open={open}
    onClose={handleClose}
    MenuListProps={{
      'aria-labelledby': 'basic-button',
    }}
    >
      <FormGroup>
        <MenuItem>
        <FormControlLabel
          control={
            <Checkbox
              name="Required"
              checked={validation[REQUIRED]}
              onChange={() => {
                setValidation((prev) => ({
                  ...prev,
                  [REQUIRED]: !prev[REQUIRED],
                }));
              }}
            />
          }
          label="Requried"
        />
        </MenuItem>
        <MenuItem>
        <FormControlLabel
          control={
            <Checkbox
              name="Email"
              checked={validation[EMAIL]}
              onChange={() => {
                setValidation((prev) => ({
                  ...prev,
                  [EMAIL]: !prev[EMAIL],
                }));
              }}
            />
          }
          label="Email"
        />
        </MenuItem>
        <MenuItem>
        <FormControlLabel
          control={
            <Checkbox
              name="AlphaNumeric"
              checked={validation[ALPHANUMERIC]}
              onChange={() => {
                setValidation((prev) => ({
                  ...prev,
                  [ALPHANUMERIC]: !prev[ALPHANUMERIC],
                }));
              }}
            />
          }
          label="AlphaNumeric"
        />
        </MenuItem>
        <MenuItem>
        <FormControlLabel
          control={
            <Checkbox
              name="Numeric"
              checked={validation[NUMERIC]}
              onChange={() => {
                setValidation((prev) => ({
                  ...prev,
                  [NUMERIC]: !prev[NUMERIC],
                }));
              }}
            />
          }
          label="Only Numeric"
        />
        </MenuItem>
      </FormGroup>
    </Menu>
    <FormHelperText>{validationErrors.validations}</FormHelperText>
    </FormControl>
    </> 
  )};

  const handleCreateField = ({ values, table }) => {
    const validationList = [];
    for (const x in createValidation) {
      if (createValidation[x]) {
        validationList.push(x);
      }
    }
    const user = {
      ...values,
      values: createValue,
      validations: validationList,
    };
    const newValidationErrors = validateUser(user);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    onClickingCancel(setCreateValue,setCreateValidation);
    setData((prevData) => [
      ...prevData,
      {
         ...user,
         id: uuidv4(),
      },
    ]);
    table.setCreatingRow(null);
  };

  const handleUpdateField = ({ values, table }) => {
    const validationList = [];
    for (const x in editValidation) {
      if (editValidation[x]) {
        validationList.push(x);
      }
    }
    const user = {
      ...values,
      values: editValue,
      validations: validationList,
    };
    const newValidationErrors = validateUser(user);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    onClickingCancel(setEditValue,setEditValidation);
    setData((prevData) =>
      prevData.map((eachData) => {
        return eachData.id === values.id ? user : eachData;
      })
    );
    table.setEditingRow(null);
  };

  const columns = useMemo(() => [
    {
      accessorKey: "id",
      header: "id",
      enableEditing: false,
    },
    {
      accessorKey: "name",
      header: "Name of Field",
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
      accessorKey: "type",
      header: "Type of Field",
      editVariant: "select",
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
      accessorKey: "values",
      header: "DropdownValues",
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
      Edit: ({ row }) => (
        <>{row.id == "mrt-row-create" ?  dropDownValuesComponent(row,createValue,setCreateValue) : dropDownValuesComponent(row,editValue,setEditValue)}</>
      ),
      Cell: ({ cell, row }) => (
        <>
          {row.original.type == TEXTFIELD ? (
            <p>NA</p>
          ) : (
            cell.getValue().join(",")
          )}
        </>
      ),
    },
    {
      accessorKey: "validations",
      header: "Validations",
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
      Edit: ({ row }) => {
        return (
          <>
            {row.id == "mrt-row-create"
              ?  validationComponent(row,createValidation,setCreateValidation) : validationComponent(row,editValidation,setEditValidation)}
          </>
        );
      },
      Cell: ({ cell }) => (
        <>
          {cell.getValue().length == 0 ? (
            <p>NA</p>
          ) : (
            <p>{cell.getValue().join(",")}</p>
          )}
        </>
      ),
    },
    {
      accessorKey: "order",
      header: "order",
    },
  ]);
  const table = useMaterialReactTable({
    columns,
    data,
    createDisplayMode: "row",
    editDisplayMode: "row",
    enableEditing: true,
    getRowId: (row) => row.id,
    onCreatingRowCancel: () => onClickingCancel(setCreateValue,setCreateValidation),
    onCreatingRowSave: handleCreateField,
    onEditingRowCancel: () => onClickingCancel(setEditValue,setEditValidation),
    onEditingRowSave: handleUpdateField,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error">
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Create New Field
      </Button>
    ),
  });
  return (
    <React.Fragment>
      <MaterialReactTable table={table} />
      <Button
        variant="contained"
        color="success"
        sx={{ m: "2rem" }}
        onClick={() => {
          setTable(table);
          setDisplayTable(DISPLAYFORM);
        }}
      >
        Convert To Form
      </Button>
    </React.Fragment>
  );
};

const validateUser = (user) => {

  const obj = {};
  if (user.name == "") {
    obj["name"] = "Name can' be defined";
  }
  if (user.type == "") {
    obj["type"] = "Type can't be defined";
  }
  if (user.type == DROPDOWN && user.values.length == 0) {
    obj["values"] = "values can't be blank";
  }
  if (user.type == TEXTFIELD && user.values.length > 0) {
    obj["values"] = "No values in case of textfield";
  }
  if(user.type == DROPDOWN && user.validations.includes(EMAIL)){
    obj["validations"] = "Email should not be selected for dropdown"
  }
  if (
    user.validations.includes(NUMERIC) &&
    user.validations.includes(ALPHANUMERIC)
  ) {
    obj["validations"] = "Numeric and Alphanumeric can't be checked";
  }
  return obj;
};
