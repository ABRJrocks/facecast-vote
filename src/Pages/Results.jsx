import React, { useState, useEffect } from "react";
import { getCollections } from "../utils/globals";
import { resultsRef } from "../config/firebase";
import { MdPrint } from "react-icons/md";
import toast from "react-hot-toast";
import { generateResultPdf } from "../utils/pdgGen";

const Results = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const fetchedResults = await getCollections(resultsRef);
        setResults(fetchedResults);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching results", error);
      }
    };
    fetchResults();
  }, []);

  const asyncGeneratePDF = async (result) => {
    console.log("Generating PDF for");
    const value = await generateResultPdf(result);
    if (value === true) {
      toast.success("PDF generated successfully");
    } else {
      toast.error("Error generating PDF");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <section>
        <h1 className="text-3xl font-semibold text-gray-800 py-6">Results</h1>
        <hr className="py-4 border-t-2 border-gray-300" />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {results.map((result) => (
              <DataLine1
                key={result.id}
                value={result.electionTitle}
                result={result} // Pass the entire result object
                onPrintClick={asyncGeneratePDF} //ass the function reference directly
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

const DataLine1 = ({ value, result, onPrintClick }) => {
  return (
    <div className="border-b border-gray-200 py-4 flex justify-between">
      <span className="text-gray-900 text-lg font-medium">{value}</span>
      <button
        onClick={() => onPrintClick(result)} // Pass the result object
        className="flex flex-row items-center gap-5"
      >
        <MdPrint className="h-6 w-6" />
      </button>
    </div>
  );
};

export default Results;
