export const elections = [
  {
    id: "1",
    title: "General Elections 2023",
    type: "national",
    election_date: "2024-06-25",
    start_at: "08:00:00", // Assuming time format HH:mm:ss
    end_at: "12:00:00", // Assuming time format HH:mm:ss
    created_at: "2023-04-01T09:00:00",
    status: "online",
    constituencies: [
      {
        const_id: "23",
        name: "Lahore",
        candidates: [
          {
            id: "50",
            name: "Imran Khan",
            party: "Pakistan Tehreek-e-Insaf (PTI)"
          },
          {
            id: "51",
            name: "Maryam Nawaz",
            party: "Pakistan Muslim League-Nawaz (PML-N)"
          },
          {
            id: "52",
            name: "Bilawal Bhutto Zardari",
            party: "Pakistan Peoples Party (PPP)"
          }
        ]
      },
      {
        const_id: "56",
        name: "Karachi",
        candidates: [
          {
            id: "12",
            name: "Mustafa Kamal",
            party: "Pak Sarzameen Party (PSP)"
          },
          {
            id: "56",
            name: "Altaf Hussain",
            party: "Muttahida Qaumi Movement (MQM)"
          }
        ]
      }
    ]
  }
];
