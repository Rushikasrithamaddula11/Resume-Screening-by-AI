import React, { useState } from "react";
import axios from "axios";

const UploadResume = () => {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [score, setScore] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("job_description", jobDesc);

    const response = await axios.post("http://localhost:5000/upload", formData);
    setScore(response.data.score);
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <textarea
        placeholder="Paste Job Description"
        onChange={(e) => setJobDesc(e.target.value)}
      />
      <button onClick={handleUpload}>Upload & Match</button>
      {score && <p>Relevance Score: {score}</p>}
    </div>
  );
};

export default UploadResume;
