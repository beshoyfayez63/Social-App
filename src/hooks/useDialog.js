import { useState } from 'react';

const useDialog = () => {
  const [open, setOpen] = useState(false);

  const openDialogHandler = () => {
    setOpen(true);
  };
  const closeDialogHandler = (reset) => {
    setOpen(false);
    reset();
  };

  return {
    open,
    openDialogHandler,
    closeDialogHandler,
  };
};

export default useDialog;
