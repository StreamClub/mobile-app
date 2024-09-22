import { useSession } from "../context/ctx";
import { useAppDispatch } from './redux/useAppDispatch';
import { updateSeenContent, setLoadingFirstPage, setNextPage } from '../store/slices/seenContentSlice';
import { getSeenContentParams, useGetSeenContent } from "../apiCalls/content";
import { SeenContentEntry } from "../components/Types/SeenContentEntry";
import { useAppSelector } from "./redux/useAppSelector";

const INITIAL_PAGE = 1
const PAGE_SIZE = 20

export const useSeenContent = () => {
    const session = useSession()
    const dispatch = useAppDispatch()
    const { getSeenContent } = useGetSeenContent();
    const { userId, nextPage } = useAppSelector((state) => state.seenContent)

    const onSuccessGetSeenContent = (response: any) => {
        const page: number = response.data.page
        const seenContent: SeenContentEntry[] = response.data.results

        dispatch(updateSeenContent({ page, seenContent }))
        dispatch(setLoadingFirstPage(false))
        if (seenContent.length > 0) {
            dispatch(setNextPage(page + 1))
        }
    }

    const loadSeenContentPage = () => {
        loadSeenContent(userId, nextPage)
    }

    const loadSeenContent = (userId: number, page: number = INITIAL_PAGE, contentTypes?: 'movie' | 'series') => {
        console.log("[loadSeenContent] page: ", page)

        const seenContentParams: getSeenContentParams = {
            userId: userId,
            page: page,
            pageSize: PAGE_SIZE,
            ...(contentTypes && { contentTypes })
        }
        console.log(seenContentParams);
        if (page === INITIAL_PAGE) {
            dispatch(setLoadingFirstPage(true))
            dispatch(setNextPage(INITIAL_PAGE + 1))
        }
        getSeenContent(seenContentParams, onSuccessGetSeenContent)
    }
    
    return { loadSeenContent, loadSeenContentPage }
}