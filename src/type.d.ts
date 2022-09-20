interface Vote {
    id: number;
    number: number;
  }
  
  type VoteState = {
    votes: Vote[];
  };

  interface PopularMovies {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  }
  
  interface Movie {
    id: number;
    original_title: string;
    overview: string;
    poster_path: string;
    release_date: string;
  }

  interface MovieInfo {
    id: number;
    original_title: string;
    poster_path: string;
    overview: string;
    original_language: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
  }

  interface RatedMovie {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  }
  
  interface Movie {
    id: number;
    original_title: string;
    rating: number;
  }
  
  type VoteAction = {
    type: string;
    vote: Vote;
  };
  
  type DispatchType = (args: VoteAction) => VoteState;
