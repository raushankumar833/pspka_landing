import { Grid, useTheme } from '@mui/material';

const BankDetailsCard = ({ children }: any) => {
  const theme = useTheme();
  return (
    <Grid
      container
      sx={{
        backgroundColor: theme.palette.primary.lightest,
        borderLeft: `6px solid ${theme.palette.primary.main}`,
      }}
    >
      <Grid item md={12} sm={12} xs={12} sx={{ p: 2 }}>
        {children}
      </Grid>
    </Grid>
  );
};
export default BankDetailsCard;
