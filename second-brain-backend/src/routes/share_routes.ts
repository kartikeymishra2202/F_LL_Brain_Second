import { Router } from "express";
import { LinkModel } from "../model/LinkModel";
import auth from "../middleware/user_middleware";
import { Random } from "../utils";
import contentModel from "../model/contentModel";
import UserModel from "../model/userModel";

const share_routes = Router();

share_routes.post("/shareContent", auth, async function (req, res) {
  const share = req.body.share;
  if (share) {
    const hash = Random(10);
    const existingLink = await LinkModel.findOne({
      //@ts-ignore
      userId: req.userId,
    });
    if (existingLink) {
      res.status(200).json({
        hash: existingLink.hash,
      });
      return;
    }
    await LinkModel.create({
      //@ts-ignore
      userId: req.userId,
      hash: hash,
    });
    res.json({
      message: "/shareContent" + hash,
    });
  } else {
    await LinkModel.deleteOne({
      //@ts-ignore
      userId: req.userId,
    });
    res.json({
      message: "Link Removed",
    });
  }
});

share_routes.get("/shareContent/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;

  const link = await LinkModel.findOne({
    hash,
  });
  if (!link) {
    res.status(401).json({
      message: "Sorry Incorrect Input",
    });
  }
  const content = await contentModel.findOne({
    userId: link?.userId,
  });

  const user = await UserModel.findOne({
    _id: link?.userId,
  });
  if (!user) {
    res.status(401).json({
      message: "user Not Found.",
    });
  }
  res.status(200).json({
    username: user?.name,
    content: content,
  });
});

export default share_routes;
