import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Aside from '../../../component/Aside';
import { ButtonLight } from '../../../component/Button';
import { device } from '../../../style/breakpoints';
import { useParams, useHistory } from 'react-router';
import { addProductPhoto, linkProductPhotos } from '../../../WebAPI';
const Root = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  position: relative;
  @media ${device.Desktops} {
    display: flex;
  }
`;
const Container = styled.div`
  position: relative;
  top: 40px;
  left: 50%;
  max-width: 80%;
  margin-bottom: 40px;
  font-size: 24px;
  transform: translate(-50%);
  width: 80%;
  @media ${device.Tablets} {
    width: 60%;
  }
`;
const Title = styled.h3`
  font-size: 1em;
  color: ${(props) => props.theme.titleColor};
  margin: 0 16px 20px 40px;
  display: inline-block;
`;
const Form = styled.form`
  max-width: 100%;
  padding: 24px;
  position: relative;
  padding-bottom: 7em;
  box-shadow: 0px 1px 4px 1px ${(props) => props.theme.shadow};
  @media ${device.Tablets} {
    min-width: 70%;
  }
`;
const SubmitBtn = styled(ButtonLight)`
  position: absolute;
  right: 50%;
  bottom: 20px;
  transform: translate(50%);
  @media ${device.Tablets} {
    right: 30px;
    bottom: 30px;
    transform: unset;
  }
`;
const PhotosContainer = styled.div`
  margin-top: 30px;
`;

export default function AddPhotoPage() {
  let { id } = useParams();
  const history = useHistory();
  const [photos, setPhotos] = useState([]);
  const handleInputChange = (e) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      for (let i = 0; i < e.target.files.length; i += 1) {
        formData.append('files', e.target.files[i]);
      }
      addProductPhoto(formData)
        .then((result) => {
          setPhotos([...photos, ...result.data.photos]);
          resolve(result.photos);
        })
        .catch((error) => {
          reject('Upload failed');
          console.error('Error:', error);
        });
    });
  };

  const handleAddProductPhotos = (e) => {
    e.preventDefault();
    const photosIdArray = photos.map((photo) => photo.id);
    linkProductPhotos({ id, photos: photosIdArray }).then((data) => {
      if (data.success) {
        alert('新增商品成功！！');
        history.push('/backstage/products');
      }
    });
  };

  return (
    <Root>
      <Aside />
      <Container>
        <Title>新增商品圖片</Title>
        <Form id="addPhotosForm">
          <input type="file" multiple onChange={handleInputChange} />
          <PhotosContainer>{photos && photos.map((photo) => <img key={photo.id} src={photo.url} width="100" height="80" />)}</PhotosContainer>
          <SubmitBtn onClick={handleAddProductPhotos} type="submit" form="addPhotosForm">
            送出
          </SubmitBtn>
        </Form>
      </Container>
    </Root>
  );
}
