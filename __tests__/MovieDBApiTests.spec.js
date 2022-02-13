import frisby, { Joi } from "frisby";
import { apiUrl, api_key, invalid_key,movie_id} from "../config";

describe("Verify get top rated movies APIs tests", () => {

  it("Verify status is equal 200 and verify Response Body ", () => 
  {
    return frisby 
      .get(`${apiUrl}/movie/top_rated?api_key=${api_key}`)
      .expect("status", 200)
      .expect('jsonTypes', 'results.*', {
        'title': Joi.string().required(),
      }).then(function(res){
        var data =JSON.parse(res['body']);
        for(var i = 0 ; i < data.length;i++)
        {
          expect(data.results[i]['title']).toBe('Your Eyes Tell');
          expect(data.results[i]['popularity']).toBe('14.517');
        }
      })
  
    });

    it("Verify status is equal 401 when get request has an invalid key", () => 
    {
      return frisby 
      .get(`${apiUrl}/movie/top_rated?api_key=${invalid_key}`)
      .expect("status", 401)
      .then(function(res){
        var data =JSON.parse(res['body']);
        expect(data.status_code).toBe(7);
        expect(data.status_message).toBe("Invalid API key: You must be granted a valid key.");

      })
    })
});

describe("Verify rate movies APIs tests", async() => {
 
   it("Verify status is equal 201 while posting rate movies ", async () => 
    {
    const postValues = {
      "value": 8.5
    };
    var response = await frisby.
    get(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${api_key}`);
    
    // Save the Guest Session ID to be used in other test cases
    let guest_key = await response.json.guest_session_id;
    console.log(guest_key);
    await frisby 
      .post(`${apiUrl}/movie/${movie_id}/rating?api_key=${api_key}&&guest_session_id=${guest_key}`,postValues)
      .expect("status", 201).then(function(res){
        var data =JSON.parse(res['body']);
        expect(data.status_message).toBe('Success.');
      })
    });
   it("Verify status is equal 401 while posting rate movies with invalid guest session id ", async () => 
   {
   const postValues = {
     "value": 8.5
   };
   var response = await frisby.
   get(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${api_key}`);
   
   // Save the Guest Session ID 
   let guest_key = await response.json.guest_session_id;
 
   await frisby 
     .post(`${apiUrl}/movie/${movie_id}/rating?api_key=${invalid_key}&&guest_session_id=${guest_key}`,postValues)
     .expect("status", 401).then(function(res){
       var data =JSON.parse(res['body']);
       expect(data.status_message).toBe('Invalid API key: You must be granted a valid key.');
     })
   });
});

