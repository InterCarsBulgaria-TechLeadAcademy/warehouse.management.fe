import { useState } from 'react';

export const useMoveEntryDialog = () => {
    const [openMoveEntryDialog, setOpenMoveEntryDialog] = useState(false);
    const [quantity, setQuantity] = useState(0);

    const onOpenMoveEntryDialog = (option: string, quantity: number) => {
        if (option === ZonesTableActions.MoveToNewZone) setOpenMoveEntryDialog(true);
        setQuantity(quantity);
    }

    const onCloseMoveEntryDialog = () => {
        setOpenMoveEntryDialog(false);
    }

    return {
        quantity,
        openMoveEntryDialog,
        onOpenMoveEntryDialog,
        onCloseMoveEntryDialog,
    };
};

export enum ZonesTableActions {
    MoveToNewZone = 'MoveToNewZone',
    StartProcessing = 'StartProcessing',
    FinishProcessing = 'FinishProcessing',
    DeliveryDetails = 'DeliveryDetails'
}