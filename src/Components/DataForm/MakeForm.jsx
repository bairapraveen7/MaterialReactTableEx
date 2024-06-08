import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Stack,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { MakeField } from "./MakeField";
import { Validations } from "../../validationRules";
import { Add, CheckCircle } from "@mui/icons-material";
import { DisplayContext, TableContext } from "../../Hooks/Contexts";
import { DISPLAYFORM, DISPLAYTABLE } from "../../config";

/*
  Here, we need to add the styles
  1. Decrease the width of container by adding it to the CAA_theme 
  2. Increase the boldness of label
  3. Add Background label
  4. Just Reacreate it
*/

 export const CAA_theme = createTheme({
    palette: {
      primary: {
        main: "#f7ede8",
        mainHeading: "#e69e6e",
        bgColor: "#f7ede8",
      },
    },
  });

export const MakeForm = ({formData,formValues,setFormValues}) => {
  const [error, setError] = useState({});
  const {setDisplayTable} = useContext(DisplayContext);

  const handleSubmit = () => {
    const tempError = {};
    formData.map((eachItem) => {
      eachItem.validations.map((eachValidation) => {
        if (Validations[eachValidation].fn(formValues[eachItem.id]) == true) {
          tempError[eachItem.id] = Validations[eachValidation].message;
        }
      });
    });
    if (Object.keys(tempError).length != 0) {
      setError(tempError);
    }else{
      setError({});
      alert("Good!! Data Entered is correctly Validated and sent")
    }
  };

  return (
    <Box>
      <Container sx={{ width: "60%" }}>
        <Typography
          sx={{ m: 2, color: CAA_theme.palette.primary.mainHeading }}
          variant="h3"
        >
          POC
        </Typography>
        <Typography
          sx={{
            m: "2rem",
            p: 1,
            backgroundColor: CAA_theme.palette.primary.bgColor,
          }}
          variant="h4"
        >
          Dynamic Form
        </Typography>
        <Grid container spacing={4}>
          {formData.map((eachItem) => {
            return (
              <MakeField
                fieldItem={eachItem}
                error={error[eachItem.id]}
                fieldValue={formValues[eachItem.id]}
                setFormValues={setFormValues}
                setError={setError}
              />
            );
          })}
           <Grid item xs={6} >
            <Button   variant="outlined" color="success" startIcon={<Add />} onClick={() => setDisplayTable(DISPLAYTABLE)}>
              Add Field
            </Button>
          </Grid>
          <Grid item xs={6} >
            <Button   variant="contained" color="success" onClick={handleSubmit}>
              Submit
              <CheckCircle sx={{ mx: 1 }} />
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
