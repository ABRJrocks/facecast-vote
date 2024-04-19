import React from "react";

const RegisterScreen = () => {
  return (
    <section class="p-6 my-12">
      <h2 class="text-2xl font-semibold text-left sm:text-3xl mb-6 text-slate-900">
        Register Now
      </h2>
      <form action="" class=" mx-auto flex flex-col items-left gap-4">
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
          <div>
            <label for="name1" class="text-lg font-normal text-slate-900">
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              class="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label for="name1" class="text-lg font-normal text-slate-900">
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              class="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label for="name1" class="text-lg font-normal text-slate-900">
              Middle Name
            </label>
            <input
              type="text"
              id="middlename"
              name="middlename"
              class="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
          <div>
            <label for="name1" class="text-lg font-normal text-slate-900">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              class="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label for="name1" class="text-lg font-normal text-slate-900">
              Phone
            </label>
            <input
              type="phone"
              id="Phone"
              name="phone"
              class="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label for="name1" class="text-lg font-normal text-slate-900">
              CNIC
            </label>
            <input
              type="phone"
              id="CNIC"
              name="CNIC"
              class="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
          <div>
            <label for="name1" class="text-lg font-normal text-slate-900">
              Province
            </label>
            <input
              type="text"
              id="province"
              name="province"
              class="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label for="name1" class="text-lg font-normal text-slate-900">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              class="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label for="name1" class="text-lg font-normal text-slate-900">
              Area
            </label>
            <input
              type="text"
              id="Area"
              name="area"
              class="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </form>
    </section>
  );
};

export default RegisterScreen;
