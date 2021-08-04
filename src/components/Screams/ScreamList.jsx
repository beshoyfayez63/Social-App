import { memo } from 'react';
// import { useSelector } from 'react-redux';
import ScreamItem from './ScreamItem';
import ScreamSkeleton from '../../shared/components/UI/ScreamSkeleton';

function ScreamList({ screamIds, screamsStatus, selectScreamById }) {
  let content;
  if (screamsStatus === 'loading') {
    content = <ScreamSkeleton />;
  }
  if (screamsStatus === 'succeeded' && screamIds.length === 0) {
    content = <p>No Screams Found</p>;
  }
  if (screamsStatus === 'succeeded' && screamIds.length > 0) {
    content = screamIds.map((screamId) => {
      return <ScreamItem key={screamId} screamId={screamId} />;
    });
  }

  return <div>{content}</div>;
}

export default memo(ScreamList);
