import React, {
  useEffect,
  useState,
} from 'react';
import { styled } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Waypoint } from 'react-waypoint';
import ImageSystem from './components/items/ImageSystem';
import ImageItem from './components/items/ImageItem';

const LoadingWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  padding: '24px 0',
  width: '100%',
});

// Types
// export type Character = {
//   abilities: string[];
//   alias: string[];
//   gender: string;
//   hair: string;
//   id: number;
//   img_url: string;
//   name: string;
//   origin: string;
//   species: string;
//   status: string;
//   records: string[];
// };

export interface Person {
  displayname?: string;
  name: string;
  prefix?: string;
  personid: number;
}

export interface Record {
  id: number;
  medium: string;
  people: Person[];
  period: string;
  primaryimageurl: string;
  title: string;
}

export default function () {
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [records, setRecords] = useState([] as Record[]);

  useEffect(() => {
    async function readRecords (page: number) {
      if(loading) return;

      try {
        const url = `https://api.harvardartmuseums.org/object?apikey=c28e4be0-4c0e-11ea-90d6-25d9a9fe80fc&size=10&page=${page}`;
        setLoading(true);
        const response = await fetch(url);

        if(!response.ok) throw new Error('API not working');

        const body = await response.json()
        setHasMore(body.info.page < body.info.pages)
        setRecords([
          ...records,
          ...body.records,
        ])
        setLoading(false);

        console.log(body);
      }
      catch (err) {
        console.error(err)
      }
    }


    readRecords(page);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  function readNextPage () {
    setPage(page + 1)
  }

  if(records.length === 0) {
    return (
      <LoadingWrapper>
        <CircularProgress
          color="secondary"
          size="40px"
        />
      </LoadingWrapper>
    );
  }

  return (
    <>
      <ImageSystem>
      {
        records.map((record: Record) =>
          <ImageItem
            key={record.id}
            artwork={record}
          />
        )
      }
      </ImageSystem>

      {hasMore &&
        <Waypoint
          onEnter={readNextPage}
          topOffset="-100px"
        >
          <LoadingWrapper>
            <CircularProgress
              color="secondary"
              size="40px"
            />
          </LoadingWrapper>
        </Waypoint>
      }
    </>
  )
}

