import React from 'react';
import { Step, Stepper, StepLabel } from '@material-ui/core';

const STEPS = getSteps();

type AppProps = {
  step: string;
};

enum Steps {
  'Aguardando pagamento',
  'Pagamento aprovado',
  'Pedido em separação',
  'Pedido em transporte',
  'Pedido entrege',
}

function getSteps() {
  return [
    'Aguardando pagamento',
    'Pagamento aprovado',
    'Pedido em separação',
    'Pedido em transporte',
    'Pedido entrege',
  ];
}

export const DesktopSteps = ({ step }: AppProps) => {
  console.log(Steps[step]);

  return (
    <div>
      <Stepper activeStep={Steps[step]}>
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
