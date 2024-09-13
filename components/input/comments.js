import { useState, useEffect, useContext } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "../../store/notification-context";

function Comments(props) {
  const { eventId } = props;

  const notificationCtx = useContext(NotificationContext);

  const [commentList, setCommentList] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  const fetchComments = () => {
    setShowLoader(true);
    fetch(`/api/comments/${eventId}`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(`data`, data);
        setCommentList(data.commentList);
        setShowLoader(false);
      });
  };

  async function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: "Sending comment...",
      message: "Your comment is Sending.",
      status: "pending",
    });

    // send data to API
    setShowLoader(true);

    await fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Success.",
          message: "Your comment is Sended.",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong",
          status: "error",
        });
      });
    fetchComments();
  }

  useEffect(() => {
    if (showComments) fetchComments();
  }, [showComments]);

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showLoader ? (
        <div className="loader"></div>
      ) : (
        showComments && (
          <>
            <CommentList {...{ commentList }} />
          </>
        )
      )}
    </section>
  );
}

export default Comments;
