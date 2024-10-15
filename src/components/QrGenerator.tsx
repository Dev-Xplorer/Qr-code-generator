import React, { useState } from "react";
import QRCode from "qrcode";
import { jsPDF } from "jspdf";

const QrCodeGenerator: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [generatedTime, setGeneratedTime] = useState<string>("");

  const generateUniqueString = (): string => {
    const randomNum = Math.floor(Math.random() * 100000);  // Random number
    const timestamp = Date.now();  // Current timestamp from 1 jan 1970 till now
    return `${randomNum}-${timestamp}`;  // Combine random number and timestamp
  };

  const getCurrentDateTime = (): string => {
    const now = new Date();
    return now.toLocaleString();  // Returns date and time in readable format
  };

  const handleGenerateQR = async () => {
    if (!inputValue) {
      alert("Please enter some text!");
      return;
    }

    // Append the unique string to the input value
    const uniqueValue = `${inputValue}-${generateUniqueString()}`;
    const currentTime = getCurrentDateTime();  // Get the current date and time
    setGeneratedTime(currentTime);  // Store the generation time

    try {
      const url = await QRCode.toDataURL(uniqueValue);
      setQrCodeUrl(url);
    } catch (err) {
      console.error("Failed to generate QR code", err);
    }
  };

  const handleDownloadPDF = () => {
    if (!qrCodeUrl) {
      alert("Please generate a QR code first!");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(48);
    doc.setFont("helvetica", "bold");
    doc.text("QR Code", 70, 10);
    doc.addImage(qrCodeUrl, "PNG", 10, 20, 200, 200);
    doc.setFontSize(16); 
    doc.text(`Generated on: ${generatedTime}`, 30, 280);
    
    doc.save("QRCode.pdf");// --- require modification
  };

  return (
    <div className="container" style={{ textAlign: "center" }}>
      <h1>QR Code Generator</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter text to generate QR code"
        style={{ width: "300px", padding: "8px", marginBottom: "10px" }}
      />
      <br />
      <button onClick={handleGenerateQR} style={{ marginBottom: "20px" }}>
        Generate QR Code
      </button>

      {qrCodeUrl && (
        <div>
          <img src={qrCodeUrl} alt="Generated QR Code" />
          <p>Generated on: {generatedTime}</p>
        </div>
      )}

      <br />
      <button onClick={handleDownloadPDF}>Download as PDF</button>
    </div>
  );
};

export default QrCodeGenerator;

