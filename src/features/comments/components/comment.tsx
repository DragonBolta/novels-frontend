import { Text, Group, TypographyStylesProvider, Paper, Tooltip, Stack, Flex, TextInput, Button } from '@mantine/core';
import { formatDistanceToNow } from 'date-fns';
import { PencilLine, Trash } from "@phosphor-icons/react";
import {useClickOutside, useHover} from "@mantine/hooks";
import React, { useState } from 'react';
import {putComment} from "@/features/comments/api/put-comment.ts";
import {deleteComment} from "@/features/comments/api/delete-comment.ts";
import ReactMarkdown from "react-markdown";

type HTMLCommentProps = {
    commentId: string,
    username: string,
    comment: string,
    timestamp: string,
    fetchComments: () => Promise<void>;
};

export const HTMLComment: React.FC<HTMLCommentProps> = ({ commentId, username, comment, timestamp, fetchComments }) => {
    const timeAgo = formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    const formattedDate = new Date(timestamp).toLocaleString();
    const viewer = localStorage.getItem('username');
    const { hovered, ref } = useHover();

    const [isEditing, setIsEditing] = useState(false); // Track edit mode
    const [editableComment, setEditableComment] = useState<string>(comment); // State for the comment text

    const editRef = useClickOutside(() => setIsEditing(false));

    const handleDeleteClick = async () => {
        const deleteSuccess = await deleteComment({commentId: commentId});
        if (deleteSuccess.status == 204) {
            fetchComments();
        }
    }

    // Function to handle PencilLine click and enable edit mode
    const handleEditClick = () => {
        setIsEditing(true);
    };

    // Function to handle text input change
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditableComment(event.target.value);
    };

    // Handle submit action
    const handleSubmit = async () => {
        const editSuccess = await putComment({ commentId: commentId, comment: editableComment });
        if (editSuccess.status !== 204) {
            setEditableComment(comment);
        }
        setIsEditing(false); // Close edit mode after submission
    };

    // Handle cancel action
    const handleCancel = () => {
        setEditableComment(comment); // Reset to the original comment
        setIsEditing(false); // Close edit mode
    };

    return (
        <Paper withBorder radius="md" id={commentId} ref={editRef}>
            <Stack classNames={{ root: "m-2" }}>
                <Group justify={"space-between"} className={"group"} ref={ref}>
                    <div>
                        <Text fz="sm">{username}</Text>
                        <Tooltip label={formattedDate}>
                            <Text fz="xs" c="dimmed">
                                {timeAgo}
                            </Text>
                        </Tooltip>
                    </div>
                    <Flex
                        direction={"row"}
                        gap={"md"}
                        justify={"end"}
                        style={{
                            opacity: (viewer === username && hovered && !isEditing) ? 1 : 0,
                            visibility: (viewer === username && hovered && !isEditing) ? 'visible' : 'hidden',
                            transition: 'opacity 0.3s ease, visibility 0.3s ease',
                        }}
                    >
                        <PencilLine size={24} onClick={handleEditClick} style={{ cursor: 'pointer' }} />
                        <Trash size={24} onClick={handleDeleteClick}  style={{ cursor: 'pointer' }} />
                    </Flex>
                </Group>
                <TypographyStylesProvider>
                    {isEditing ? (
                        <div>
                            <TextInput
                                value={editableComment}
                                onChange={handleInputChange}
                                autoFocus
                            />
                            <Flex justify="flex-end" mt="sm">
                                <Button variant="outline" color="red" onClick={handleCancel}>
                                    Cancel
                                </Button>
                                <Button variant="outline" color="green" onClick={handleSubmit} ml="sm">
                                    Submit
                                </Button>
                            </Flex>
                        </div>
                    ) : (
                            <ReactMarkdown>
                                {editableComment}
                            </ReactMarkdown>
                    )}
                </TypographyStylesProvider>
            </Stack>
        </Paper>
    );
};
