import patientsData from '../../data/patients';
import { NoSsnPatient, NewPatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): NoSsnPatient[] => {
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

export default {
  getPatients,
  addPatient
};