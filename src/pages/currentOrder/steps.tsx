import React from 'react';
import { Step, Stepper, StepLabel, StepConnector } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { enumToArray } from './helper';

enum Steps {
  'Aguardando pagamento',
  'Pagamento aprovado',
  'Pedido em separação',
  'Pedido em transporte',
  'Pedido entrege',
}

const STEPS = enumToArray(Steps);

const Connector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: 'black',
    },
  },
  completed: {
    '& $line': {
      borderColor: 'black',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: '4px',
  },
})(StepConnector);

type AppProps = {
  step: string;
  className?: string;
};

export const DesktopSteps = ({ step, className }: AppProps) => {
  return (
    <div className={className}>
      <Stepper
        activeStep={Steps[step]}
        connector={<Connector />}
        alternativeLabel
      >
        {STEPS.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
};

export const MobileSteps = ({ step, className }: AppProps) => {
  return (
    <div className={className}>
      <Stepper activeStep={Steps[step]} orientation="vertical">
        {STEPS.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
};
