import { postFormDataAsJson} from "./register.js";
import { handleFormSubmit} from "./register.js";


global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(  { 
      duplicate:"Email already exists"
  }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});


it("Check register", async () => {
  const response = await postFormDataAsJson();
  

  expect(response["duplicate"]).toEqual("Email already exists");
  expect(fetch).toHaveBeenCalledTimes(1);
});

it("Check submit button", async () => {
    const result = await handleFormSubmit();

    
    
  
    expect(result["duplicate"]).toEqual("Email already exists");
    expect(fetch).toHaveBeenCalledTimes(1);
  });