import { Diagnosis, Entry } from "../types";
import EntryDetails from "./EntryDetails";

interface Props {
  entry: Entry; 
  diagnoses: {
    [code: string]: Diagnosis
  } 
}

const EntryStyle = {
  borderStyle: "solid", 
  borderWidth: "thin", 
  borderRadius: "10px", 
  padding: "5px",
  margin: "5px"
};

const EntryView = ({ entry, diagnoses }: Props) => {
  return (
    <div style={EntryStyle}>
      <p>{entry.date} <br/> {entry.description}</p>
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>
            {code} {diagnoses[code].name}
          </li>
        ))}
      </ul>
      <EntryDetails entry={entry} />
      <p>Diagnosed by {entry.specialist}</p>
    </div>
  );
};

export default EntryView;