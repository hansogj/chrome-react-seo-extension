import Posts from "./Posts";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTitles } from "./store/posts/actions";

export default function Home() {
  let dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getPosts("funkey", "groovey"));
  }, []);

  return (
    <div className="home">
      <Posts />
    </div>
  );
}
