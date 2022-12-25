import { useForm } from "react-hook-form";

import SaveIcon from "@mui/icons-material/Save";
import { FormControl, FormGroup, TextField, Button, Box } from "@mui/material";

export default function TestPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Box sx={{width: '100%', maxWidth: '100%', minWidth: '300px', display: 'flex', justifyContent: 'center'}}>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <FormGroup>
          <FormControl>
            <TextField {...register("firstName")} />
          </FormControl>
          <FormControl>
            <TextField {...register("lastName", { required: true })} />
            {errors.lastName && <p>Last name is required.</p>}
          </FormControl>
        </FormGroup>
        <FormGroup>
          <FormControl>
            <TextField {...register("age", { pattern: /\d+/ })} />
            {errors.age && <p>Please enter number for age.</p>}
          </FormControl>
        </FormGroup>
            <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
              Kaydet
            </Button>
      </form>
    </Box>
  );
}