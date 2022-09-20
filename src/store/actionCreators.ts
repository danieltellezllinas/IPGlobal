import * as actionTypes from "./actionTypes";

export function addVote(vote: Vote) {
  const action: VoteAction = {
    type: actionTypes.ADD_VOTE,
    vote
  };

  return dispatchAction(action);
}

export function removeVote(vote: Vote) {
  const action: VoteAction = {
    type: actionTypes.REMOVE_VOTE,
    vote
  };
  return dispatchAction(action);
}

export function dispatchAction(action: VoteAction) {
  return (dispatch: DispatchType) => {
    setTimeout(() => {
      dispatch(action);
    }, 500);
  };
}
