import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";

const EnrollmentForm = () => {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [contact_number, setContact_Number] = useState("");
  const [home_address, sethome_address] = useState("");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!name.trim() || !studentId.trim() || !email.trim() || !contact_number.trim() || !home_address.trim() || !department) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
        await api.post("/students", {
        name,
      email,
      contact_number,
      home_address,
      department})

        toast.success("Form submitted successfully!");
        navigate("/students");
    } catch (error) {
        console.error("Error submitting form:", error);
        if(error.response.status === 429) {
          toast.error("Too many requests. Please try again later.",{
            duration: 4000,
            icon:  "💀",
          });
    }else{
          toast.error("Failed to submit form. Please try again.");
    }
  } finally{
      setLoading(false);
  }

};

  return (
    <div className="min-h-screen bg-base-400">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="btn btn-secondary mb-4">
            Back
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h1 className="card-title text-2xl mb-4">
                Student Enrollment Form
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Full Name:</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Student ID:</span>
                  </label>
                  <input
                    type="text"
                    id="studentId"
                    name="studentId"
                    placeholder="e.g., 2023-00001"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Email Address:</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Contact Number:</span>
                  </label>
                  <input
                    type="text"
                    id="contact_number"
                    name="contact_number"
                    placeholder="e.g., +639123456789"
                    value={contact_number}
                    onChange={(e) => setContact_Number(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Home Addres:</span>
                  </label>
                  <input
                    type="text"
                    id="home_address"
                    name="home_address"
                    placeholder="Enter home address"
                    value={home_address}
                    onChange={(e) => sethome_address(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Enrolled Course/Program:</span>
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    <option value="">Select grade level</option>
                    <option value="BSIT">BSIT</option>
                  </select>
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary mt-4"
                  >
                    {loading ? "Submitting Enrollment..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentForm;