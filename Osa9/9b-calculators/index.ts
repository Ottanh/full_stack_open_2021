import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import express from 'express';
const app = express();
app.use(express.json());

interface ExercisesReq {
  daily_exercises: Array<number>,
  target: number
}

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);
  
  if(!isNaN(weight) && !isNaN(height)){
    const bmi: string = calculateBmi(height, weight);
    res.json({
      weight,
      height,
      bmi
    });
  } else {
    res.status(400);
    res.json({
      error: 'malformatted parameters'
    });
  }
});

app.post('/calculate', (req, res) => {
  const { daily_exercises, target } = req.body as ExercisesReq;

  if(!daily_exercises || !target) {
    res.status(400);
    res.json({
      error: 'parameters missing'
    });
  } else if (daily_exercises.some(isNaN) || isNaN(target)) {
    res.status(400);
    res.json({
      error: 'malformatted parameters'
    });
  } else {
    const result = calculateExercises(daily_exercises, target);
    res.json(result);
  }
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});