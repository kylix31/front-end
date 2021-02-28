import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  CircularProgress,
  CardContent,
  Grid,
  Divider,
} from '@material-ui/core';
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';

import { Card } from '../../components/Card/Card';
import { Container } from '../../components/Container/Container';
import { toCurrency } from '../../core/number';

import { DesktopSteps, MobileSteps } from './steps';

import { API_URL } from '../../env';

interface ParamsType {
  id: string;
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#000000',
    },
  },
});

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
    [theme.breakpoints.down('sm')]: {
      textAlign: 'start',
    },
  },
  desktopSteps: {
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  mobileSteps: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  productList: {
    '& h3, & h5': {
      fontWeight: 200,
    },
  },
  summaryContainer: {
    padding: theme.spacing(2),
    '& h3': {
      marginBlock: 0,
      fontWeight: 100,
      textTransform: 'uppercase',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
      },
    },
    '& h2': {
      textTransform: 'uppercase',
    },
  },
  lastContainerGrid: {
    padding: theme.spacing(2),
    justifyContent: 'space-evenly',
    '& h5': {
      marginBlock: '1em',
    },
    '& h6': {
      marginBlock: '0',
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
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

  if (error) return <div>Alguma coisa bugou...</div>; //But will not 😁

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <Container>
          <Card>
            <CardContent>
              <Grid container spacing={4} direction="column">
                <Grid className={classes.cardTitle} item>
                  <h1>AGORA VAI, {data.name}!</h1>
                </Grid>
                <Grid className={classes.cardTitle} item>
                  <h2>NÚMERO DO PEDIDO: {data.id}</h2>
                </Grid>
                <Grid item>
                  <Grid container justify="center">
                    <Grid item>
                      <DesktopSteps
                        className={classes.desktopSteps}
                        step={data.status}
                      />
                      <MobileSteps
                        step={data.status}
                        className={classes.mobileSteps}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <h3 style={{ textAlign: 'center' }}>RESUMO DA COMPRA</h3>
                </Grid>
                <Grid item>
                  {data.items.map((item: any, index: number) => (
                    <div key={index}>
                      <Divider />
                      <Grid
                        className={classes.productList}
                        container
                        justify="space-around"
                      >
                        <Grid item>
                          <h3>{`${item.qty}x  ${item.name}`}</h3>
                        </Grid>
                        <Grid item>
                          <h5>{toCurrency(item.price * item.qty)}</h5>
                        </Grid>
                      </Grid>
                    </div>
                  ))}
                  <Divider />
                </Grid>
                <Grid
                  className={classes.summaryContainer}
                  container
                  direction="column"
                >
                  <Grid item container justify="space-between">
                    <Grid item>
                      <h3>Prazo de entrega:</h3>
                    </Grid>
                    <Grid item>
                      <h3>{`de ${data.freight.from} a ${data.freight.to} dias`}</h3>
                    </Grid>
                  </Grid>
                  <Grid item container justify="space-between">
                    <Grid item>
                      <h3>Frete:</h3>
                    </Grid>
                    <Grid item>
                      <h3>{toCurrency(data.freight.price)}</h3>
                    </Grid>
                  </Grid>
                  <Grid item container justify="space-between">
                    <Grid item>
                      <h2>Total:</h2>
                    </Grid>
                    <Grid item>
                      <h2>{toCurrency(data.total)}</h2>
                    </Grid>
                  </Grid>
                </Grid>
                <Divider />
                <Grid
                  className={classes.lastContainerGrid}
                  container
                  spacing={2}
                >
                  <Grid item>
                    <Grid container direction="column">
                      <Grid item>
                        <h5>ENTREGAR EM:</h5>
                      </Grid>
                      <Grid item>
                        <h6>{`${data.address.street}, ${data.address.number}`}</h6>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <h6>{`${data.address.city} - ${data.address.state} - ${data.address.postcode}`}</h6>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container>
                      <Grid item>
                        <h5>FORMA DE PAGAMENTO:</h5>
                        <Grid item>
                          <h6>{data.payment_method}</h6>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </ThemeProvider>
    </div>
  );
};
