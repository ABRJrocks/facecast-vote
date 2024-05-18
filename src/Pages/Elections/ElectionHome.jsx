import React, { useEffect, useState } from "react";
import EditModal from "./EditModal";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdOpenInNew } from "react-icons/md";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { getElections } from "../../utils/elections";
import { MdOutlineLocalPrintshop } from "react-icons/md";

const ElectionHome = () => {
  // Define data
  const [elections, setElections] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const [selectedElectionId, setSelectedElectionId] = useState(null);

  const openModal = (id) => {
    setIsOpen(true);
    setSelectedElectionId(id);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getElections();
        console.log("data", data);
        if (data) {
          setElections(data);
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };
    fetchData();
  }, []);

  const generatePDF = (election) => {
    if (!election) return;

    // Get current date
    const currentDate = new Date();
    // Convert election date string to Date object
    const electionDate = new Date(election.election_date);

    // Create a new jsPDF instance with orientation 'p' for portrait mode
    const pdf = new jsPDF("p", "mm", "a4");

    // Add a header with Election Commission of Pakistan logo and title
    // Add announcement if current date is before election date

    // Add a title to the PDF
    pdf.setFontSize(18);
    pdf.setTextColor("#006600"); // Green color for title
    pdf.text("Election Data", 105, 20, { align: "center" });

    if (currentDate < electionDate) {
      // Additional text about the election announcement
      pdf.setFont("times", "normal");
      pdf.setFontSize(12);
      pdf.setTextColor("#000000"); // Black color for text
      pdf.text("Announcement:", 10, 40);
      pdf.text(
        "The Election Commission of Pakistan announces the details of the upcoming election.",
        10,
        50
      );
    }

    // Add election details to the PDF
    pdf.setFont("times", "normal");
    pdf.setFontSize(14);
    pdf.setTextColor("#000000"); // Black color for text
    pdf.text("Election Details:", 10, currentDate < electionDate ? 70 : 40);
    pdf.text(
      `Title: ${election.title}`,
      10,
      currentDate < electionDate ? 80 : 50
    );
    pdf.text(
      `Type: ${election.type}`,
      10,
      currentDate < electionDate ? 90 : 60
    );
    pdf.text(
      `Election Date: ${election.election_date}`,
      10,
      currentDate < electionDate ? 100 : 70
    );

    // Add constituencies and candidates to the PDF
    let yPosition = currentDate < electionDate ? 120 : 90; // Starting y-position for constituency data
    election.constituencies.forEach((constituency) => {
      pdf.setFont("times", "bold");
      pdf.setFontSize(16);
      pdf.text(`Constituency: ${constituency.name}`, 10, yPosition);
      yPosition += 10;
      constituency.candidates.forEach((candidate) => {
        pdf.setFont("times", "normal");
        pdf.setFontSize(14);
        pdf.text(`- ${candidate.name}`, 15, yPosition);
        yPosition += 5;
      });
      yPosition += 5; // Add spacing between constituencies
    });

    // Save the PDF file with a filename
    pdf.save("election_announcement_ecp.pdf");
  };

  // Save the PDF file with a filename

  // const difference = +new Date(election.end_at) - +new Date();
  const renderActions = (elections) => (
    <div className="flex items-center justify-between gap-4">
      <button
        className="bg-regal-blue-700 text-regal-blue-50 p-2 rounded-md hover:bg-regal-blue-700/80"
        onClick={() => generatePDF(elections)} // Pass the current election item to generatePDF
      >
        <MdOutlineLocalPrintshop />
      </button>
      {
      +new Date(elections.end_at) - +new Date() > 0 ? (
        <button
          className="bg-regal-blue-600 text-regal-blue-50 p-2 rounded-md hover:bg-regal-blue-600/80"
          onClick={() => openModal(elections.id)} // Pass id to onEdit function
        >
          <FaRegEdit />
        </button>
      ) : null}
      <Link to={`${elections.id}`} className="text-green-600 hover:underline">
        <button className="bg-green-600 text-green-50 p-2 rounded-md hover:bg-green-600/80">
          <MdOpenInNew />
        </button>
      </Link>
    </div>
  );

  return (
    <>
      <h1 className="text-3xl font-semibold text-gray-800 py-6">
        Elections Home
      </h1>
      <hr className="py-4 border-t-2 border-gray-300" />
      <EditModal
        isOpen={isOpen}
        closeModal={closeModal}
        electionId={selectedElectionId}
      />
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Start datetime - End datetime
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Election Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          -
          {elections.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{item.title}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{item.type}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {new Date(item.start_at).getHours() +
                    ":" +
                    new Date(item.start_at).getMinutes() +
                    " - " +
                    new Date(item.end_at).getHours() +
                    ":" +
                    new Date(item.end_at).getMinutes()}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {new Date(item.start_at).toISOString().split("T")[0]}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end items-center">
                {renderActions(item)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ElectionHome;
