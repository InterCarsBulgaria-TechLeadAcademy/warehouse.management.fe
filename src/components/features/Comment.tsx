import { Box, TextField, Typography } from '@mui/material'
import InfoPopper from './InfoPoper'
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen'

interface CommentProps {
  comment: string
}

export default function Comment({ comment }: CommentProps) {
  const isSmallScreen = useIsSmallScreen()

  return comment === '' ? (
    <Typography>-</Typography>
  ) : isSmallScreen ? (
    <InfoPopper>
      <TextField id="outlined-multiline-static" multiline disabled={true} value={comment} />
    </InfoPopper>
  ) : comment.length > 10 ? (
    <Box sx={{ display: 'flex' }}>
      <Typography variant="body2" noWrap>
        {comment.slice(0, 10)}
      </Typography>
      <Typography variant="body2" noWrap>
        ...
      </Typography>
      <InfoPopper>
        <TextField
          id="outlined-multiline-static"
          multiline
          disabled={true}
          value={comment}
          sx={{ width: comment.length > 100 ? '300px' : 'auto' }}
        />
      </InfoPopper>
    </Box>
  ) : (
    comment
  )
}
