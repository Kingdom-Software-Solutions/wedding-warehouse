// Home to delete CTAs
import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';


export const DeleteWithIcon = props => {
    return (
        <div>
          <Button
            variant="contained"
            color="secondary"
            className="delete-btn"
            startIcon={<DeleteIcon />}
            onClick={props.onClick}
          >
            Delete
          </Button>
        </div>
    )
}

export const TrashIcon = props => {
    return(
        <>
        <IconButton aria-label="delete">
            <DeleteIcon onClick={props.onClick} />
        </IconButton>
        </>
    )
}