import * as React from "react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";

type Props = {
  vote: Vote;
  removeVote: (vote: Vote) => void;
};

export const Vote: React.FC<Props> = ({ vote, removeVote }) => {
  const dispatch: Dispatch<any> = useDispatch();

  const deleteVote = React.useCallback(
    (vote: Vote) => dispatch(removeVote(vote)),
    [dispatch, removeVote]
  );

  return (
    <div className="Vote">
      <div>
        <h1>{vote.number}</h1>
      </div>
      <button onClick={() => deleteVote(vote)}>Delete</button>
    </div>
  );
};
