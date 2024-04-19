import React from "react";

const Candidates = ({ candidate }) => {
  const truncateIntroduction = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    } else {
      return text;
    }
  };
  return (
    <section class="text-gray-600 body-font">
      <div class="container mx-auto">
        <div class="flex flex-wrap"></div>
        <div class="">
          <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            <img
              class="lg:h-48 md:h-36 w-full object-cover object-center"
              src={
                candidate.image
                  ? candidate.image
                  : "https://dummyimage.com/720x400"
              }
              alt="blog"
            />
            <div class="p-4">
              <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                {candidate.party ?truncateIntroduction(candidate.party,30) : "Party"}
              </h2>
              <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
                {candidate.name ? candidate.name : "Candidate Name"}
              </h1>
              <p class="leading-relaxed mb-3">
                {candidate.introduction
                  ? truncateIntroduction(candidate.introduction, 50)
                  : "Introduction"}
              </p>
              <div class="flex items-center flex-wrap ">
                <a class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
                  See more
                  <svg
                    class="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </a>
                <span class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                  {candidate.constituency}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Candidates;
