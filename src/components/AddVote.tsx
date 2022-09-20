import * as React from "react";
import { sendVote } from "../config/api/api";

type Props = {
  saveVote: (vote: Vote | any) => void;
  movieId: number | undefined;
};

export const AddVote = ({ saveVote, movieId }: Props) => {
  const [vote, setVote] = React.useState<Vote | any>();

  const handleVoteData = (e: React.FormEvent<HTMLInputElement>) => {
    setVote({
      ...vote,
      [e.currentTarget.id]: e.currentTarget.value
    });
  };
  
  const addNewVote = (e: React.FormEvent) => {
    e.preventDefault();
    if(vote !== undefined)
    sendVote(movieId, localStorage.getItem("session_id"), vote?.number);
    saveVote(vote);
  };

  return (
    <form onSubmit={addNewVote} className="Add-vote">
      <input
        type="number"
        id="number"
        placeholder="Write here"
        max={10}
        onChange={handleVoteData}
      />
      <button disabled={vote === undefined ? true : false}>
        Send vote
      </button>
    </form>
  );
};
