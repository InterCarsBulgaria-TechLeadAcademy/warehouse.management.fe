import { useState } from 'react';

export const useMoveEntryDialog = () => {
    const [openMoveEntryDialog, setOpenMoveEntryDialog] = useState(false);
    
    const onOpenMoveEntryDialog = (option: string) => {
        if (option === ZonesTableActions.MoveToNewZone) setOpenMoveEntryDialog(true);
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

export enum ZonesTableActions {
    MoveToNewZone = 'MoveToNewZone'
}