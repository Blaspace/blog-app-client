import React from "react";
import Skeleton from "react-loading-skeleton";

function SkeletonRightSideBar() {
  return (
    <>
      {Array(5)
        .fill("0")
        ?.map((item, index) => {
          return (
            <li key={index}>
              <Skeleton circle height={"55px"} width={"55px"} />
              <span>
                <Skeleton
                  width={"50%"}
                  style={{ position: "relative", left: "70px", bottom: "40px" }}
                />
              </span>
            </li>
          );
        })}
    </>
  );
}

export default SkeletonRightSideBar;
