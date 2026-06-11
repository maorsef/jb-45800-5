import { useNavigate, useParams } from 'react-router-dom'
import './UpdatePost.css'
import type PostDraft from '../../../models/PostDraft'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import useService from '../../../hooks/use-service'
import ProfileService from '../../../services/auth-aware/ProfileService'


export default function UpdatePost() {

    const { postId } = useParams<'postId'>()
    const navigate = useNavigate()

    const profileService = useService(ProfileService)
    async function updatePost(draft: PostDraft) {
        try {
            await profileService.updatePost(postId!, draft)
            navigate('/profile')
        } catch (e) {
            alert(e)
        }
    }

    const { handleSubmit, register, formState, reset } = useForm<PostDraft>()

    useEffect(() => {
        (async () => {
            try {
                const { title, body } = await profileService.getSinglePost(postId!)
                reset({ title, body })
            } catch (e) {
                alert(e)
            }
        })()
    }, [postId, reset])

    return (
        <div className='UpdatePost'>
            <h3 className='UpdatePost-heading'>Edit Post</h3>

            <form className='UpdatePost-form' onSubmit={handleSubmit(updatePost)}>
                <div className='form-group'>
                    <label className='form-label' htmlFor="edit-title">Title</label>
                    <input
                        id="edit-title"
                        placeholder='Post title'
                        {...register('title', {
                            required: { value: true, message: 'title is a required field' },
                            minLength: { value: 10, message: 'title must be at least 10 characters' }
                        })}
                    />
                    <div className='form-error'>{formState.errors.title?.message}</div>
                </div>

                <div className='form-group'>
                    <label className='form-label' htmlFor="edit-body">Body</label>
                    <textarea
                        id="edit-body"
                        placeholder='Post body'
                        {...register('body', {
                            required: { value: true, message: 'body is a required field' },
                            minLength: { value: 20, message: 'body must be at least 20 characters' }
                        })}
                    />
                    <div className='form-error'>{formState.errors.body?.message}</div>
                </div>

                <button type="submit" disabled={formState.isSubmitting}>
                    {formState.isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    )
}
