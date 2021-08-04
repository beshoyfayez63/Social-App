import { memo } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

function TooltipIconButton({
  title,
  placement,
  className,
  onClick,
  children,
  disabled,
}) {
  return (
    <Tooltip title={title} placement={placement} className={className}>
      <span>
        <IconButton onClick={onClick} disabled={disabled}>
          {children}
        </IconButton>
      </span>
    </Tooltip>
  );
}

export default memo(TooltipIconButton);
