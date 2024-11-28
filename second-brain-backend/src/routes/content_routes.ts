import { Router } from "express";
import auth from "../middleware/user_middleware";
import contentModel from "../model/contentModel";

const content_routes = Router();

content_routes.post("/addContent", auth, async function (req, res) {
  const link = req.body.link;
  const type = req.body.type;
  try {
    await contentModel.create({
      link: link,
      type: type,
      //@ts-ignore
      userId: req.userId,
      tags: [],
    });
  } catch (err: any) {
    res.status(401).json({
      message: "Could not create content",
      status: err.errmsg,
    });
  }

  res.status(201).json({
    message: "Content added successfull",
  });
});
content_routes.get("/getContent", auth, async function (req: any, res: any) {
  //@ts-ignore
  const userId = req.userId;

  const content = await contentModel
    .findOne({
      userId: userId,
    })
    .populate("userId", "name");
  //This populate help getting more properties that is available on user(i.e. on filtered object).
  if (!content) {
    res.status(401).json({
      message: "Could not find the content.",
    });
  }
  return res.status(201).json({
    message: "success",
    content,
  });
});

content_routes.delete("/deleteContent", auth, async function (req, res) {
  const contentId = req.body.contentId;
  const content = await contentModel.deleteMany({
    contentId,
    //@ts-ignore
    userId: req.userId,
  });
  res.status(201).json({
    message: "deleted successfully",
    content,
  });
});

export default content_routes;
