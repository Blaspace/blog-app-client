import React from "react";
import { useContext } from "react";
import AllContext from "../contexts/AllContext";
import prof from "../utils/profile.jpg";
import { useNavigate } from "react-router";

function AllBlog() {
  const { blog, users } = useContext(AllContext);
  const navigate = useNavigate();

  return (
    <>
      {blog.length ? (
        blog.map((value) => {
          //getting the bloger for each of the blog

          const bloger = users.filter((person) => person._id === value.userid);
          return (
            <div className="blog-con" key={value._id}>
              <div
                className="blog-profile"
                onClick={() => navigate(`../profile/${value.userid}`)}
              >
                {/*putting the if the bloger here if any image*/}

                {bloger[0].image &&
                Object.keys(bloger[0].image).length !== 0 ? (
                  <img
                    src={`data:image;base64,${btoa(
                      String.fromCharCode(
                        ...new Uint8Array(bloger[0].image.data.data)
                      )
                    )}`}
                    alt="profile"
                    onClick={() => navigate(`../profile/${bloger._id}`)}
                  />
                ) : (
                  <img
                    src={prof}
                    alt="profile"
                    onClick={() => navigate(`../profile/${value.userid}`)}
                  />
                )}
                <h5>{value.username}</h5>
              </div>
              <div
                className="allblogs"
                onClick={() => navigate(`/singleblog/${value._id}`)}
              >
                <h4>
                  {value.blog && value.blog.slice(0, 200)}
                  {value.blog && value.blog.length > 200 && "..."}
                </h4>
                <div className="blog-image">
                  {value.blogimage &&
                  Object.keys(value.blogimage).length !== 0 ? (
                    <img
                      src={`data:image;base64,${btoa(
                        String.fromCharCode(
                          ...new Uint8Array(value.blogimage.data.data)
                        )
                      )}`}
                      alt="blogimage"
                    />
                  ) : (
                    ""
                  )}
                </div>
                <p>{value.date}</p>
              </div>
            </div>
          );
        })
      ) : (
        <h3 className="loading">loading...</h3>
      )}
    </>
  );
}

export default AllBlog;
