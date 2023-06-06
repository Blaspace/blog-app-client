import React from "react";
import Skeleton from "react-loading-skeleton";

function AllBogSkeleton({ cards }) {
  return (
    <>
      {Array(cards)
        .fill("0")
        ?.map((item, index) => {
          return (
            <div className="blog-con" key={index}>
              <div className="blog-profile">
                <Skeleton circle height={"50px"} width={"50px"} />
                <Skeleton
                  height={"15px"}
                  width={"200px"}
                  style={{ marginTop: "15px" }}
                />
              </div>
              <div
                style={{
                  minHeight: "100px",
                  padding: "15px",
                }}
                className="allblogs"
              >
                <Skeleton
                  count={4}
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                />
              </div>
            </div>
          );
        })}
    </>
  );
}

export default AllBogSkeleton;
