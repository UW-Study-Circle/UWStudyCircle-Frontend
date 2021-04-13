
import { postFormDataAsJson} from "./create-group.js";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(  { "admin": 0,
    "capacity": 0,
    "courseinfo": "string",
    "description": "string",
    "duration": 0,
    "groupname": "string",
    "level": "string",
    "status": "string"
  }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});



test("Create group response", async () => {
  const responseData = await postFormDataAsJson("http://127.0.0.1:6969/api/group/", {
    "admin": 0,
    "capacity": 0,
    "courseinfo": "string",
    "description": "string",
    "duration": 0,
    "groupname": "string",
    "level": "string",
    "status": "string"
  });

  expect(fetch).toHaveBeenCalledTimes(1);
});