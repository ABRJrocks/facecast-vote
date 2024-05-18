import React from "react";

const ElectionCard1 = () => {
  return (
    <section className="text-gray-600 mb-4">
      <div className="">
        <div className="flex flex-wrap">
          <div className="">
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              <img
                className="lg:h-48 md:h-36 w-full object-cover object-center"
                src="https://dummyimage.com/720x400"
                alt="blog"
              />
              <div className="p-6">
                <h1 className="title-font text-xl font-medium text-gray-900 mb-3">
                  Party Name
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ElectionCard1;
