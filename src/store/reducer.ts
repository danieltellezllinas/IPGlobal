import * as actionTypes from "./actionTypes";

const initialState: VoteState = {
  votes: []
};

const reducer = (
  state: VoteState = initialState,
  action: VoteAction
): VoteState => {
  switch (action.type) {
    case actionTypes.ADD_VOTE:
      const newVote: Vote = {
        id: Math.random(),
        number: action.vote.number
      };
      return {
        ...state,
        votes: state.votes.concat(newVote)
      };
    case actionTypes.REMOVE_VOTE:
      const updatedVotes: Vote[] = state.votes.filter(
        (vote) => vote.id !== action.vote.id
      );
      return {
        ...state,
        votes: updatedVotes
      };
  }
  return state;
};

export default reducer;
