import React from 'react';

function MemoComp(props) {
  console.log('memo component');
  return <div>Memo Component {props.count}</div>;
}

export default React.memo(MemoComp);
