import { Entry } from "../types";

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch(entry.type){
    case 'HealthCheck':
      return (
        <>
          Healthcheckrating: {entry.healthCheckRating}
        </>
      );
    case 'OccupationalHealthcare':
      return (
        <>
          Employer: {entry.employerName} <br/>
          {entry.sickLeave && 
            <>
              Sickleave from {entry.sickLeave?.startDate}{' '}
              to {entry.sickLeave?.endDate}
            </>
          }
        </>
      );
    case 'Hospital':
      return (
        <>
          Discharge date: {entry.discharge.date} <br/>
          Discharge criteria: {entry.discharge.criteria}
        </>
      );
  }
};

export default EntryDetails;