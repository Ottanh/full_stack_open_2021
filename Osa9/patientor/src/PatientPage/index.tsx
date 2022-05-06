import { useStateValue, updatePatient } from "../state";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Entry, Patient } from "../types";
import EntryView from "./EntryView";
import AddEntryForm, { EntryFormValues } from "./AddEntryForm";

const PatientPage = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    if (!id) return;
    if(!patients[id]) return;

    if(!patients[id].ssn){
      const fetchPatient = async () => {
        try {
          const { data: patient } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(updatePatient(patient));
        } catch (e) {
          console.error(e);
        }
      setPatient(patients[id]);
      };
      void fetchPatient();
    } else {
      setPatient(patients[id]);
    }
  });

  if(!patient) {
    return null;
  }

  const submitNewEntry = async (values: EntryFormValues) => {
    console.log(values);
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        values
      );
      dispatch({ type: "ADD_ENTRY", payload: newEntry });
    } catch (error: unknown) {
      if(axios.isAxiosError(error) && error.response) {
        console.error(error.response.data);
      }
    }
  };

  return (
    <div>
      <Box sx={{ paddingTop: 20, paddingBottom: 20 }}>
        <Typography align="left" variant="h5">
          {patient.name}
        </Typography>
        <Typography align="left" variant="body1">
          gender: {patient.gender} <br/>
          ssh: {patient.ssn} <br/>
          occupation: {patient.occupation}
        </Typography>
      </Box>
      <Typography align="left" variant="h6">
          Entries
        </Typography>
      {patient.entries?.map((entry) => (
        <EntryView key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
      <AddEntryForm onSubmit={submitNewEntry} />
    </div>
  );
};

export default PatientPage;