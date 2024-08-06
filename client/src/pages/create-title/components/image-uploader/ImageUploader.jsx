const ImageUploader = ({ onSelectImage }) => (
  <div>
    <label>Cover:</label>
    <div>
      <input
        type="file"
        accept="image/png, image/jpg, image/jpeg"
        onChange={(event) => onSelectImage(event.target.files[0])}
      />
    </div>
  </div>
);

export default ImageUploader;
