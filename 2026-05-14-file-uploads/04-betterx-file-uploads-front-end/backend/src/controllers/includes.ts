import User from "../models/User";
import Post from "../models/Post";
import Comment from "../models/Comment";

export const commentIncludes = [User];

export const postIncludes = [
    User,
    {
        model: Comment,
        include: commentIncludes
    }
];

export const userPostsIncludes = [
    {
        model: Post,
        include: postIncludes
    }
];

export const followingIncludes = [
    {
        model: User,
        as: 'following'
    }
];

export const followedUserWithPostsIncludes = [
    {
        model: User,
        as: 'following',
        include: [
            {
                model: Post,
                include: postIncludes
            }
        ]
    }
];

export const followersIncludes = [
    {
        model: User,
        as: 'followers'
    }
];
