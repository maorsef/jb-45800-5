import './Post.css'
import type PostModel from '../../../models/Post'
import Comments from '../comments/Comments'
import { displayDate } from '../../../utils/dates'
import { useNavigate } from 'react-router-dom'
import useService from '../../../hooks/use-service'
import ProfileService from '../../../services/auth-aware/ProfileService'
import SpinnerButton from '../../common/spinner-button/SpinnerButton'
import { useState } from 'react'
import { useAppDispatch } from '../../../redux/hooks'
import { remove } from '../../../redux/profile-slice'

interface PostProps {
    post: PostModel,
    isReadOnly: boolean
}
export default function Post(props: PostProps) {

    const dispatch = useAppDispatch()

    const { id, title, createdAt, body, user: { name }, comments, imageUrl } = props.post
    const { isReadOnly } = props

    const [isDeleting, setIsDeleting] = useState<boolean>(false)

    const profileService = useService(ProfileService)
    async function deleteMe() {
        if (confirm('are you sure you want to delete this post?')) {
            try {
                setIsDeleting(true)
                await profileService.deletePost(id)
                dispatch(remove({ id }))
            } catch (e) {
                alert(e)
            } finally {
                setIsDeleting(false)
            }
        }
    }

    const navigate = useNavigate()

    function updateMe() {
        navigate(`/update-post/${id}`)
    }

    return (
        <article className='Post'>
            <header className='Post-header'>
                <h4 className='Post-title'>{title}</h4>
                <div className='Post-meta'>by {name} · {displayDate(createdAt)}</div>
            </header>

            {imageUrl && (
                <div className='Post-image-wrap'>
                    <img className='Post-image' src={imageUrl} alt="" />
                </div>
            )}

            <div className='Post-body'>{body}</div>

            <Comments postId={id} comments={comments} />

            {!isReadOnly && (
                <footer className='Post-actions'>
                    <SpinnerButton
                        buttonText='Delete'
                        spinningText='deleting post...'
                        isSpinning={isDeleting}
                        onClick={deleteMe}
                        type="button"
                        className="btn-danger"
                    />
                    <button type="button" onClick={updateMe} className="btn-success">Update</button>
                </footer>
            )}
        </article>
    )
}
