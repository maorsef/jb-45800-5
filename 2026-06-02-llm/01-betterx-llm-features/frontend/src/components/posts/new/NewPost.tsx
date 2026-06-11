import useService from '../../../hooks/use-service'
import type PostDraft from '../../../models/PostDraft'
import ProfileService from '../../../services/auth-aware/ProfileService'
import DraftsService from '../../../services/auth-aware/DraftsService'
import './NewPost.css'
import { useForm } from 'react-hook-form'
import SpinnerButton from '../../common/spinner-button/SpinnerButton'
import ContentGuidelinesModal from './ContentGuidelinesModal'
import { useAppDispatch } from '../../../redux/hooks'
import { add } from '../../../redux/profile-slice'
import { useRef, useState, type ChangeEvent, type MouseEvent } from 'react'
import { v4 as uuidv4 } from 'uuid'


export default function NewPost() {

    const chatIdRef = useRef<string>(uuidv4())

    const [previewImage, setPreviewImage] = useState<string>('')
    const [aiImageFile, setAiImageFile] = useState<File | null>(null)
    const [isImproving, setIsImproving] = useState<boolean>(false)
    const [isGeneratingPic, setIsGeneratingPic] = useState<boolean>(false)
    const [isUserImproving, setIsUserImproving] = useState<boolean>(false)
    const [guidelinesOpen, setGuidelinesOpen] = useState<boolean>(false)

    const dispatch = useAppDispatch()

    const profileService = useService(ProfileService)
    const draftsService = useService(DraftsService)

    async function createPost(draft: PostDraft) {
        try {
            const selectedImage = aiImageFile || (draft.image as unknown as FileList)?.[0]

            if (!selectedImage) {
                alert('missing image')
                return
            }

            draft.image = selectedImage
            const newPost = await profileService.createPost(draft)
            reset()
            setAiImageFile(null)
            setPreviewImage('')
            dispatch(add(newPost))
        } catch (e) {
            alert(e)
        }
    }

    function imageChanged(event: ChangeEvent<HTMLInputElement>) {
        const file = event.currentTarget.files && event.currentTarget.files[0]
        setAiImageFile(null)
        setPreviewImage(URL.createObjectURL(file!))
    }

    const { handleSubmit, register, reset, formState, getValues, setValue } = useForm<PostDraft>()

    const {
        handleSubmit: handleUserImproveSubmit,
        register: registerUserImprove,
        reset: resetUserImprove,
        formState: userImproveFormState,
    } = useForm<{ prompt: string }>()

    async function improve(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault()
        try {
            setIsImproving(true)
            const body = getValues('body')
            const { improved } = await draftsService.improve(body)
            setValue('body', improved)
        } finally {
            setIsImproving(false)
        }
    }

    async function generatePic(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault()
        try {
            setIsGeneratingPic(true)
            const title = getValues('title')
            const body = getValues('body')
            const { base64 } = await draftsService.generatePic(title, body)
            const dataUrl = `data:image/png;base64,${base64}`
            const blob = await (await fetch(dataUrl)).blob()
            const file = new File([blob], 'ai.png', { type: 'image/png' })
            setAiImageFile(file)
            setPreviewImage(dataUrl)
        } finally {
            setIsGeneratingPic(false)
        }
    }

    async function userImprove(values: { prompt: string }) {
        try {
            setIsUserImproving(true)
            const body = getValues('body')
            const { improved } = await draftsService.userImprove(body, values.prompt, chatIdRef.current)
            setValue('body', improved)
            resetUserImprove()
        } finally {
            setIsUserImproving(false)
        }
    }

    return (
        <div className='NewPost'>
            <h3 className='NewPost-heading'>Create a Post</h3>

            <form className='NewPost-form' onSubmit={handleSubmit(createPost)}>
                <div className='form-group'>
                    <label className='form-label' htmlFor="post-title">Title</label>
                    <input
                        id="post-title"
                        placeholder='Give your post a compelling title'
                        {...register('title', {
                            required: { value: true, message: 'title is a required field' },
                            minLength: { value: 10, message: 'title must be at least 10 characters' }
                        })}
                    />
                    <div className='form-error'>{formState.errors.title?.message}</div>
                </div>

                <div className='form-group'>
                    <label className='form-label' htmlFor="post-body">Body</label>
                    <textarea
                        id="post-body"
                        placeholder='Write your article here...'
                        {...register('body', {
                            required: { value: true, message: 'body is a required field' },
                            minLength: { value: 20, message: 'body must be at least 20 characters' }
                        })}
                    />
                    <div className='form-error'>{formState.errors.body?.message}</div>
                </div>

                <div className='form-group'>
                    <label className='form-label' htmlFor="post-image">Image</label>
                    <input
                        id="post-image"
                        type="file"
                        accept="image/jpeg, image/png"
                        {...register('image')}
                        onChange={imageChanged}
                    />
                </div>

                {previewImage && (
                    <div className='NewPost-preview'>
                        <img src={previewImage} alt="Post preview" />
                    </div>
                )}

                <div className='NewPost-actions'>
                    <SpinnerButton
                        buttonText='Publish Post'
                        spinningText='posting new post...'
                        isSpinning={formState.isSubmitting}
                    />
                    <SpinnerButton
                        buttonText='✦ Improve'
                        spinningText='improving your draft...'
                        isSpinning={isImproving}
                        onClick={improve}
                        type="button"
                        className="btn-ai"
                    />
                    <SpinnerButton
                        buttonText='✦ Generate Pic'
                        spinningText='generating image...'
                        isSpinning={isGeneratingPic}
                        onClick={generatePic}
                        type="button"
                        className="btn-ai"
                    />
                </div>
            </form>

            <div className='NewPost-assistant'>
                <h4 className='NewPost-assistant-title'>AI Assistant</h4>
                <p className='NewPost-assistant-desc'>Tell the AI how to refine your draft</p>

                <form className='UserImprove' onSubmit={handleUserImproveSubmit(userImprove)}>
                    <div className='form-group'>
                        <textarea
                            placeholder='e.g. Make it more concise and professional'
                            {...registerUserImprove('prompt', {
                                required: { value: true, message: 'prompt is a required field' }
                            })}
                        />
                        <div className='form-error'>{userImproveFormState.errors.prompt?.message}</div>
                    </div>

                    <SpinnerButton
                        buttonText='✦ User Improve'
                        spinningText='applying your instructions...'
                        isSpinning={isUserImproving}
                        className="btn-ai"
                    />
                </form>
            </div>

            <button
                type="button"
                className='NewPost-guidelines btn-ghost'
                onClick={() => setGuidelinesOpen(true)}
            >
                View content guidelines
            </button>

            {guidelinesOpen && <ContentGuidelinesModal onClose={() => setGuidelinesOpen(false)} />}
        </div>
    )
}
