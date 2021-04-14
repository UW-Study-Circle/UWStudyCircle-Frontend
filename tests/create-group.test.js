
import { postFormDataAsJson} from "./create-group.js";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(  { 
      "admin": 1,"capacity": 50,"courseinfo": "cs-506","description": "Software Engineering Course Group","duration": 0,"groupname": "Software Engg","id": 1,"level": "Advanced","status": "Public"
  }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});


it("Check group data posted", async () => {
  const response = await postFormDataAsJson();
  

  expect(response["status"]).toEqual("Public");
  expect(fetch).toHaveBeenCalledTimes(1);
});