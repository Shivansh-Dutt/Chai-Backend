import { ApiError } from "../utils/ApiError.js";
import { Video } from "../models/video.model.js";
import mongoose from "mongoose";

export const verifyVideoOwner = async (req, res, next) => {
  const { videoId } = req.params;

  // Validate id format
  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new ApiError(400, "Invalid video ID");
  }

  // Find video
  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  // Compare owner with logged-in user
  if (video.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to perform this action");
  }

  // Attach video to request for later use
  req.video = video;

  next();
};
