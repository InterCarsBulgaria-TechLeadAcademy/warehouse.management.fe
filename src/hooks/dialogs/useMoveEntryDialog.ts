import { MoveEntryFormData } from '@/schemas/moveEntrySchema';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

export const useMoveEntryDialog = () => {
    const [openMoveEntryDialog, setOpenMoveEntryDialog] = useState(false);
    const [quantity, setQuantity] = useState(0);

    const onOpenMoveEntryDialog = (option: string, quantity: number) => {
        if (option === ZonesTableActions.MoveToNewZone) setOpenMoveEntryDialog(true);
        setQuantity(quantity);
        console.log(quantity);
    }

    const onCloseMoveEntryDialog = () => {
        setOpenMoveEntryDialog(false);
    }

    const handleMoveEntryDialog: SubmitHandler<MoveEntryFormData> = (data) => {
        console.log(data)
        setOpenMoveEntryDialog(false);
    }

    return {
        quantity,
        openMoveEntryDialog,
        onOpenMoveEntryDialog,
        onCloseMoveEntryDialog,
        handleMoveEntryDialog,
    };
};

export enum ZonesTableActions {
    MoveToNewZone = 'MoveToNewZone'
}