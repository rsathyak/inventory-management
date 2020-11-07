import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {},
  deleteButton: {
    marginLeft: theme.spacing(2)
  },
  search: {
    maxWidth: 400,
    marginLeft: theme.spacing(2)
  }
}));

const Toolbar = ({ className, addInvoice, ...rest }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box mt={3}>
        <Card>
          <CardContent>
            <Button
              color="primary"
              variant="contained"
              onClick={addInvoice}
            >
              Add invoice
            </Button>
            <Button
              className={classes.deleteButton}
              color="primary"
              variant="contained"
            >
              Delete
            </Button>
            <TextField
              className={classes.search}
              size="small"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      fontSize="small"
                      color="action"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search customer"
              variant="outlined"
            />
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
  addInvoice: PropTypes.func
};

export default Toolbar;