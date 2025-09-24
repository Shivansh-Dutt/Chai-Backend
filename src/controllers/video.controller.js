import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination
})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body
    // TODO: get video, upload to cloudinary, create video
    if (!(title||description)){
        throw ApiError(400,"title and description are required")
    }
    const videoLocalPath = req.files?.videoFile?.[0]?.path;
    const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path

    if(!(videoLocalPath || thumbnailLocalPath)){
        throw ApiError(400,'Videofile and thumbnail are required')
    }


    const videoFile = await uploadOnCloudinary(videoLocalPath)
    const duration = videoFile.duration
    const thumbnailFile = await(uploadOnCloudinary(thumbnailLocalPath))

    if(!(videoFile.url || thumbnailFile.url)){
        throw ApiError(400,'Video and thumbnail uploading failed')
    }

    const owner = await User.findById(req.user._id)

    if (!owner) {
        throw ApiError(400,"Login first to upload video")
    }

    const video = Video.create({
        videoFile : videoFile?.url,
        thumbnail : thumbnailFile?.url,
        title,
        description,
        duration : Number(duration),
        owner
    })


    return res
    .status(200)
    .json( new ApiResponse(200,"Video Published"))

})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}