import { useState } from 'react';

export const useMoveEntryDialog = () => {
    const [openMoveEntryDialog, setOpenMoveEntryDialog] = useState(false);
    
    const onOpenMoveEntryDialog = (option: string) => {
        if (option === 'MoveToNewZone') setOpenMoveEntryDialog(true);
    }

    const onCloseMoveEntryDialog = () => {
        setOpenMoveEntryDialog(false);
    }

    const handleMoveEntryDialog = () => {
        setOpenMoveEntryDialog(false);
    }

    return {
        openMoveEntryDialog,
        onOpenMoveEntryDialog,
        onCloseMoveEntryDialog,
        handleMoveEntryDialog,
    };
};