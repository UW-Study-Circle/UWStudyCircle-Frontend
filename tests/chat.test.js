import { getGroupInfo } from "./chat.js";




global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ 
        
        "content": [ {
            "admin": 1,
            "capacity": 50,
            "courseinfo": "cs-506",
            "description": "Software Engineering Course Group",
            "duration": 0,
            "groupname": "Software Engg",
            "id": 1,
            "level": "Advanced",
            "status": "Public"
          },
          {
            "admin": 1,
            "capacity": 50,
            "courseinfo": "cs-354",
            "description": "Machine Organization",
            "duration": 0,
            "groupname": "Assembly Language Group",
            "id": 2,
            "level": "Basic",
            "status": "Public"
          },
          {
            "admin": 2,
            "capacity": 50,
            "courseinfo": "cs-839",
            "description": "Security Group",
            "duration": 0,
            "groupname": "Paper Discussion",
            "id": 3,
            "level": "Advanced",
            "status": "Private"
          },
          {
            "admin": 1,
            "capacity": 12,
            "courseinfo": "cs123",
            "description": "machine learning",
            "duration": 121,
            "groupname": "Machine Learning",
            "id": 4,
            "level": "UnderSophmore",
            "status": "Public"
          },
          {
            "admin": 1,
            "capacity": 123,
            "courseinfo": "python prog",
            "description": "C--",
            "duration": 3412,
            "groupname": "Intro to prog",
            "id": 5,
            "level": "UnderJunior",
            "status": "Private"
          },
          {
            "admin": 1,
            "capacity": 123,
            "courseinfo": "dfs",
            "description": "asdkl",
            "duration": 231,
            "groupname": "CS1234",
            "id": 6,
            "level": "highschool",
            "status": "Open"
          },
          {
            "admin": 1,
            "capacity": 2,
            "courseinfo": "CS440",
            "description": "Data Structures",
            "duration": 2,
            "groupname": "CS440",
            "id": 7,
            "level": "UnderSenior",
            "status": "public"
          },
          {
            "admin": 1,
            "capacity": 2,
            "courseinfo": "CS300",
            "description": "Graphics",
            "duration": 2,
            "groupname": "CS300",
            "id": 8,
            "level": "UnderFreshman",
            "status": "private"
          },
          {
            "admin": 1,
            "capacity": 2,
            "courseinfo": "EC001",
            "description": "Sec-01",
            "duration": 2,
            "groupname": "Electronics",
            "id": 9,
            "level": "Graduate",
            "status": "public"
          }] 
    }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});


test("Check groups info", async () => {

    
  
    const data = await getGroupInfo(2);
    expect(data).toBe(2);
    expect(fetch).toHaveBeenCalledTimes(1);
 

  });


