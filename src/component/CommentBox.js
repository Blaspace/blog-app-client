import React, { useContext, useState } from "react";
import AllContext from "../contexts/AllContext";
import BlogContext from "../contexts/BlogContext";

function CommentBox({ blogId, commenterId, setCommenterId }) {
  const [comments, setComments] = useState("");
  const [errors, sendError] = useState(null);
  const { uri } = useContext(AllContext);
  const { comment, setComment } = useContext(BlogContext);

  const handleComment = (e) => {
    e.target.innerText = "Loading...";
    e.target.style.backroundColor = "grey";
    if (comments.length) {
      fetch(`${uri}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blogId,
          commenterId,
          comment: comments,
        }),
      })
        .then((res) => res.json())
        .then((data) => setComment([...comment, data]))
        .catch((err) => console.log(err))
        .finally(() => {
          e.target.innerText = "Send";
          e.target.style.backroundColor = "black";
          setComments("");
          setCommenterId(null);
        });
    } else {
      sendError("please fill out the comment area");
      e.target.innerText = "Loading...";
      e.target.style.backroundColor = "grey";
    }
  };
  return (
    <>
      {commenterId && (
        <div className="comment-pop">
          <div>
            <h3 onClick={() => setCommenterId(null)}>&times;</h3>
            <p style={{ color: "red" }}>{errors}</p>
            <h4>Send your comment</h4>
            <br />
            <textarea
              placeholder="Comment..."
              onChange={(e) => setComments(e.target.value)}
            />
            <br />
            <button onClick={(e) => handleComment(e)}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

export default CommentBox;
