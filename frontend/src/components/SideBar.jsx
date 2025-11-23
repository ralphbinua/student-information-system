import React from "react";

const SideBar = () => {
  return (
    <div>
      <nav className="sidebar ">
        <ul className="list-unstyled ">
        <div className="bg-primary p-3">
          <li>
            <a href="/students" className="text-decoration-none d-block p-3 text-white rounded m">
              Enrollment
            </a>
          </li>
        </div>
         <div className="bg-primary p-3">
          <li>
            <a href="/students" className="text-decoration-none d-block p-3 text-white">
              Enrollment
            </a>
          </li>
        </div>
         <div className="bg-primary p-3">
          <li>
            <a href="/students" className="text-decoration-none d-block p-3 text-white">
              Enrollment
            </a>
          </li>
        </div>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
