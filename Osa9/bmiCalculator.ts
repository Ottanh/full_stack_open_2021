export const parseArgumentsBmi = (args: Array<string>): [number, number] => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return [Number(args[2]), Number(args[3])];
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (heigth: number, weigth: number): string => {
  const bmi =  weigth / (heigth/100)**2;
  console.log(bmi);
  if(bmi < 18.5){
    return 'Underweight';
  } else if (bmi > 25){
    return 'Overweight';
  } else {
    return 'Normal';
  }
}; 

//const [heigth, weigth] : [number, number] = parseArgumentsBmi(process.argv);
//console.log(calculateBmi(heigth, weigth));