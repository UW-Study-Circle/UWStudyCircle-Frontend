import { getUser } from "./dashboard.js";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
        "bday": "28-01-1995",
        "email": "a@e.c",
        "firstname": "Akshat",
        "formatted_name": "akshat",
        "gender": "Male",
        "id": 1,
        "lastname": "Sinha",
        "password": "sha256$GOnGBLJM$442cb724a1eede1edc8babda38d9cbc19f31c7a5ac515cd8e6d112c5973d5e1d",
        "phonenumber": "123456789",
        "username": "akshat"
      }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

it("Check profile username", async () => {
  const profile = await getUser();

  expect(profile["username"]).toEqual("akshat");
  expect(fetch).toHaveBeenCalledTimes(1);
});

it("Check profile email", async () => {
    const profile = await getUser();
  
    expect(profile["email"]).toEqual("a@e.c");
    expect(fetch).toHaveBeenCalledTimes(1);
  });