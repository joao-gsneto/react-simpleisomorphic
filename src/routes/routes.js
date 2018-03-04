import Home from "../containers/Home";
import Post from "../containers/Post";

export default [
    { path: "/", exact: true, component: Home  },
    { path: "/post", exact: true, component: Post },
];