import { useState, useEffect, useContext } from 'react';
import { commentInfo, getComments } from "@/features/comments/api/get-comments.ts";
import { HTMLComment } from "@/features/comments/components/comment.tsx";
import { useParams } from "react-router-dom";
import { NovelInfo } from "@/types/api.ts";
import { PageNovelInfo } from "@/contexts/page-novelinfo.tsx";
import {Button, Flex} from "@mantine/core";
import {createComment} from "@/features/comments/api/create-comment.ts";

const Comments = () => {
    const novelInfo: NovelInfo | undefined = useContext(PageNovelInfo)?.novelInfo;
    const { chapterNumber } = useParams<{ novelName: string, chapterNumber: string }>();
    const [comments, setComments] = useState<commentInfo[] | undefined>([]);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState<string>("");
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const username = localStorage.getItem('username');

    const validChapterNumber = chapterNumber || "-1";

    const fetchComments = async () => {
        if (!novelInfo) {
            setComments([]);
            setLoading(false);
            return;
        }
        setLoading(true);
        const response = await getComments({ novelId: novelInfo['_id'], chapterNumber: validChapterNumber });
        setComments(response.comments);
        setLoading(false);
    };

    useEffect(() => {
        void fetchComments();
    }, [validChapterNumber, novelInfo]);

    const handleAddComment = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setNewComment("");
        setIsEditing(false);
    };

    const handleSubmit = async () => {
        // Logic for submitting the new comment goes here
        // For example, call a function to save the comment in your database
        if (novelInfo) {
            // Assuming you have a function to create a new comment
            if (!username) {
                // console.log("Not logged in");
                return;
            }
            await createComment({username, novelId: novelInfo['_id'], chapterNumber: validChapterNumber, comment: newComment });
            setNewComment("");
            setIsEditing(false);
            fetchComments(); // Refresh the comments
        }
    };

    if (loading) return <p>Loading comments...</p>;

    return (
        <>
            <div className={"w-full p-4 m-4 md:p-0 md:w-8/12"}>
                {isEditing ? (
                    <div className="flex flex-col mt-4">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write your comment..."
                            className="border p-2 rounded"
                        />
                        <div className="flex justify-end my-2">
                            <Button variant="outline" color="red" onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button variant="outline" color="green" onClick={handleSubmit} ml="sm">
                                Submit
                            </Button>
                        </div>
                    </div>
                ) : (
                    <Flex direction={"row-reverse"}
                          style={{
                              opacity: (username) ? 1 : 0,
                              visibility: (username) ? 'visible' : 'hidden',
                          }}>
                        <Button variant={"outline"} onClick={handleAddComment} className="my-1">
                            Add Comment
                        </Button>
                    </Flex>
                )}
                {comments && comments.map((comment) => (
                    <HTMLComment
                        key={comment._id}
                        commentId={comment.commentId ? comment.commentId : comment._id}
                        comment={comment.comment}
                        username={comment.username}
                        timestamp={comment.timestamp}
                        fetchComments={fetchComments}
                    />
                ))}
            </div>
        </>
    );
};

export default Comments;
