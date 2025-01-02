import React from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">Student Management Application</h1>
      <div className="app-content">
        <StudentForm />
        <StudentList />
      </div>
    </div>
  );
}

export default App;