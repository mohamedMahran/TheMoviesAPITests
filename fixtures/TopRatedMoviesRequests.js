import frisby,{ Joi } from "frisby";
import { apiUrl, api_key,invalid_key} from "../config"
export class TopRatedMoviesRequests
{
    async validateTopRatedMoviesWithValidApi()
    {
        return frisby 
            .get(`${apiUrl}/movie/top_rated?api_key=${api_key}`)
            .expect("status", 200)
            .expect('jsonTypes', 'results.*', {
            'title': Joi.string().required(),
            }).then(function(res)
            {
            var data =JSON.parse(res['body']);
            for(var i = 0 ; i < data.length;i++)
                {
                expect(data.results[i]['title']).toBe('Your Eyes Tell');
                expect(data.results[i]['popularity']).toBe('14.517');
                }
            });
    }
    async validateTopRatedMoviesWithInvalidApi()
    {
        return await frisby 
        .get(`${apiUrl}/movie/top_rated?api_key=${invalid_key}`)
        .expect("status", 401)
        .then(function(res)
        {
          var data =JSON.parse(res['body']);
          expect(data.status_code).toBe(7);
          expect(data.status_message).toBe("Invalid API key: You must be granted a valid key.");
        });
    }
}
export const topRatedMoviesRequests = new TopRatedMoviesRequests();