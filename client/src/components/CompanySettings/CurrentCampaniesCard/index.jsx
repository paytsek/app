import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  Typography,
} from '@material-ui/core';
import { Settings as SettingsIcon } from '@material-ui/icons';

import useStyles from './styles';

const CurrentCompaniesCard = ({ history, company }) => {
  const { root, buttonText } = useStyles();

  return (
    <Card className={root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {company.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {(company.companySettings && company.companySettings.registeredAddress)
              || 'Set your company'}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {company.companySettings ? (
          <Button
            size="small"
            color="primary"
            startIcon={<SettingsIcon />}
            className={buttonText}
            onClick={() => history.push(`company-settings/${company._id}/edit`)}
          >
            Edit Settings
          </Button>
        ) : (
          <Button
            size="small"
            color="primary"
            startIcon={<SettingsIcon />}
            className={buttonText}
            onClick={() => history.push(`company-settings/${company._id}`)}
          >
            Add Settings
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default withRouter(CurrentCompaniesCard);
