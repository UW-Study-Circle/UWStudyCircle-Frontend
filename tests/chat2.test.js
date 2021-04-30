import { getMemberIds } from "./chat.js";

global.fetch = jest.fn(() =>
Promise.resolve({
  json: () => Promise.resolve(
      [
          {
            "group_id": 2,
            "id": 5,
            "pending": false,
            "user_id": 1
          },
          {
            "group_id": 2,
            "id": 9,
            "pending": false,
            "user_id": 2
          },
          {
            "group_id": 2,
            "id": 11,
            "pending": true,
            "user_id": 1
          }
        ])
      })
      );


test("Check groups members", async () => {

  

  const data = await getMemberIds(2);
  expect(data).toBe("1 (Pending)<br>1<br>1 (Pending)<br>");
  expect(fetch).toHaveBeenCalledTimes(4);


});
