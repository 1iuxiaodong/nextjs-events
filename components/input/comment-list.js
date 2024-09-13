import classes from "./comment-list.module.css";

function CommentList({ commentList }) {
  console.log(`commentList`, commentList);
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {commentList?.map((item) => (
        <li key={item._id}>
          <p>{item.text}</p>
          <div>
            By <address>{item.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
