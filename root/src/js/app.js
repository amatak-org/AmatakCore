import "../scss/app.scss";
// Admin (required)
import "./modules/bootstrap";
import "./modules/sidebar";
import "./modules/theme";
import "./modules/feather";
// Charts
import "./modules/chartjs";
// Forms
import "./modules/flatpickr";
// Maps
import "./modules/vector-maps";

import React from "react";
import "./App.css";
import { Db } from "./db";

function Customer() {
  return (
    <div className="Customer">
      <Db />
    </div>
  );
}

export default Customer;