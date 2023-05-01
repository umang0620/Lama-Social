import "./home.scss";
import Stories from "../../components/stories/Stories";
import Posts from "../../components/posts/Posts";
import Share from "../../components/share/Share";


export const Home = () => {
  return (
    <div className="home">
      <Stories/>
      <Share/>
      <Posts/>
    </div>
  )
}

export default Home
