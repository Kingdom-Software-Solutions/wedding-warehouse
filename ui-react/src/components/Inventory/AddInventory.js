import React, { useState } from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';

export const AddInventory = props => {

    return (
        <div>
            <h3>Add Item to Inventory</h3>
            <form>
                <label>Item Name</label>
                <input />
                <label>Description</label>
                <input />
                {/* image uploader here */}
                <Button
                variant="contained"
                color="default"
                // className={classes.button}
                startIcon={<CloudUploadIcon />}
                >
                Upload
                </Button>
                <label>Rental Rate</label>
                <input />
                <label>Buy Now Price</label>
                <input />
            </form>
        </div>
    )
}