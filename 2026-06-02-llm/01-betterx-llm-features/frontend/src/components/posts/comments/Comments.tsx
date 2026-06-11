import type PostCommentModel from '../../../models/PostComment'
import NewComment from '../new-comment/NewComment'
import PostComment from '../post-comment/PostComment'
import './Comments.css'

interface CommentsProps {
    postId: string,
    comments: PostCommentModel[],
}
export default function Comments(props: CommentsProps) {

    const { postId, comments } = props

    return (
        <section className='Comments' aria-label="Comments">
            <h5 className='Comments-title'>Comments</h5>
            <NewComment postId={postId} />
            <div className='Comments-list'>
                {comments.map(comment => (
                    <PostComment key={comment.id} comment={comment} />
                ))}
            </div>
        </section>
    )
}
