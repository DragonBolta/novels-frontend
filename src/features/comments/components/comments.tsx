import {useState, useEffect, useContext} from 'react';
import {commentInfo, getComments} from "@/features/comments/api/get-comments.ts";
import {HTMLComment} from "@/features/comments/components/comment.tsx";
import {useParams} from "react-router-dom";
import {NovelInfo} from "@/types/api.ts";
import {PageNovelInfo} from "@/contexts/page-novelinfo.tsx";

const Comments = () => {
    const novelInfo: NovelInfo | undefined = useContext(PageNovelInfo)?.novelInfo;
    const { chapterNumber } = useParams<{ novelName: string, chapterNumber: string }>()
    const [comments, setComments] = useState<commentInfo[] | undefined>([]);
    const [loading, setLoading] = useState(true);


    const validChapterNumber = chapterNumber || "-1";

    useEffect(() => {
        const fetchComments = async () => {
            if (!novelInfo) {
                setComments([]);
                setLoading(false);
                return;
            }
            setLoading(true);
            const response = await getComments({ novelId: novelInfo['_id'], chapterNumber: validChapterNumber});
            setComments(response.comments);
            setLoading(false);
        };

        void fetchComments();
    }, [validChapterNumber, novelInfo]);

    if (loading) return <p>Loading comments...</p>;

    return (
        <>
            <div className={"w-full p-4 m-4 md:p-0 md:w-8/12"}>
                {comments && comments.map((comment, index) => (
                    <HTMLComment key={index} commentId={comment.commentId} comment={comment.comment} username={comment.username} timestamp={comment.timestamp}/>
                ))}
            </div>
        </>
    );
};

export default Comments;
