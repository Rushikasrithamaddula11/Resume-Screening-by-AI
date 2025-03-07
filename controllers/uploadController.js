const Resume = require("../models/Resume");
const { predictCategory } = require("../utils/predict");
const path = require("path");
const fs = require("fs");

const uploadResume = async (req, res) => {
    try {
        console.log("📤 Sending Data to Python Script:", req.file.path, req.body.job_description);

        // Your existing logic to process the file
        res.json({ message: "File uploaded successfully" });
    } catch (error) {
        console.error("❌ Upload Error:", error);
        res.status(500).json({ error: "Upload failed" });
    }
};

const saveResume = async (req, res) => {
    const { job_description } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = path.join(__dirname, "../../uploads", req.file.filename);
    console.log(`📂 Uploaded File: ${filePath}`);

    try {
        const newResume = new Resume({
            filename: req.file.filename,
            filePath: req.file.path,
            jobDescription: job_description,
        });

        await newResume.save();

        // Predict category
        const result = await predictCategory(filePath);

        // Send response before deleting the file
        res.status(201).json({
            message: "Resume uploaded successfully",
            resume: newResume,
            prediction: result,
        });

        // Delete file AFTER sending response
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (!err) {
                fs.unlink(filePath, (unlinkErr) => {
                    if (unlinkErr) {
                        console.error("❌ File deletion error:", unlinkErr);
                    } else {
                        console.log("🗑️ File deleted successfully.");
                    }
                });
            } else {
                console.warn("⚠️ File not found for deletion:", filePath);
            }
        });

    } catch (error) {
        console.error("❌ Upload error:", error);
        if (!res.headersSent) {
            res.status(500).json({ message: "Failed to upload resume", error: error.message });
        }
    }
};

// ✅ Export functions properly
module.exports = { uploadResume, saveResume };
