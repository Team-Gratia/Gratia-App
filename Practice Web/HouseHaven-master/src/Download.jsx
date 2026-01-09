import React, { useState } from "react";

import axios from "axios";
import file from "./notification.wav";

const DownloadLogs = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [logs, setLogs] = useState([]);

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4010/api/v1/download/logs/",
        {
          params: { startDate, endDate },
          responseType: "blob", // important for handling binary data
        }
      );

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "logs.zip"); // or extract the filename from response headers
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading logs:", error);
    }
  };

  const handleFetchLogs = async () => {
    try {
      // const response = await axios.get("http://localhost:4010/api/v1/logs", {
      //   params: { startDate, endDate },
      // });
      // setLogs(response.data);

      const audio = new Audio(file);
      audio.play();
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  return (
    <div>
      <h1>Download Logs</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleDownload();
        }}
      >
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Download Logs</button>
      </form>
      <br />
      <button onClick={handleFetchLogs}>Fetch Logs</button>
      <div>
        {logs.map((log, index) => (
          <div key={index}>
            <h3>{log.fileName}</h3>
            <pre>{log.content}</pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DownloadLogs;
