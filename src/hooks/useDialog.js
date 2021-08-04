import { useState, useCallback } from 'react';

const useDialog = () => {
  const [open, setOpen] = useState(false);

  const openDialogHandler = () => {
    setOpen(true);
  };
  const closeDialogHandler = useCallback((reset) => {
    setOpen(false);
    if (reset) reset();
  }, []);

  return {
    open,
    openDialogHandler,
    closeDialogHandler,
  };
};

export default useDialog;
