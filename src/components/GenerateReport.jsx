import React, { useState } from 'react';
import { saveAs } from 'file-saver'; // Ensure file-saver is imported
import { jsPDF } from 'jspdf'; // Import jsPDF for PDF generation
import * as XLSX from 'xlsx'; // Import XLSX for Excel generation

const GenerateReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportType, setReportType] = useState('sales'); // default to Sales Report
  const [reportFormat, setReportFormat] = useState('csv'); // default to CSV

  // Handle the form submission to generate the report
  const handleGenerateReport = () => {
    if (!startDate || !endDate) {
      alert('Please select both start date and end date.');
      return;
    }

    // Prepare the data (mock report data for this example)
    const reportData = generateReportData();

    // Generate the report based on the selected format
    if (reportFormat === 'csv') {
      downloadCSV(reportData);
    } else if (reportFormat === 'pdf') {
      downloadPDF(reportData);
    } else if (reportFormat === 'excel') {
      downloadExcel(reportData);
    }
  };

  // Mock function to generate the report data
  const generateReportData = () => {
    // This function would normally call an API to fetch the report data
    return [
      { product: 'Cake', sales: 100, quantitySold: 50 },
      { product: 'Pastry', sales: 150, quantitySold: 60 },
      { product: 'Bread', sales: 80, quantitySold: 30 },
    ];
  };

  // Function to download CSV file
  const downloadCSV = (data) => {
    const csvContent = 'Product, Sales, Quantity Sold\n' + data.map((row) => `${row.product}, ${row.sales}, ${row.quantitySold}`).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'report.csv');
  };

  // Function to download PDF file (basic mockup)
  const downloadPDF = (data) => {
    const doc = new jsPDF();
    doc.text('Report: Bakery Sales', 20, 20);
    data.forEach((row, index) => {
      doc.text(`${row.product}: $${row.sales} - ${row.quantitySold} sold`, 20, 30 + index * 10);
    });
    doc.save('report.pdf');
  };

  // Function to download Excel file (basic mockup)
  const downloadExcel = (data) => {
    const sheetData = [
      ['Product', 'Sales', 'Quantity Sold'],
      ...data.map((row) => [row.product, row.sales, row.quantitySold]),
    ];

    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Report');
    XLSX.writeFile(wb, 'report.xlsx');
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Generate Report</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        {/* Date Range Selection */}
        <div className="mb-4">
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        {/* Report Type Selection */}
        <div className="mb-4">
          <label htmlFor="reportType" className="block text-sm font-medium text-gray-700">Report Type</label>
          <select
            id="reportType"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          >
            <option value="sales">Sales Report</option>
            <option value="inventory">Inventory Report</option>
            <option value="employee">Employee Report</option>
          </select>
        </div>

        {/* Report Format Selection */}
        <div className="mb-4">
          <label htmlFor="reportFormat" className="block text-sm font-medium text-gray-700">Report Format</label>
          <select
            id="reportFormat"
            value={reportFormat}
            onChange={(e) => setReportFormat(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          >
            <option value="csv">CSV</option>
            <option value="pdf">PDF</option>
            <option value="excel">Excel</option>
          </select>
        </div>

        {/* Generate Report Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleGenerateReport}
            className="bg-bakery-primary text-white px-6 py-2 rounded"
          >
            Generate Report
          </button>
        </div>
      </form>
    </div>
  );
};

export default GenerateReport;
