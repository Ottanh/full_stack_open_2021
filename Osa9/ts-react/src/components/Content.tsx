import { CourseParts } from "../types";
import Part from "./Part";

const Content = ({ courseParts }: CourseParts) => {
  return (
    <>
      {courseParts.map(part => (
        <Part key={part.name} part={part} />
      ))}
    </>
  );
}

export default Content;
