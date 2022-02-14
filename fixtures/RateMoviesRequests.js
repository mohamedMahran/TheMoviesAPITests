import frisby from "frisby";
import { apiUrl, api_key,invalid_key,movie_id} from "../config"
export class RateMoviesRequest
{
   
 
    async getGuestSessionKey()
    {
        var response= await frisby.
            get(`${apiUrl}/authentication/guest_session/new?api_key=${api_key}`,30000);
         return await response.json.guest_session_id;
    }
    async validateApiTestOfRateMovies()
    {
        const payLoad = {"value": 8.5};
        var guest_key= await this.getGuestSessionKey();
        
        await frisby
        .post(`${apiUrl}/movie/${movie_id}/rating?api_key=${api_key}&&guest_session_id=${guest_key}`,payLoad,30000)
        .expect("status", 201).then(function(res)
            {
          var data =JSON.parse(res['body'],30000);
          expect(data.status_message).toBe('Success.');
            })
    }
    async validateApiTestOfRateMoviesWithInvalidApiKey()
    {
        const payLoad = {"value": 8.5};
        var guest_key= await this.getGuestSessionKey();
        await frisby
        .post(`${apiUrl}/movie/${movie_id}/rating?api_key=${invalid_key}&&guest_session_id=${guest_key}`,payLoad,30000)
        .expect("status", 401).then(function(res)
                {
            var data =JSON.parse(res['body'],30000);
            expect(data.status_message).toBe('Invalid API key: You must be granted a valid key.');
                });
    }
}
export const rateMoviesRequests = new RateMoviesRequest();