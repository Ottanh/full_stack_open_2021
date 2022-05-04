import patientsData from '../../data/patients';
import { PublicPatient, NewPatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): PublicPatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
    id: uuid(),
    ...entry
  };

  patientsData.push(newPatient);
  return newPatient;
};

const findById = (id: string): Patient | undefined => {  
  const entry = patientsData.find(d => d.id === id);
  return entry;
};

export default {
  getPatients,
  addPatient,
  findById
};