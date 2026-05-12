import type PostComment from '../../../models/PostComment'
import { displayDate } from '../../../utils/dates'
import './PostComment.css'

interface PostCommentProps {
    comment: PostComment
}
export default function PostComment(props: PostCommentProps) {

    const { body, createdAt, user: { name }} = props.comment

    return (
        <div className='PostComment'>
            <div className='comment-body'>{body}</div>
            <div className="comment-by-line">by {name} at {displayDate(createdAt)}</div>
        </div>
    )
}