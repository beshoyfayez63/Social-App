import { Fragment, useRef, useCallback, useEffect, useState } from 'react';
import TooltipIconButton from './TooltipIconButton';
import EditIcon from '@material-ui/icons/Edit';

function ImageUpload(props) {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState('');
  const imageRef = useRef();

  useEffect(() => {
    if (!image) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(image);
  }, [image]);

  const handleEditImage = () => {
    imageRef.current.click();
  };

  const { onUploadFile } = props;
  const imageUploadHandler = useCallback(
    (e) => {
      const image = e.target.files[0];
      const imageType = image?.type.split('/')[0] === 'image';

      if (!imageType) {
        setError('Upload a valid image');
      }
      if (e.target.files[0] && imageType) {
        setImage(image);
        setError(null);
        const formData = new FormData();
        formData.append('image', image, image.name);
        onUploadFile(formData);
      }
    },
    [onUploadFile]
  );

  return (
    <Fragment>
      <img
        src={previewUrl ? previewUrl : props.imageUrl}
        alt={props.handle}
        className='profile-image'
      />
      <input
        type='file'
        name='image'
        onChange={imageUploadHandler}
        hidden
        ref={imageRef}
      />
      <TooltipIconButton
        title='Upload your image'
        placement='top-start'
        onClick={handleEditImage}
      >
        <EditIcon color='primary' />
      </TooltipIconButton>

      {error && <p className='imageError'>{error}</p>}
    </Fragment>
  );
}

export default ImageUpload;
