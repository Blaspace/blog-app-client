import React from "react";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router";
import AllBogSkeleton from "./AllBogSkeleton";

function AllBlog({ blog, users }) {
  const navigate = useNavigate();
  return (
    <>
      {!blog?.length && !users?.length ? (
        //skeleton loader
        <AllBogSkeleton cards={4} />
      ) : (
        blog.map((value) => {
          //getting the bloger for each of the blog
          const bloger = users?.filter((person) => person._id === value.userid);
          return (
            <div className="blog-con" key={value._id}>
              <div
                className="blog-profile"
                onClick={() => navigate(`../profile/${value.userid}`)}
              >
                {/*checking if the bloger has any image*/}
                {bloger[0]?.image && Object.keys(bloger[0]?.image).length ? (
                  <img
                    src={`data:image;base64,${btoa(
                      String.fromCharCode(
                        ...new Uint8Array(bloger[0]?.image?.data?.data)
                      )
                    )}`}
                    alt="profile"
                    onClick={() => navigate(`../profile/${bloger._id}`)}
                  />
                ) : (
                  <CgProfile
                    className="profile-icon"
                    onClick={() => navigate(`../profile/${value.userid}`)}
                  />
                )}
                <span>
                  <p style={{ fontWeight: "bolder" }}>{value.username}</p>
                  <p style={{ color: "grey", fontSize: "smaller" }}>
                    {bloger[0]?.email}
                  </p>
                </span>
              </div>
              <div
                className="allblogs"
                onClick={() => navigate(`/singleblog/${value._id}`)}
              >
                <p className="blog-text">
                  {value.blog && value.blog.slice(0, 200)}
                  {value.blog && value.blog.length > 200 && "..."}
                </p>
                {value?.blogimage && (
                  <div className="blog-image">
                    <img
                      src={`data:image;base64,${btoa(
                        String.fromCharCode(
                          ...new Uint8Array(value?.blogimage?.data?.data)
                        )
                      )}`}
                      alt="blogimage"
                    />
                  </div>
                )}
                <p className="blog-date">{value.date}</p>
              </div>
            </div>
          );
        })
      )}
    </>
  );
}

export default AllBlog;
