import { memo } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

function TooltipIconButton(props) {
  return (
    <Tooltip
      title={props.title}
      placement={props.placement}
      className={props.className}
    >
      <IconButton onClick={props.onClick}>{props.children}</IconButton>
    </Tooltip>
  );
}

export default memo(TooltipIconButton, (prev, next) => {
  return prev.title === next.title;
});
