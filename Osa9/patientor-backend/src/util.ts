import { NewPatient, Gender } from "./types";

type Fields = { 
  name: unknown, 
  dateOfBirth: unknown, 
  ssn: unknown, 
  gender: unknown, 
  occupation: unknown
};

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): NewPatient => {
  const newEntry: NewPatient = {
    name: parseString(name),
    dateOfBirth: parseString(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    entries: []
  };
  return newEntry;
};

const parseString = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};


const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing name');
  }
  return gender;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};
