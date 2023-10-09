import React, { useState } from "react";

const CSVReader = () => {
  const [csvData, setCSVData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        const rows = text.split("\n").map((row) => row.split(";")); // แยกข้อมูลตาม delimiter (ในที่นี้คือ ;)
        setCSVData(rows);
      };
      reader.readAsText(file);
    }
  };

  console.log("csvData", csvData);

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {/*  <table>
        <thead>
          <tr>
            {csvData[0] &&
              csvData[0].map((header, index) => <th key={index}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {csvData.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default CSVReader;
