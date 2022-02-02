import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function StoryCard(props) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.role}
        </Typography>
        <Typography variant="body2">
          {props.desc}
          <br />
        </Typography>
        <Box sx={{ mt: "2rem" }} textAlign='left'>
          <Link href={props.link}>
            <Button variant="outlined">{props.journey}</Button>
          </Link>
        </Box>
      </CardContent>



    </Card>
  );
}
