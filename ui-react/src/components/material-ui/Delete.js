// Home to delete CTAs
import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';


export const DeleteWithIcon = () => {
    return (
        <div>
          <Button
            variant="contained"
            color="secondary"
            className="delete-btn"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </div>
    )
}

export const TrashIcon = () => {
    return(
        <>
        <IconButton aria-label="delete">
            <DeleteIcon />
        </IconButton>
        </>
    )
}