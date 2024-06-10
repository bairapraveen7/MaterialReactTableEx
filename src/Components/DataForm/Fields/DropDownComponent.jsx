import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import { Validations } from "../../../validationRules";

export const DropDownComponent = ({
    fieldItem,
    fieldValue,
    error,
    setFormValues,
    setError
  }) => (
    <Grid item xs={6}>
      <Stack
      alignItems="start"
      spacing={2}
      >
    <label style={{fontWeight: 'bold'}}>{fieldItem.name}</label>
    <FormControl sx={{ m: 1,width: "100%" }} error={error ? true : false}>
      <InputLabel id="demo-simple-select-error-label">{fieldItem.name}</InputLabel>
      <Select
        labelId="demo-simple-select-error-label"
        id="demo-simple-select-error"
        value={fieldValue}
        label={fieldItem.name}
        onClose={(e) => {
          for (const eachValidation of fieldItem.validations) {
            if (Validations[eachValidation].fn(e.target.value) == true) {
              setError((prev) => ({
                [fieldItem.id]: Validations[eachValidation].message
              })
              )
              break;
            }else  if(error){
              setError((prev) => ({
                [fieldItem.id]: undefined
              }))
            }
          };
        }}
        onChange={(e) => {
          setFormValues((prev) => ({
            ...prev,
            [fieldItem.id]: e.target.value,
          }));
        }}
      >
        {fieldItem.values?.map((eachValue) => (
          <MenuItem value={eachValue}>{eachValue}</MenuItem>
        ))}
      </Select>
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
    </Stack>
    </Grid>
  );
  