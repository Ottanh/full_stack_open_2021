import { Button } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { DiagnosisSelection, SelectHealthCheckRating, TextField, RatingOption } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { Entry } from "../types";

export type EntryFormValues = Omit<Entry, "id" | "entries">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
}

const RatingOptions: RatingOption[] = [
  { value: '0' },
  { value: '1'},
  { value: '2' },
  { value: '3' },
];

const AddEntryForm = ({ onSubmit }: Props) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
    initialValues={{
      type: 'HealthCheck',
      description: '',
      date: '',
      specialist: '',
      diagnosisCodes: [],
      healthCheckRating: '0'
    }}
    onSubmit={onSubmit}
  >
    {({ dirty, setFieldValue, setFieldTouched }) => {
      return (
        <Form className="form ui">
          <Field
            label="Description"
            placeholder="Description"
            name="description"
            component={TextField}
          />
          <Field
            label="Date"
            placeholder="Date"
            name="date"
            component={TextField}
          />
          <Field
            label="Specialist"
            placeholder="Specialist"
            name="specialist"
            component={TextField}
          />
          <DiagnosisSelection            
            setFieldValue={setFieldValue}            
            setFieldTouched={setFieldTouched}            
            diagnoses={Object.values(diagnoses)}          
          />   
          <SelectHealthCheckRating label="Healtcheckrating" name="healthCheckRating" options={RatingOptions}/>
          <Button
            style={{
              float: "right",
            }}
            type="submit"
            variant="contained"
            disabled={!dirty}
          >
            Add
          </Button>
        </Form>
      );
    }}
  </Formik>
  );
};

export default AddEntryForm;