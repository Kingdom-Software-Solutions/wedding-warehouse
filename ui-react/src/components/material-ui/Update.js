// Home to update CTAs
import React from 'react';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';


export const EditWithIcon = props => {
    return (
        <div>
          <Button
            variant="contained"
            color="primary"
            className="edit-btn"
            startIcon={<EditIcon />}
            onClick={props.onClick}
          >
            Edit
          </Button>
        </div>
    )
};

export const PencilIcon = props => {
    return(
        <>
        <IconButton aria-label="update">
            <EditIcon onClick={props.onClick} />
        </IconButton>
        </>
    )
};