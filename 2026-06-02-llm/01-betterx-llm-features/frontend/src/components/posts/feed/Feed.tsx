import { useEffect, useState } from 'react'
import './Feed.css'
import type PostModel from '../../../models/Post'
import Post from '../post/Post'
import Spinner from '../../common/spinner/Spinner'
import useService from '../../../hooks/use-service'
import FeedService from '../../../services/auth-aware/FeedService'

export default function Feed() {

    const [feed, setFeed] = useState<PostModel[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isLoaded, setIsLoaded] = useState<boolean>(false)

    const feedService = useService(FeedService)

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true)
                const posts = await feedService.getFeed()
                setIsLoaded(true)
                setFeed(posts)
            } catch (e) {
                setIsLoaded(false)
                alert(e)
            } finally {
                setIsLoading(false)
            }
        })()
    }, [])

    return (
        <div className='Feed'>
            <header className='page-header'>
                <h2 className='page-title'>Your Feed</h2>
                <p className='page-subtitle'>Posts from people you follow</p>
            </header>

            {isLoading && <Spinner />}

            {!isLoading && isLoaded && feed.length === 0 && (
                <p className='empty-state'>Your feed is empty. Follow someone to see their posts here.</p>
            )}

            {!isLoading && isLoaded && feed.map(post => (
                <Post key={post.id} post={post} isReadOnly={true} />
            ))}

            {!isLoading && !isLoaded && (
                <p className='empty-state'>Something went wrong loading your feed.</p>
            )}
        </div>
    )
}
