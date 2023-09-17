import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import BlogContext from "../../contexts/BlogContext";
import AllContext from "../../contexts/AllContext";

function AllComment() {
  const [newComment, setNewComment] = useState([]);
  const { comment, users } = useContext(BlogContext);
  const { uri } = useContext(AllContext);

  const params = useParams();
  useEffect(() => {
    const i = comment?.filter((v) => v?.blogId === params?.id);
    setNewComment(i);
  }, [comment]);
  return (
    <div className="allComment">
      {newComment?.map((value) => {
        const commenter = users?.filter((v) => v._id === value?.commenterId);
        return (
          <div key={value?._id}>
            <h4>
              {commenter[0]?.image ? (
                <img
                  src={`${uri}/profile/${commenter[0]?._id}`}
                  alt="profile"
                  width={30}
                  height={30}
                  style={{ borderRadius: "50%", border: "2px solid grey" }}
                />
              ) : (
                <CgProfile size={25} />
              )}
              <span>{commenter[0]?.username}</span>
            </h4>
            <p>{value?.comment}</p>
          </div>
        );
      })}
    </div>
  );
}

export default AllComment;
