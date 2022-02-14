
import {rateMoviesRequests} from "../fixtures/rateMoviesRequests"

describe("Verify rate movies APIs tests", () => 
{
  it("Verify status is equal 201 while posting rate movies ", async () => {
      await rateMoviesRequests.validateApiTestOfRateMovies();
       });
   it("Verify status is equal 401 while posting rate movies with invalid guest session id ", async () =>{
      await rateMoviesRequests.validateApiTestOfRateMoviesWithInvalidApiKey();
    });
});
