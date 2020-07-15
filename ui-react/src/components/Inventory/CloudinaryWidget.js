import React, { Fragment } from "react";
import Button from '@material-ui/core/Button';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

const ImageUpload = ({ newItem, setNewItem }) => {
  let widget = window.cloudinary.createUploadWidget(
    {
      cloudName: "kss-image-cloud",
      uploadPreset: "logoFromWidget",
      sources: ["local", "url"],
      showAdvancedOptions: false,
      cropping: false,
      multiple: false,
      defaultSource: "local"
    },
    (error, result) => {
      if (result.event === "success") {
        const data = result.info;

        setNewItem({
            ...newItem
        });
      }
    }
  );

  const showWidget = function() {
    widget.open();
  };

  return (
    <Fragment>
        <Button
        variant="contained"
        color="primary"
        type="file"
        onClick={showWidget}
        startIcon={<AddAPhotoIcon />}
        >
        Upload
        </Button>
    </Fragment>
  );
};
export default ImageUpload;