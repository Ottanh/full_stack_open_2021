import { CoursePart } from "../types";
import { assertNever } from "../util";

const Part = ({ part }: {part: CoursePart}) => {
  switch (part.type) {
    case 'normal':
      return (
        <p>
          {part.name} {part.exerciseCount} {part.description}
        </p>
      );
    case 'groupProject':
      return (
        <p>
          {part.name} {part.exerciseCount} {part.groupProjectCount}
        </p>
      );
    case 'submission':
      return (
        <p>
          {part.name} {part.exerciseCount} {part.description} {part.exerciseSubmissionLink}
        </p>
      );
      case 'special':
        return (
          <p>
            {part.name} {part.exerciseCount} {part.description} {part.requirements}
          </p>
        );
    default:
      return (assertNever(part));
  }
}

export default Part;