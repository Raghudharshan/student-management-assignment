import React, { useState } from "react";
import axios from "../services/axiosConfig";
import "./StudentForm.css";

const StudentForm = () => {
  const [student, setStudent] = useState({ name: "", age: "", class: "", phone: "" });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

 // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/students", student);
      alert("Student added successfully!");
      setStudent({ name: "", age: "", class: "", phone: "" });
    } catch (error) {
      alert("Error adding student!");
    }
    window.location.reload()
  };

  return (
    <div>
    <form className="student-form" onSubmit={handleSubmit}>
    <h2>Add Student Details</h2>
      <label className="label-input">Name</label>
      <input className="form-input" name="name" placeholder="Name" onChange={handleChange} value={student.name} required />
      <label className="label-input">Age</label>
      <input className="form-input" name="age" placeholder="Age" onChange={handleChange} value={student.age} required />
      <label className="label-input">Class</label>
      <input className="form-input" name="class" placeholder="Class" onChange={handleChange} value={student.class} required />
      <label className="label-input">Phone</label>
      <input className="form-input" name="phone" placeholder="Phone" onChange={handleChange} value={student.phone} required />
      <button className="form-button-add" type="submit">Add Student</button>
    </form>
    </div>
  );
};

export default StudentForm;