import { getUser } from "./index.js";
import { renderPage } from "./index.js";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
        Error: "Unauthenticated"
      }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

it("Check access control", async () => {
  const profile = await getUser();

  expect(profile["Error"]).toEqual("Unauthenticated");
  expect(fetch).toHaveBeenCalledTimes(1);
});

it("Check access control", async () => {
    var result = await renderPage();
  
    expect(result).toEqual({Error:"Unauthenticated"});
    expect(fetch).toHaveBeenCalledTimes(1);
  });
