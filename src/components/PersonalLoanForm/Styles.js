export const styles = (theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '500px',
    backgroundColor: '#efefef',
    padding: '0 20px',
    paddingBottom: '20px',
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

  textField: {
    width: '100%',
  },
  marginY2: {
    marginTop: '2rem',
    marginBottom: '1rem',
  },
});
