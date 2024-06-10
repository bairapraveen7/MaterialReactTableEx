import { FormControl, FormControlLabel, FormLabel, Grid, InputLabel, Stack, TextField, Typography } from "@mui/material";
import { Validations } from "../../../validationRules";

export const TextFieldComponent = ({
    fieldItem,
    error,
    fieldValue,
    setFormValues,
    setError
  }) => (
    <Grid item xs={6}>
      <Stack
      alignItems="start"
      spacing={2}
      >
        <label style={{fontWeight: 'bold'}}>{fieldItem.name}</label>
     
    <TextField
      aria-labelledby="its-the-label"
      error={error ? true : false}
      id="filled-error-helper-text"
      value={fieldValue}
      helperText={error}
      placeholder={fieldItem.name}
      fullWidth
      onBlur={(e) => {
        for (const eachValidation of fieldItem.validations) {
          if (Validations[eachValidation].fn(e.target.value)) {
            setError({
              [fieldItem.id]: Validations[eachValidation].message
            })
            break;
          }else  if(error){
            setError({
              [fieldItem.id]: undefined
            })
          }
        };
      }}
      onChange={(e) => {
        setFormValues((prev) => ({
          ...prev,
          [fieldItem.id]: e.target.value,
        }));
      }}
    />
     </Stack>
    
    </Grid>
  );
  
  