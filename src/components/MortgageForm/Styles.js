export const styles = (theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  amountInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  amount: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '2em',
    '& span': {
      fontSize: '12px',
    },
  },
  controlContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '10px',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  justifyRight: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  priceInput: {
    '& fieldset': {
      borderWidth: 0,
    },
  },
  marginY: {
    marginTop: '40px',
    marginBottom: '40px',
  },
  marginTop: {
    marginTop: '40px',
  },

  inputLabel: {
    color: '#333',
    marginTop: '14px',
    marginBottom: '14px',
    '& :hover': {
      cursor: 'pointer',
    },
  },
  labelContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginBottom: '-12px',
  },
  slider: {
    marginTop: '1rem',
  },

  noBorder: {
    '& .MuiInput-root': {
      borderColor: 'transparent',
      boxShadow: 'none'
    },
    '& .Mui-focused': {
      borderColor: '#98005e'
    }
  },
  borderRight: {
    borderRight: '1px solid #ccc'
  },
  fontBig: {

    '& .MuiInputBase-input': {
      fontSize: '2rem',
      fontFamily: '"Source Serif Pro", sans-serif',
      fontWeight: '600'
    }
  },
  
  textField: {
    // marginTop: '8px',
    // marginBottom: '8px',
    width: '100%',

    

    // '& label + .MuiInput-formControl, & .MuiInput-formControl, &.MuiInput-root': {
    //   padding: '10px',
    //   border: '1px solid #ccc',
    //   boxShadow: '0 4px 10px -8px rgba(0,0,0,0.16)',
    // },

    // '& .MuiInputLabel-shrink': {
    //   transform: 'translate(0, 1.5px) scale(1)',
    // },

    // '& .MuiInputLabel-formControl': {
    //   transform: 'translate(0, -10px) scale(1)',
    // },
  },
});
