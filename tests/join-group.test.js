import { getGroupInfo } from "./join-group.js";

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
  
  test("Check join group", async () => {
  
      
      
      var val = await getGroupInfo();
      var data=val.data;
      
      expect(data["content"].length).toBe(1);
      expect(data.content[0].capacity).toBe(50);
     
   
  
    });


    test("Check group info", async () => {
  
      
      
        var value = await getGroupInfo();
        console.log(value);
      
        expect(value.info).toBe('content : [object Object]<br>');
     
    
      });