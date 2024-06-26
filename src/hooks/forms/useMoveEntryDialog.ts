import { MoveEntryFormData } from '@/schemas/moveEntrySchema';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

export const useMoveEntryDialog = () => {
    const [openMoveEntryDialog, setOpenMoveEntryDialog] = useState(false);

    const onOpenMoveEntryDialog = (option: string) => {
        if (option === ZonesTableActions.MoveToNewZone) setOpenMoveEntryDialog(true);
    }

    const onCloseMoveEntryDialog = () => {
        setOpenMoveEntryDialog(false);
    }

    const handleMoveEntryDialog: SubmitHandler<MoveEntryFormData> = (data) => {
        console.log(data)
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