import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  button: {
    marginLeft: 'auto',
    marginRight: theme.spacing(1)
  }
}));

const ProfileDetails = ({
  className, values = {}, handleChange, ...rest
}) => {
  const classes = useStyles();
  const {
    fullName = '',
    address = '',
    phone1 = '',
    phone2 = '',
    billno = '',
    billdate = ''
  } = values;

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          title="Customer Invoice Information"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Full name"
                name="fullName"
                onChange={handleChange}
                required
                value={fullName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Address"
                name="address"
                onChange={handleChange}
                value={address}
                variant="outlined"
                multiline
                rows={3}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number 1"
                name="phone1"
                onChange={handleChange}
                type="number"
                value={phone1}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number 2"
                name="phone2"
                onChange={handleChange}
                type="number"
                value={phone2}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Bill Number"
                name="billno"
                onChange={handleChange}
                type="number"
                value={billno}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                id="datetime-local"
                label="Bill Date"
                type="datetime-local"
                name="billdate"
                onChange={handleChange}
                value={billdate}
                className={classes.billdate}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

          </Grid>
        </CardContent>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string,
  handleChange: PropTypes.func,
  values: PropTypes.object
};

export default ProfileDetails;