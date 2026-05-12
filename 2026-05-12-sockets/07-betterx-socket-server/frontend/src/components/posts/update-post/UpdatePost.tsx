import { useNavigate, useParams } from 'react-router-dom'
import './UpdatePost.css'
import type PostDraft from '../../../models/PostDraft'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import useService from '../../../hooks/use-service'
import ProfileService from '../../../services/auth-aware/ProfileService'


export default function UpdatePost() {

    const { postId } = useParams<'postId'>() // {postId: 'dfkgjdfklgjkldfjglkdf'}
    const navigate = useNavigate()

    const profileService = useService(ProfileService)
    async function updatePost(draft: PostDraft) {
        try {
            await profileService.updatePost(postId!, draft)
            // i dont have any state to update here, because the profile component
            // doesn't exist right now
            // the only component that exists within the Main route, is myself: UpdatePost
            // so instead of setting state i want to navigate back to profile
            navigate('/profile')
        } catch (e) {
            alert(e)
        }
    }

    const { handleSubmit, register, formState, reset} = useForm<PostDraft>()

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
            <form onSubmit={handleSubmit(updatePost)}>
                <input placeholder='title' {...register('title', {
                    required: {
                        value: true,
                        message: 'title is a required field'
                    },
                    minLength: {
                        value: 10,
                        message: 'title must be at least 10 characters'
                    }
                })} />
                <div className='error'>{formState.errors.title?.message}</div>
                <textarea placeholder='body' {...register('body', {
                    required: {
                        value: true,
                        message: 'body is a required field'
                    },
                    minLength: {
                        value: 20,
                        message: 'body must be at least 20 characters'
                    }
                })}></textarea>
                <div className='error'>{formState.errors.body?.message}</div>
                <button>Update Post</button>
            </form>
        </div>
    )
}