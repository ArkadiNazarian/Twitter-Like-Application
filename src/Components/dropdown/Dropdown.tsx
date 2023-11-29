import styled from "@emotion/styled";
import { FormControl } from "@mui/material";

export const Dropdown=styled(FormControl)({
    '& label': {
        color: '#8B8B8B',
      },
    '& label.Mui-focused': {
      color: '#8B8B8B',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#28A4DA',
        transition:' 0.4s'
      },
      '&:hover fieldset ': {
        borderColor: '#FFF0F0',
        transition:' 0.4s'
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
      '&.Mui-error fieldset': {
        borderColor: 'red !important',
      },
      
    }
  })