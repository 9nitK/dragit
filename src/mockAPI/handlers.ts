import { http, HttpResponse, PathParams } from "msw";

import { Doc } from "../pages/home/types";
import { DOCS } from "./DocData";

export const handlers = [
  // Gives docs data
  http.get(`/docs`, async () => {
    const localDocData = localStorage.getItem("docs");
    return HttpResponse.json({
      docs: localDocData ? JSON.parse(localDocData) : DOCS,
    });
  }),

  // Updates docs data
  http.post<PathParams, { docs: Doc[] }>(`/docs`, async ({ request }) => {
    const data = await request.json();
    localStorage.setItem("docs", JSON.stringify(data.docs));
    return HttpResponse.json(
      {
        data,
      },
      { status: 201 }
    );
  }),
];
