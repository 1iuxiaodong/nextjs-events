import { insertDoc, queryDoc } from "../../../utils/db-util";

async function handler(req, res) {
  const eventId = req.query.eventId;
  console.log(eventId);

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid Input." });
      return;
    }
    const newComment = {
      email,
      name,
      text,
      eventId,
    };
    const result = await insertDoc("comments", newComment);
    newComment.id = result.insertedId;
    res.status(201).json({ message: "Added comment.", comment: newComment });
  }

  if (req.method === "GET") {
    const result = await queryDoc("comments");
    console.log(result);
    res.status(200).json({ commentList: result });
  }
}
export default handler;
