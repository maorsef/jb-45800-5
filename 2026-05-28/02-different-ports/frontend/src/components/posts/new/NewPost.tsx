import useService from '../../../hooks/use-service'
import type PostDraft from '../../../models/PostDraft'
import ProfileService from '../../../services/auth-aware/ProfileService'
import './NewPost.css'
import { useForm } from 'react-hook-form'
import SpinnerButton from '../../common/spinner-button/SpinnerButton'
import { useAppDispatch } from '../../../redux/hooks'
import { add } from '../../../redux/profile-slice'
import { useState, type ChangeEvent } from 'react'


export default function NewPost() {

    const [previewImage, setPreviewImage] = useState<string>('')

    const dispatch = useAppDispatch()

    const profileService = useService(ProfileService)

    async function createPost(draft: PostDraft) {
        try {
            draft.image = (draft.image as unknown as FileList)[0]
            const newPost = await profileService.createPost(draft)
            // change state, show the new post in the profile...
            reset()
            dispatch(add(newPost))
        } catch (e) {
            alert (e)
        }
    }

    // an example of an attempt to use hook *not inside* the root of the component function
    // rather in a {} block. this will be blocked by eslint
    // if(true) {
    //     const {formState} = useForm<PostDraft>()
    // }

    function imageChanged(event: ChangeEvent<HTMLInputElement>) {
        const file = event.currentTarget.files && event.currentTarget.files[0]
        setPreviewImage(URL.createObjectURL(file!))
    }

    const { handleSubmit, register, reset, formState } = useForm<PostDraft>()

    return (
        <div className='NewPost'>
            <form onSubmit={handleSubmit(createPost)}>
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

                <input type="file" accept="image/jpeg, image/png" {...register('image')} onChange={imageChanged}/>

                <img src={previewImage}/>
                {/* this: */}
                {/* {formState.isSubmitting && <p>posting new post... <Spinner /></p>}
                {!formState.isSubmitting && <button>Add Post</button>} */}

                {/* becomes this (much more elegant and useful!): */}
                <SpinnerButton 
                    buttonText='Add Post'
                    spinningText='posting new post...'
                    isSpinning={formState.isSubmitting}
                />
            </form>
        </div>
    )
}