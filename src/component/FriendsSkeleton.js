import React from "react";
import Skeleton from "react-loading-skeleton";

function FriendsSkeleton({ cards }) {
  return Array(cards)
    .fill("0")
    ?.map((item, index) => {
      return (
        <li key={index}>
          <Skeleton circle height={"55px"} width={"55px"} />
          <p>
            <Skeleton width={"200px"} height={"15px"} />
          </p>
        </li>
      );
    });
}

export default FriendsSkeleton;
