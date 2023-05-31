import React, { useState } from "react";

function CreateRideForm() {

  const [maxRiders, setMaxRiders] = useState("");
  const [meetupTime, setMeetupTime] = useState("");
  const [meetupLocation, setMeetupLocation] = useState("");

  return (
    <>
      <div className="flex items-center justify-center">
        <form className="bg-pine-glade shadow-md rounded px-20 pt-6 pb-8 m-4">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-2xl font-semibold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Ride Details</h2>

              <p className="mt-3 text-m leading-8 text-gray-600">Thanks for offering to drive other hikers.  Please enter the details of your ride here.</p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
                <div className="sm:col-span-2">
                  <label htmlFor="userId" className="block text-sm font-medium leading-6 text-gray-900">
                    User ID
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="userId"
                      id="userId"
                      autoComplete="off"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>


                <div className="sm:col-span-2">
                  <label htmlFor="hikeId" className="block text-sm font-medium leading-6 text-gray-900">
                    Hike ID
                  </label>
                  <div className="mt-2">
                    <input
                      id="hikeId"
                      name="hikeId"
                      type="number"
                      autoComplete="off"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="maxRiders" className="block text-sm font-medium leading-6 text-gray-900">
                    Number of hikers you are willing to drive
                  </label>
                  {/* </div>
                <div className="sm:col-span-2"> */}
                  <div className="mt-2">
                    <input
                      id="maxRiders"
                      name="maxRiders"
                      type="number"
                      autoComplete="off"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="meetupTime" className="block text-sm font-medium leading-6 text-gray-900">
                    Meetup Time
                  </label>
                  <div className="mt-2">
                    <input
                      type="time"
                      name="meetupTime"
                      id="meetupTime"
                      autoComplete="off"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="meetupLocation" className="block text-sm font-medium leading-6 text-gray-900">
                    Meetup Location
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="meetupLocation"
                      id="meetupLocation"
                      autoComplete="street-address"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="region"
                      id="region"
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="postal-code"
                      id="postal-code"
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="reset" className="text-sm font-semibold leading-6 text-gray-900">
              Reset
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  )

}

export default CreateRideForm;
