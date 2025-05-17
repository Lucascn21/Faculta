const metrosAKilometros = (metros: number): number => {
  return metros / 1000;
};

const kilogramosALibras = (kilogramos: number): number => {
  return kilogramos * 2.20462;
};

const gradosCelsiusAFahrenheit = (gradosCelsius: number): number => {
  return (gradosCelsius * 9) / 5 + 32;
};

export { metrosAKilometros, kilogramosALibras, gradosCelsiusAFahrenheit };
