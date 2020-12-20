import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import {
  Record,
} from './../../ImageApp'

const myStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '16px',
    maxWidth: '100%',
  },
  media: {
    height: '200px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    '& * + *': {
      marginTop: '8px'
    },
    '& h2': {
      paddingTop: '16px',
      paddingBottom: '24px',
    },
    '& :nth-child(2)': {
      marginTop: 'auto'
    }
  }
})

interface Props {
  artwork: Record
}

export default function ({ artwork }: Props) {
  const classes = myStyles();
  const person = artwork.people?.[0]

  return (
    <Card
      className={classes.root}
      key={artwork.id}
    >
      <CardMedia
        className={classes.media}
        image={artwork.primaryimageurl}
        title={artwork.title}
      />
      <CardContent
        className={classes.content}
      >
        <Typography
          variant="h5"
          component="h2"
        >
          {artwork.title}
        </Typography>
        {person &&
          <Typography
            variant="subtitle2"
            component="p"
          >
            {person.displayname || person.name}
          </Typography>
        }
        <Typography
          variant="body2"
          component="p"
        >
          {artwork.medium}
        </Typography>
        <Typography
          variant="body2"
          component="p"
        >
          {artwork.period}
        </Typography>
      </CardContent>
    </Card>
  );
}