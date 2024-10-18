import {Text, Group, TypographyStylesProvider, Paper, Tooltip} from '@mantine/core';
import { formatDistanceToNow } from 'date-fns';


type HTMLCommentProps = {
    commentId: string,
    username: string,
    comment: string,
    timestamp: string,
}

export const HTMLComment: React.FC<HTMLCommentProps> = ({commentId, username, comment, timestamp}) => {
    const timeAgo = formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    const formattedDate = new Date(timestamp).toLocaleString()

    return (
        <Paper withBorder radius="md" id={commentId}>
            <Group>
                <div>
                    <Text fz="sm">{username}</Text>
                    <Tooltip label={formattedDate} >
                        <Text fz="xs" c="dimmed">
                            {timeAgo}
                        </Text>
                    </Tooltip>
                </div>
            </Group>
            <TypographyStylesProvider>
                <div
                    dangerouslySetInnerHTML={{
                        __html: comment,
                    }}
                />
            </TypographyStylesProvider>
        </Paper>
    );
}