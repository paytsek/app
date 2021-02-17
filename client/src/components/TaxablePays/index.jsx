import React from 'react';
import {
  Typography,
  FormControl,
  InputAdornment,
  Input,
  InputLabel,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import { Add as AddIcon, Delete as DeleteIcon } from '@material-ui/icons';

const TaxablePays = () => (
  <>
    <Typography variant="h6">Taxable Pays</Typography>
    <FormControl fullWidth size="small" margin="normal">
      <InputLabel htmlFor="taxablePays">Taxable Pays</InputLabel>
      <Input
        id="taxablePays"
        name="taxablePayName"
        endAdornment={(
          <InputAdornment position="end">
            <IconButton color="primary">
              <AddIcon />
            </IconButton>
          </InputAdornment>
        )}
      />
    </FormControl>
    {/* List of taxable pays */}
    <List>
      <ListItem>
        <ListItemText primary="Sample" />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  </>
);

export default TaxablePays;
