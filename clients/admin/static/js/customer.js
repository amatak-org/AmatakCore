import React from "react";
import "./App.css";
import { amatakData } from "./db";


export const Customer = () => {
  return (
    <>
      <div className="customer-container">
        {amatakData.map((data, key) => {
          return (
            <div key={key}>
              {data.company +
                " , " +
                data.ticker +
                " ," +
                data.customerList +
                ", " +
                data.timeElapsed}
            </div>
          );
        })}
      </div>
    </>
  );
};