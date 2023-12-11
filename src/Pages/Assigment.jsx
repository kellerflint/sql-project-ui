import React, { useState } from "react";

import './CSS/Assignment.css'

import Back from "../Components/common/back/Back";

import { API_HOSTNAME } from "../Hooks/useApiRequest";
import { Link } from "react-router-dom";
import { SignedIn } from "@clerk/clerk-react";
import { SignedOut } from "@clerk/clerk-react";

const AssignmentList = ({ items }) => {
  return <>
    <div className="grid2">
      {items}
    </div>
  </>;
}

function formatDate(sqlDate) {
  // 1905-06-06T00:00:00.000Z
  let year = sqlDate.substring(0, 4);
  let month = sqlDate.substring(5, 7);
  let day = sqlDate.substring(8, 10);

  let date = new Date(year, month - 1, day);
  return date.toDateString();
}

const Assignment = () => {

  if (!signedIn) {
    
  }
  
  const [assignments, setAssignments] = useState(null);
  const [currentAssignment, setCurrentAssignment] = useState(null);

  if (currentAssignment === null) {
    let items = [];

    if (assignments === null) {
      fetch(`${API_HOSTNAME}/assignments`, { method: 'GET' }).then((res) => {
          res.json().then(data => {
            setAssignments(data);
          });
      });
    } else {
      items = assignments.map(a =>
        <div className="assignment">
          <div className="assignment_title">{a.title}</div>
          <div className="assignment_details">
            <div>{a.questions} questions</div>
            <div>{a.points} points</div>
            <div>Due date: {formatDate(a.due_date)}</div>
          </div>
          <button onClick={() => { setCurrentAssignment(a) }} className="assignment_start primary-btn">Start</button>
        </div>
      );
    }

    return (
      <>
        <SignedIn>
        <Back title="Assignments" />
        <div className="assignment_container">
          <h2>Class: SDEV 201</h2>
          <h3>Assignments</h3>
          <AssignmentList items={items}/>
        </div>
        </SignedIn>
        <SignedOut>
          <p>redirect</p>
        </SignedOut>
      </>
    );
  } else {
    return (
      <>
        <Back title="Assignments" />
        <div className="assignment_container">
          <h2>Class: SDEV 201</h2>
          <div className="question">
            <h3>{currentAssignment.title}</h3>
            <div className="assignment_description">
              <div>{currentAssignment.questions} questions</div>
              <div>{currentAssignment.points} points</div>
              <div>Due date: {formatDate(currentAssignment.due_date)}</div>
              <p>Assignment description here</p>
            </div>
            <Link to="/sql-editor">
              <button className='primary-btn'>Start / Resume</button>
            </Link>
            <button onClick={() => { setCurrentAssignment(null) }}>Go Back</button>
          </div>
        </div>
      </>
    );
  }
};

export default Assignment;