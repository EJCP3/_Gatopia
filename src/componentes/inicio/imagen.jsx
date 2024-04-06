import  { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import '../index/login-registro/Login.scss'

const ImageUpload = ({ onProfileImageUpload, onCoverImageUpload }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const handleProfileDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setProfileImage(file);
      onProfileImageUpload(file); // Pass the file to the parent component
    }
  }, [onProfileImageUpload]);

  const handleCoverDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setCoverImage(file);
      onCoverImageUpload(file); // Pass the file to the parent component
    }
  }, [onCoverImageUpload]);

  const profileDropzone = useDropzone({ accept: 'image/*', onDrop: handleProfileDrop });
  const coverDropzone = useDropzone({ accept: 'image/*', onDrop: handleCoverDrop });

  return (
<>
      <div className="index-login-contenedor-form-contImg">
        <div  {...profileDropzone.getRootProps()}>
          <input  {...profileDropzone.getInputProps()} />
          {profileDropzone.isDragActive ? (
            <p>Arrastre y suelte aquí o haga clic para seleccionar</p>
          ) : (
            <p>Seleccione su imagen de perfil</p>
          )}
        </div>
      </div>
      {profileImage && (
          <img
            className="index-login-contenedor-form-img"
            src={URL.createObjectURL(profileImage)}
            alt="Perfil"
          />
        )}
      <div className="index-login-contenedor-form-contImg">
       
        
        <div {...coverDropzone.getRootProps()}>
          <input {...coverDropzone.getInputProps()} />
          {coverDropzone.isDragActive ? (
            <p>Arrastre y suelte aquí o haga clic para seleccionar</p>
          ) : (
            <p>Seleccione su imagen de portada </p>
          )}
        </div>
        
      </div>
      {coverImage && (
          <img
            className="index-login-contenedor-form-img index-login-contenedor-form-img-portada"
            src={URL.createObjectURL(coverImage)}
            alt="Portada"
          />
        )}
      </>
  );
};

export default ImageUpload;
