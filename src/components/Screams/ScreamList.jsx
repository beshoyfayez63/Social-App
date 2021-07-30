import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectScreamByIds } from '../../store/screams/screamSlice';
import { fetchScreams } from '../../store/screams/screamThunk';

import ScreamItem from './ScreamItem';

function ScreamList() {
  console.log('ScreamList');
  const dispatch = useDispatch();

  const screamIds = useSelector(selectScreamByIds);
  const screamsStatus = useSelector((state) => state.screams.status);

  useEffect(() => {
    if (screamsStatus === 'idle') {
      dispatch(fetchScreams());
    }
  }, [dispatch, screamsStatus]);

  let content;
  if (screamsStatus === 'loading') {
    content = <p>Loading...</p>;
  }
  if (screamsStatus === 'succeeded') {
    content = screamIds.map((screamId) => {
      return <ScreamItem key={screamId} screamId={screamId} />;
    });
  }

  return <div>{content}</div>;
}

export default ScreamList;
