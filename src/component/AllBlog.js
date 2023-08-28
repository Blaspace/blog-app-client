import React, { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router";
import AllBogSkeleton from "./AllBogSkeleton";
import BlogContext from "../contexts/BlogContext";
import AllContext from "../contexts/AllContext";

function AllBlog() {
  const navigate = useNavigate();
  const { blog, users } = useContext(BlogContext);
  const { uri } = useContext(AllContext);

  return (
    <>
      {!blog?.length && !users?.length ? (
        //skeleton loader
        <AllBogSkeleton cards={4} />
      ) : (
        blog?.map((value) => {
          //getting the bloger for each of the blog
          const bloger = users?.filter(
            (person) => person?._id === value?.userid
          );
          return (
            <div className="blog-con" key={value?._id}>
              <div
                className="blog-profile"
                onClick={() => navigate(`../profile/${value?.userid}`)}
              >
                {/*checking if the bloger has any image*/}
                {bloger[0]?.image ? (
                  <img
                    src={`${uri}/profile/${bloger[0]?.image}`}
                    alt="profile"
                    onClick={() => navigate(`../profile/${bloger?._id}`)}
                  />
                ) : (
                  <CgProfile
                    className="profile-icon"
                    onClick={() => navigate(`../profile/${value?.userid}`)}
                  />
                )}
                <span>
                  <p style={{ fontWeight: "450" }}>
                    {value?.username}
                  </p>
                  <p style={{ color: "grey", fontSize: "smaller" }}>
                    {bloger[0]?.email}
                  </p>
                </span>
              </div>
              <div
                className="allblogs"
                onClick={() => navigate(`/singleblog/${value?._id}`)}
              >
                <p className="blog-text">
                  {value?.blog && value?.blog.slice(0, 200)}
                  {value?.blog && value?.blog?.length > 200 && "..."}
                </p>
                {value?.blogimagename && (
                  <div className="blog-image">
                    <img
                      src={`${uri}/blogimage/${value.blogimagename}`}
                      alt="blogimage"
                    />
                  </div>
                )}
                <p className="blog-date">{value?.date}</p>
              </div>
            </div>
          );
        })
      )}
    </>
  );
}

export default AllBlog;
