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

    if (
      !name.trim() ||
      !studentId.trim() ||
      !email.trim() ||
      !contact_number.trim() ||
      !home_address.trim() ||
      !department
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      await api.post("/students", {
        name,
        studentId,
        email,
        contact_number,
        home_address,
        department,
      });

      toast.success("Form submitted successfully!");
      navigate("/students");
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response && error.response.status === 429) {
        toast.error("Too many requests. Please try again later.", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to submit form. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4">
              <h3 className="text-center mb-4 text-primary fw-bold">
                Student Information Form
              </h3>

              <form id="studentForm" noValidate onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter full name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please enter your full name.
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="studentId" className="form-label">
                    Student ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="studentId"
                    placeholder="e.g. 2025-00123"
                    pattern="[0-9]{4}-[0-9]{5}"
                    required
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please enter a valid Student ID (format: YYYY-#####).
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please enter a valid email address.
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="contact" className="form-label">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="contact"
                    placeholder="e.g. 09123456789"
                    pattern="[0-9]{11}"
                    required
                    value={contact_number}
                    onChange={(e) => setContact_Number(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please enter a valid 11-digit number.
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Home Address
                  </label>
                  <textarea
                    className="form-control"
                    id="address"
                    rows="3"
                    placeholder="Enter address"
                    required
                    value={home_address}
                    onChange={(e) => sethome_address(e.target.value)}
                  ></textarea>
                  <div className="invalid-feedback">
                    Please provide your address.
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="course" className="form-label">
                    Enrolled Course/Program
                  </label>
                  <select
                    className="form-select"
                    id="course"
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    <option value="">Select a course/program</option>
                    <option value="BS Computer Science">
                      BS Computer Science
                    </option>
                    <option value="BS Information Technology">
                      BS Information Technology
                    </option>
                    <option value="BS Information Systems">
                      BS Information Systems
                    </option>
                    <option value="BS Software Engineering">
                      BS Software Engineering
                    </option>
                    <option value="BS Data Science">BS Data Science</option>
                  </select>
                  <div className="invalid-feedback">
                    Please select a course or program.
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </form>

              <div id="message" className="text-center mt-3 fw-semibold"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentForm;
