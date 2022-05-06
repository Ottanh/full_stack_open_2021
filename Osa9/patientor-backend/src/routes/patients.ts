import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatient } from '../util';
import { Fields, EntryWithoutId } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getPatients());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatient(req.body as Fields);
    console.log(req.body);
    const addedEntry = patientsService.addPatient(newPatientEntry);    
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});




router.post('/:id/entries', (req, res) => {

  console.log(req.body);

  if(!(req.body.description && req.body.date && req.body.specialist)) {
    res.sendStatus(400);
  } else if (req.body.type === 'Hospital' && !(req.body.discharge)) {
    res.sendStatus(400);
  } else if (req.body.type === 'HealthCheck' && !(req.body.healthCheckRating)) {
    res.sendStatus(400);
  } else if (req.body.type === 'OccupationalHealthcare' && !(req.body.employerName)) {
    res.sendStatus(400);
  } else {
    try {
      const addedEntry = patientsService.addEntry(req.body as EntryWithoutId, req.params.id);    
      res.json(addedEntry);
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      res.status(400).send(errorMessage);
    }
  }
});

router.get('/:id', (req, res) => {
  const patient = patientsService.findById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});



export default router;