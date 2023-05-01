import "./posts.scss";
import {Post} from "../post/Post";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

 export const Posts = ({userid}) => {
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts?userid="+userid).then((res) => {
      return res.data;
    })
  );
  console.log(data);
  return (
    <div className="posts">
    {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  ) 
}

export default Posts
