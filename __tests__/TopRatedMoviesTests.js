import {topRatedMoviesRequests} from "../fixtures/TopRatedMoviesRequests"
describe("Verify get top rated movies APIs tests", () => {

    it("Verify status is equal 200 and verify Response Body ", async() => {
      await topRatedMoviesRequests.validateTopRatedMoviesWithValidApi();
      });
  
      it("Verify status is equal 401 when get request has an invalid key", async() => 
      {
        await topRatedMoviesRequests.validateTopRatedMoviesWithInvalidApi();
      })
  });
