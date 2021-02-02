import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const MuiSkeleton = (style) => (
  <div style={style}>
    <Skeleton height={120} />
    <Skeleton height={40} />
    <Skeleton />
    <Skeleton />
    <Skeleton />
  </div>
);

export default MuiSkeleton;
