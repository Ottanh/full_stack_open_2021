interface Result { 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export const parseArguments = (args: Array<string>): [Array<number>,number] => {
  if (args.length < 4) throw new Error('Not enough arguments');

  let target: number;
  if (!isNaN(Number(args[2])) ) {
    target = Number(args[2]);
  } else {
    throw new Error('All values must be numbers!');
  }

  const hours: Array<number> = [];
  for (let i = 3; i < args.length; i++) {
    const value = Number(args[i]);
    if(!isNaN(value)) {
      hours.push(value);
    } else {
      throw new Error('All values must be numbers!');
    }
  }

  return [hours, target];
};


export const calculateExercises = (hours: Array<number>, target: number): Result => {
  const periodLength: number = hours.length;
  const trainingDays: number = hours.filter(h => h !== 0).length;
  const average: number = hours.reduce((p, c) => p + c, 0) / hours.length;

  const ratingDescriptions: Array<string> = ['Not very good', 'Okay but could be better', 'Very good'];

  let rating: number;
  if(average < (target/2)) {
    rating = 1;
  } else if (average < target) {
    rating = 2;
  } else {
    rating = 3;
  }
  
  return {
    periodLength,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription: ratingDescriptions[rating-1],
    target,
    average
  };
};



//const [hours, target] : [Array<number>, number] = parseArguments(process.argv);
//console.log(calculateExercises(hours, target));