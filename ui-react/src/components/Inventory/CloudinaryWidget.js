import React, { Fragment } from "react";
import Button from '@material-ui/core/Button';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

const ImageUpload = ({ newItem, setNewItem }) => {
  // check if in development and upload to a local preset
  let preset;
  if(process.env.REACT_APP_BASE_URL === "development"){
    preset = "kss-widget-local"
  } else {
    preset = "kss-widget"
  }
  let widget = window.cloudinary.createUploadWidget(
    {
      cloudName: "kss-image-cloud",
      uploadPreset: preset,
      sources: ["local", "url"],
      showAdvancedOptions: false,
      cropping: false,
      multiple: false,
      defaultSource: "local"
    },
    (error, result) => {
      if (result.event === "success") {
        const data = result.info;
        console.log(data)
        setNewItem({
            ...newItem,
            mainImgUrl: data.secure_url,
            thumbnailUrl: data.thumbnail_url
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
        onClick={showWidget}
        startIcon={<AddAPhotoIcon />}
        >
        Upload
        </Button>
    </Fragment>
  );
};
export default ImageUpload;