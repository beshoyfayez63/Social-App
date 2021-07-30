import { memo } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TooltipIconButton from './TooltipIconButton';
import CloseIcon from '@material-ui/icons/Close';

import useStyles from './modal-styles';

function Model(props) {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth={props.maxWidth}
        open={props.open}
        onClose={props.onCloseDialog}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title' className={classes.dialogTitle}>
          {props.closeIcon && (
            <TooltipIconButton
              title='Close'
              onClick={props.onCloseDialog}
              className={classes.closeButton}
            >
              <CloseIcon />
            </TooltipIconButton>
          )}
          {props.dialogInfo}
        </DialogTitle>
        <DialogContent>{props.children}</DialogContent>
        <DialogActions>
          {props.cancelButtonName && (
            <Button onClick={props.onCloseDialog} color='secondary'>
              {props.cancelButtonName}
            </Button>
          )}
          {props.submitButtonName && (
            <Button
              onClick={props.onSubmit}
              color='primary'
              disabled={props.disabled}
            >
              {props.submitButtonName}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default memo(Model);
