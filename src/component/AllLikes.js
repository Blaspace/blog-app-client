import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { AiFillLike } from "react-icons/ai";

function AllLikes() {
  const [AllLikes, setAllLikes] = useState();
  const { like, users } = useSelector((state) => state.BlogSlice);
  const { uri } = useSelector((state) => state.AuthSlice);

  const params = useParams();
  useEffect(() => {
    const i = like?.filter((v) => v.blogId === params.id);
    setAllLikes(i);
  }, [like]);
  return (
    <ul className="alllikes">
      {AllLikes?.map((value) => {
        const liker = users?.filter((i) => i?._id === value?.fromId);
        return (
          <li key={value?._id}>
            {liker[0]?.image ? (
              <img src={`${uri}/profile/${liker[0]?._id}`} />
            ) : (
              <CgProfile size={50} />
            )}
            <AiFillLike size={25} color="blue" className="likeicon" />
            <span>{liker[0]?.username}</span>
          </li>
        );
      })}
    </ul>
  );
}

export default AllLikes;
