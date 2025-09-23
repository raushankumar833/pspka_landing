import React, { useState } from 'react'
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

import { PlansInterface } from 'src/@types/plans';


import UpdatePlanDialogue from './UpdatePlanDialogue ';
import DeletePlanDialog from './DeletePlanDialog';

type PropType = {
    row: PlansInterface
}

const PlanActionsDialog = (Prop: PropType) => {
    const [showEditMenu, setShowEditMenu] = useState(false);
    const [showDeleteMenu, setShowDeleteMenu] = useState(false);


    const handleCloseEdit = () => {
        setShowEditMenu(false);
    }

    const handleCloseDelete = () => {
        setShowDeleteMenu(false);
    }

    return (
        <div>
            <UpdatePlanDialogue row={Prop.row} />
            <DeletePlanDialog refresh={null} row={Prop.row} />

            <Popover
                open={showEditMenu}
                onClose={handleCloseEdit}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
            >
                <Typography sx={{ p: 2 }}>Edit Plan Popover.</Typography>
            </Popover>
            <Popover
                open={showDeleteMenu}
                onClose={handleCloseDelete}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{ p: 2 }} variant='h4'>Delete Plan.</Typography>
                <Typography sx={{ p: 2 }} variant='h6'>Please confirm to delete this plan.</Typography>
            </Popover>
        </div>
    )
}

export default PlanActionsDialog
