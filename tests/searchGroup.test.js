import { searchGroup } from "./searchGroup.js";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ 
        
        "content": [{"admin": 1,"capacity": 50,"courseinfo": "cs-506","description": "Software Engineering Course Group","duration": 0,"groupname": "Software Engg","id": 1,"level": "Advanced","status": "Public"}]
    }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

it("Check search group", async () => {

    // var query = document.getElementById("search_query");
    // query.value='software';
    var query='software';
    const data = await searchGroup(query);
    expect(data["content"].length).toBe(1);
 

  });

it("Check search group content", async () => {

    // var query = document.getElementById("search_query");
    // query.value='software';
    var query='software';
    const data = await searchGroup(query);
    const val=data['content'];
    
    expect(val[0].capacity).toBe(50);

  });
