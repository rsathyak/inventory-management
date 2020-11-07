import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  CardContent,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: 'flex-start',
    letterSpacing: 0,
    padding: '10px 8px',
    textTransform: 'none',
    width: '100%',
    textAlign: 'left'
  },
  row: {
    cursor: 'pointer'
  }
}));

const Results = ({
  className, customers, editInvoice, ...rest
}) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      {
      !customers.length ? (
        <CardContent>
          <Typography
            color="textPrimary"
            variant="h5"
            align="center"
          >
            No Data available
          </Typography>
        </CardContent>
      ) : (
        <>
          <PerfectScrollbar>
            <Box minWidth={1050}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedCustomerIds.length === customers.length}
                        color="primary"
                        indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < customers.length
                    }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>
                      Bill No.
                    </TableCell>
                    <TableCell>
                      Customer Name
                    </TableCell>
                    <TableCell>
                      Phone 1
                    </TableCell>
                    <TableCell>
                      Phone 2
                    </TableCell>
                    <TableCell>
                      Customer Address
                    </TableCell>
                    <TableCell>
                      Total Bill
                    </TableCell>
                    <TableCell>
                      Billed Date
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customers.slice(0, limit).map((customer, index) => (
                    <TableRow
                      hover
                      key={index}
                      selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                      className={classes.row}
                      onClick={() => editInvoice(customer.billno)}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                          onChange={(event) => handleSelectOne(event, customer.id)}
                          value="true"
                        />
                      </TableCell>
                      <TableCell>
                        {customer.billno}
                      </TableCell>
                      <TableCell>
                        <Box
                          alignItems="center"
                          display="flex"
                        >
                          <Typography
                            color="textPrimary"
                            variant="body1"
                          >
                            {customer.fullName}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {customer.phone1 || 'NA'}
                      </TableCell>
                      <TableCell>
                        {customer.phone2 || 'NA'}
                      </TableCell>
                      <TableCell>
                        {customer.address || 'NA'}
                      </TableCell>
                      <TableCell>
                        {`Rs. ${(customer.amount || 0).toFixed(2)}`}
                      </TableCell>
                      <TableCell>
                        {moment(customer.billdate).format('DD/MM/YYYY HH:mm A')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </PerfectScrollbar>
          <TablePagination
            component="div"
            count={customers.length}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </>
      )
}
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired,
  editInvoice: PropTypes.func
};

export default Results;