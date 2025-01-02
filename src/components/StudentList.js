import React, { useState, useEffect } from "react";
import axios from "../services/axiosConfig";
import "./StudentList.css";

const StudentList = () => {
  const [students, setStudents] = useState([]); // Original student list
  const [filteredStudents, setFilteredStudents] = useState([]); // Filtered list for display
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [editingStudent, setEditingStudent] = useState(null);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("/students");
      setStudents(response.data);
      console.log(response.data)
      setFilteredStudents(response.data); // Initially, filtered list is the same as the full list
    } catch (error) {
      alert("Error fetching students!");
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase(); // Convert search term to lowercase
    setSearchTerm(term);
    const filtered = students.filter((student) =>
      student.name.toLowerCase().includes(term) // Match name with the search term
    );
    setFilteredStudents(filtered);
  };

  //To Delete student data
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/students/${id}`);
      alert("Student deleted successfully!");
      fetchStudents();
    } catch (error) {
      alert("Error deleting student!");
    }
  };

  //To Edit student data
  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  //To Update student data
  const handleUpdate = async () => {
    try {
      await axios.put(`/students/${editingStudent._id}`, editingStudent);
      alert("Student updated successfully!");
      setEditingStudent(null);
      fetchStudents();
    } catch (error) {
      alert("Error updating student!");
    }
  };

  const handleChange = (e) => {
    setEditingStudent({ ...editingStudent, [e.target.name]: e.target.value });
  };

  // To Fetch all the students
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="student-list">
      <h2>All Students</h2>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search by Name..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <table className="student-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Age</th>
            <th>Class</th>
            <th>Phone</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (filteredStudents.map((student) => (
            <tr key={student._id}>
              {editingStudent && editingStudent._id === student._id ? (
                <>
                  <td>
                    <input
                      className="form-input"
                      name="name"
                      value={editingStudent.name}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      className="form-input"
                      name="age"
                      value={editingStudent.age}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      className="form-input"
                      name="class"
                      value={editingStudent.class}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      className="form-input"
                      name="phone"
                      value={editingStudent.phone}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <button className="form-button" onClick={handleUpdate}>
                      Save
                    </button>
                  </td>
                  <td>
                    <button
                      className="form-button danger"
                      onClick={() => setEditingStudent(null)}
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>{student.class}</td>
                  <td>{student.phone}</td>
                  <td>
                    <button
                      className="form-button"
                      onClick={() => handleEdit(student)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="form-button danger"
                      onClick={() => handleDelete(student._id)}
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))) : (
            <div className="empty-record">
              <p>-- No Records Found --</p>
            </div>)}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
