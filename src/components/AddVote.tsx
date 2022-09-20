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
  
  const addNewVote = async (e: React.FormEvent) => {
    e.preventDefault();
    if(vote !== undefined)
    sendVote(movieId, localStorage.getItem("session_id"), vote?.number);
    saveVote(vote);
  };

  return (
    <form onSubmit={addNewVote} className="addvote__form_global_div">
      Vote now: 
      <input
        className="addvote__color252830 addvote__input_votenow"
        type="number"
        id="number"
        placeholder="Write here"
        max={10}
        onChange={handleVoteData}
      />
      <button disabled={vote === undefined ? true : false}>
        Send
      </button>
    </form>
  );
};