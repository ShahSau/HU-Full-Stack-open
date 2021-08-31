import React from "react";
const Course = ({ course }) => {
  let total = course.parts.reduce((sum, parts) => sum + parts.exercises, 0);
  return (
    <div>
      <h2>{course.name}</h2>
      {course.parts.map((item) => (
        <p key={item.id}>
          {item.name} {item.exercises}
        </p>
      ))}
      <p>
        <strong>total of {total} exercises</strong>
      </p>
    </div>
  );
};

export default Course;
