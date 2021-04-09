import { logout } from "./logout.js";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ error: "unauthenticated" }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

it("Check user's session status", async () => {
  const data = await logout();

  expect(data["error"]).toEqual("unauthenticated");
  expect(fetch).toHaveBeenCalledTimes(1);
});