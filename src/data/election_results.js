const electionResultsAnnouncement = {
    election_id: "election_id", // ID of the election
    voter_turnout: {
      percentage: 70, // Voter turnout percentage for the election
      total_votes: 700000, // Total number of votes cast in the election
      // Optionally include more detailed turnout information if needed
    },
    results: [
      {
        constituency_id: "PK-123", // ID of the constituency
        winner: {
          candidate_id: "candidate_id_1", // ID of the winning candidate in the constituency
          votes_received: 35000, // Number of votes received by the winning candidate
          // Optionally include more details about the winning candidate
        },
        // Optionally include more details about the results of this constituency
      },
      // Include results for other constituencies as needed
    ],
    announcements: [
      {
        type: "preliminary_results", // Type of announcement
        date: new Date("2023-07-26T10:00:00"), // Date of the announcement
        details: "Preliminary results for constituency PK-123 declared." // Details or summary of the announcement
      },
      // Include other announcements made during the election process
    ]
  };
  