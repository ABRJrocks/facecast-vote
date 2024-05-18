import { jsPDF } from "jspdf";
import "jspdf-autotable";

export const generatePDF = async (election) => {
  if (!election) return;

  const doc = new jsPDF();
  let yPos = 50;
  const pageWidth = doc.internal.pageSize.width;

  const img = new Image();
  img.src = process.env.PUBLIC_URL + "/facecast-no-bg.png"; // Use the imported image as the source

  await new Promise((resolve) => {
    img.onload = () => {
      doc.addImage(img, "PNG", 75, 5, 50, 25);
      resolve();
    };
  });

  doc.setFontSize(16);
  doc.setFont("times", "bold");
  doc.text("FaceCast Vote Election System", pageWidth / 2, yPos, {
    align: "center",
  });
  doc.setFontSize(16);
  doc.setFont("times", "bold");
  yPos += 10;
  doc.text(`Election Report ${election.title}`, pageWidth / 2, yPos, {
    align: "center",
  });

  yPos += 20;
  doc.setFontSize(12);
  doc.setFont("times", "normal");
  doc.text("Start at:", 20, yPos);
  doc.text(election.start_at, 50, yPos);

  yPos += 10;
  doc.text("End Time:", 20, yPos);
  doc.text(election.end_at, 50, yPos);

  yPos += 10;
  doc.text("Election type:", 20, yPos);
  doc.text(election.type, 50, yPos);

  yPos += 20;
  doc.setFont("times", "bold");

  // Generate table
  const tableData = [["Constituency", "Candidate Name"]];
  election.constituencies.forEach((constituency) => {
    tableData.push([constituency.name, ""]);
    constituency.candidates.forEach((candidate) => {
      tableData.push(["", candidate.name]);
    });
  });

  doc.autoTable({
    startY: yPos,
    head: [tableData[0]], // Header row
    body: tableData.slice(1), // Data rows
    theme: "striped", // Apply grid theme for table
    styles: { font: "times", fontStyle: "normal" }, // Set font style for table content
    columnStyles: {
      0: { fontStyle: "bold" }, // Bold font style for first column (Constituency)
    },
    didDrawPage: function (data) {
      // Add footer
      const pageCount = doc.internal.getNumberOfPages();
      const pageHeight = doc.internal.pageSize.height;
      const pageWidth = doc.internal.pageSize.width;
      doc.setFontSize(10);
      doc.text(
        "Page " + data.pageNumber + " of " + pageCount,
        pageWidth - 20,
        pageHeight - 10,
        { align: "right" }
      );
      doc.text("Election Commissioner FaceCastVote", 20, pageHeight - 20);
      // Add computer-generated image text
      doc.text(
        `This is a computer-generated document by FaceCast Voter for ${
          election.title
        } on ${getCurrentDate()}`,
        20,
        pageHeight - 10,
        { align: "left" }
      );
    },
  });

  doc.save(`${election.title}-${election.type}.pdf`);
};

export async function generateResultPdf(result) {
  console.log("Generating PDF for", result.electionTitle);
  const doc = new jsPDF();
  let yPos = 50;
  const pageWidth = doc.internal.pageSize.width;
  console.log("Page width", pageWidth);

  // Use a different variable name for the dynamically created Image object
  var img = new Image();
  img.src = img.src = process.env.PUBLIC_URL + "/facecast-no-bg.png"; // Use the imported image as the source
  // Use the imported image as the source
  console.log("Image source", img.src);
  // Wait for the image to load before adding it to the PDF
  await new Promise((resolve) => {
    img.onload = () => {
      // Add image to PDF
      doc.addImage(img, "PNG", 75, 5, 50, 25, { align: "center" });
      resolve();
    };
  });
  console.log("Image added to PDF");
  // Set font size and style for title
  doc.setFontSize(16);
  doc.setFont("times", "bold");
  doc.text("FaceCast Vote Election System", pageWidth / 2, yPos, {
    align: "center",
  });
  console.log("Title added to PDF");
  // Set font size and style for election title
  yPos += 20;
  doc.setFontSize(12);
  doc.setFont("times", "normal");
  doc.text(result.electionTitle, 20, yPos);

  // Set font size and style for election date
  yPos += 10;
  doc.setFontSize(12);
  doc.text("Election conducted on " + getCurrentDate(), 20, yPos);

  // Move to next section
  yPos += 20;
  // Set font size and style for table headers
  doc.setFontSize(12);
  doc.setFont("times", "bold");
  const tableData = [["Constituency", "Candidate Name", "Votes", "Winner"]];
  result.constituencies.forEach((constituency) => {
    let maxVotes = 0;
    let winnerName = "";
    constituency.candidates.forEach((candidate) => {
      tableData.push([constituency.name, candidate.name, candidate.votes, ""]);
      if (candidate.votes > maxVotes) {
        maxVotes = candidate.votes;
        winnerName = candidate.name;
      }
    });
    // Tag the winner
    if (winnerName !== "") {
      tableData[tableData.length - 1][3] = "(Winner)";
    }
  });


  // Add table to PDF
  doc.autoTable({
    startY: yPos,
    head: [tableData[0]], // Header row
    body: tableData.slice(1), // Data rows
    theme: "striped", // Apply grid theme for table
    styles: { font: "times", fontStyle: "normal" }, // Set font style for table content
    columnStyles: {
      0: { fontStyle: "bold" }, // Bold font style for first column (Constituency)
    },
    didDrawPage: function (data) {
      // Add footer
      const pageCount = doc.internal.getNumberOfPages();
      const pageHeight = doc.internal.pageSize.height;
      const pageWidth = doc.internal.pageSize.width;
      doc.setFontSize(10);
      doc.text(
        "Page " + data.pageNumber + " of " + pageCount,
        pageWidth - 20,
        pageHeight - 10,
        { align: "right" }
      );
      doc.text("Election Commissioner FaceCastVote", 20, pageHeight - 20);
      // Add computer-generated image text
      doc.text(
        `This is a computer-generated document by FaceCast Voter for ${
          result.electionTitle
        } on ${getCurrentDate()}`,
        20,
        pageHeight - 10,
        { align: "left" }
      );
    },
  });

  // Save PDF
  doc.save("election_results.pdf");
  return true;
}
function getCurrentDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  var yyyy = today.getFullYear();
  return mm + "/" + dd + "/" + yyyy;
}
