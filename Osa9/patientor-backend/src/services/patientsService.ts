import patientsData from '../../data/patients';
import { PublicPatient, NewPatient, Patient, Entry, EntryWithoutId } from '../types';
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
  const newPatient: Patient = {
    id: uuid(),
    ...entry,
    entries: new Array<Entry>()
  };

  patientsData.push(newPatient);
  return newPatient;
};

const addEntry = (entry: EntryWithoutId, id: string): Entry => {
  const newEntry: Entry = {
    id: uuid(),
    ...entry,
  };

  const patient = patientsData.find(d => d.id === id);
  patient?.entries.push(newEntry);
  return newEntry;
};

const findById = (id: string): Patient | undefined => {  
  const entry = patientsData.find(d => d.id === id);
  return entry;
};

export default {
  getPatients,
  addPatient,
  findById,
  addEntry
};