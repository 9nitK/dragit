import { http, HttpResponse, PathParams } from "msw";

import { Doc } from "../pages/home/types";
import { DOCS } from "./DocData";

// Define mock API handlers for simulating server responses
export const handlers = [
  // Handler for GET request to fetch docs data
  http.get(`/docs`, async () => {
    // Attempt to retrieve docs data from localStorage
    const localDocData = localStorage.getItem("docs");
    return HttpResponse.json({
      // If local data exists, parse and return it; otherwise, return default DOCS
      docs: localDocData ? JSON.parse(localDocData) : DOCS,
    });
  }),

  // Handler for POST request to update docs data
  http.post<PathParams, { docs: Doc[] }>(`/docs`, async ({ request }) => {
    // Extract the data from the request body
    const data = await request.json();
    // Store the updated docs data in localStorage
    localStorage.setItem("docs", JSON.stringify(data.docs));
    // Return a successful response with the updated data
    return HttpResponse.json(
      {
        data,
      },
      { status: 201 } // Set status code to 201 (Created)
    );
  }),
];
