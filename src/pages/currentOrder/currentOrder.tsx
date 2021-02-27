import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { CircularProgress, CardContent, Grid } from '@material-ui/core';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';

import { Card } from '../../components/Card/Card';
import { Container } from '../../components/Container/Container';

import { DesktopSteps } from './steps';

import { API_URL } from '../../env';

interface ParamsType {
  id: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
  },
  spinContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  cardTitle: {
    textAlign: 'center',
    textTransform: 'uppercase',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'start',
    },
  },
}));

export const CurrentOrder = () => {
  let { id } = useParams<ParamsType>(); //Get params from react-query

  const classes = useStyles(); //Get styles from Material UI's makeStyles

  const { isLoading, error, data } = useQuery('id', async () => {
    const res = await fetch(`${API_URL}/${id}.json`);
    return res.json();
  });

  if (isLoading)
    return (
      <div className={classes.spinContainer}>
        <CircularProgress />
      </div>
    );

  console.log(data);

  return (
    <div className={classes.root}>
      <Container>
        <Card>
          <CardContent>
            <Grid container direction="column">
              <Grid className={classes.cardTitle} item>
                <h1>AGORA VAI, {data.name}!</h1>
              </Grid>
              <Grid className={classes.cardTitle} item>
                <h2>NÚMERO DO PEDIDO: {data.id}</h2>
              </Grid>
              <Grid item>
                <DesktopSteps step={data.status} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};
