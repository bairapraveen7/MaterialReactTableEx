import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
} from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React, { useContext, useMemo, useState } from "react";
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
const typeOfFieldOptions = [TEXTFIELD, DROPDOWN];

export const ExampleTable = ({ data, setData }) => {
  const { setDisplayTable } = useContext(DisplayContext);
  const { setTable } = useContext(TableContext);
  const [value, setValue] = useState([]);
  const [validation, setValidation] = useState({
    [EMAIL]: false,
    [REQUIRED]: false,
    [NUMERIC]: false,
    [ALPHANUMERIC]: false,
  });
  const [validationErrors, setValidationErrors] = useState({});

  const onCreatingRowCancel = () => (
    setValidationErrors({}),
    setValue([]),
    setValidation({
      [EMAIL]: false,
      [REQUIRED]: false,
      [NUMERIC]: false,
      [ALPHANUMERIC]: false,
    })
  );

  const valuesEdit = (row) => (
    <FormControl error={!!validationErrors.values}>
      <TagsInput
        value={row.original.values}
        onChange={(newTags) => {
          const newData = data.map((item) => {
            if (item.id == row.original.id) {
              return {
                ...item,
                values: newTags,
              };
            }
            return item;
          });
          setData(newData);
        }}
        placeHolder="Type and Enter"
      />
      <FormHelperText>{validationErrors.values}</FormHelperText>
    </FormControl>
  );

  const valuesCreate = (row) => (
    <FormControl sx={{width: '100%'}} error={!!validationErrors.values}>
      <TagsInput
        value={value}
        onChange={setValue}
        placeHolder="Type and Enter"
        style={{width: '100%'}}
      />
      <FormHelperText>{validationErrors.values}</FormHelperText>
    </FormControl>
  );

  const validationsEdit = (row) => (
    <Box component="div" sx={{height:'2rem', overflowY: 'scroll'}}>
    <FormControl
      sx={{ m: 3 }}
      component="fieldset"
      variant="standard"
      error={!!validationErrors.validations}
    >
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              name="Required"
              checked={row.original.validations.includes(REQUIRED)}
              onChange={() => {
                const newData = data.map((item) => {
                  if (item.id == row.original.id) {
                    if (item.validations.includes(REQUIRED)) {
                      item.validations = item.validations.filter(
                        (x) => x != REQUIRED
                      );
                    } else {
                      item.validations.push(REQUIRED);
                    }
                  }
                  return item;
                });
                setData(newData);
              }}
            />
          }
          label="Requried"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="Email"
              checked={row.original.validations.includes(EMAIL)}
              onChange={() => {
                const newData = data.map((item) => {
                  if (item.id == row.original.id) {
                    if (item.validations.includes(EMAIL)) {
                      item.validations = item.validations.filter(
                        (x) => x != EMAIL
                      );
                    } else {
                      item.validations.push(EMAIL);
                    }
                  }
                  return item;
                });
                setData(newData);
              }}
            />
          }
          label="Email"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="AlphaNumeric"
              checked={row.original.validations.includes(ALPHANUMERIC)}
              onChange={() => {
                const newData = data.map((item) => {
                  if (item.id == row.original.id) {
                    if (item.validations.includes(ALPHANUMERIC)) {
                      item.validations = item.validations.filter(
                        (x) => x != ALPHANUMERIC
                      );
                    } else {
                      item.validations.push(ALPHANUMERIC);
                    }
                  }
                  return item;
                });
                setData(newData);
              }}
            />
          }
          label="AlphaNumeric"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="Numeric"
              checked={row.original.validations.includes(NUMERIC)}
              onChange={() => {
                const newData = data.map((item) => {
                  if (item.id == row.original.id) {
                    if (item.validations.includes(NUMERIC)) {
                      item.validations = item.validations.filter(
                        (x) => x != NUMERIC
                      );
                    } else {
                      item.validations.push(NUMERIC);
                    }
                  }
                  return item;
                });
                setData(newData);
              }}
            />
          }
          label="Only Numeric"
        />
      </FormGroup>
      <FormHelperText>{validationErrors.validations}</FormHelperText>
    </FormControl>
    </Box>
  );

  const validationsCreate = () => (
    <FormControl
      sx={{ m: 3 }}
      component="fieldset"
      variant="standard"
      error={!!validationErrors.validations}
    >
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              name="Required"
              onChange={() => {
                setValidation((prev) => ({
                  ...validation,
                  [REQUIRED]: !prev[REQUIRED],
                }));
              }}
            />
          }
          label="Requried"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="Email"
              onChange={() => {
                setValidation((prev) => ({
                  ...validation,
                  [EMAIL]: !prev[EMAIL],
                }));
              }}
            />
          }
          label="Email"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="AlphaNumeric"
              onChange={() => {
                setValidation((prev) => ({
                  ...validation,
                  [ALPHANUMERIC]: !prev[ALPHANUMERIC],
                }));
              }}
            />
          }
          label="AlphaNumeric"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="Numeric"
              onChange={() => {
                setValidation((prev) => ({
                  ...validation,
                  [NUMERIC]: !prev[NUMERIC],
                }));
              }}
            />
          }
          label="Only Numeric"
        />
      </FormGroup>
      <FormHelperText>{validationErrors.validations}</FormHelperText>
    </FormControl>
  );

  const handleCreateField = ({ values, table }) => {
    const validationList = [];
    for (const x in validation) {
      if (validation[x]) {
        validationList.push(x);
      }
    }
    const user = {
      ...values,
      values: value,
      validations: validationList,
    };
    const newValidationErrors = validateUser(user);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    setValue([]);
    setData((prevData) => [
      ...prevData,
      {
        ...values,
        id: uuidv4(),
        values: value,
        validations: validationList,
      },
    ]);
    table.setCreatingRow(null);
  };

  const handleUpdateField = ({ values, table }) => {
    console.log("the edit",values);
    const item = data.filter((x) => x.id == values.id);
    const newValues = {
      ...item[0],
      name: values.name || item[0].name,
      type: values.type || item[0].name,
      order: values.order || item[0].order
    };
    const newValidationErrors = validateUser(newValues);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    setData((prevData) =>
      prevData.map((eachData) => {
        return eachData.id === values.id ? newValues : eachData;
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
        <>{row.id == "mrt-row-create" ? valuesCreate(row) : valuesEdit(row)}</>
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
              ? validationsCreate(row)
              : validationsEdit(row)}
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
    onCreatingRowCancel: () => onCreatingRowCancel(),
    onCreatingRowSave: handleCreateField,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleUpdateField,
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
  console.log(user);
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
  if (
    user.validations.includes(NUMERIC) &&
    user.validations.includes(NUMERIC)
  ) {
    obj["validations"] = "Numeric and Alphanumeric can't be checked";
  }
  return obj;
};
