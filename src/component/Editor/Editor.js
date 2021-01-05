import React, { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import ImageResize from 'quill-image-resize-module--fix-imports-error';
import ImageUploader from 'quill-image-uploader';
import { addArticlePhoto } from '../../WebAPI';
import 'quill/dist/quill.snow.css';
import styled from 'styled-components';
import { device } from '../../style/breakpoints';
const Container = styled.div`
  min-height: 300px;
  max-height: 400px;

  @media ${device.Tablets} {
    max-width: 100%;
  }
  .ql-container {
    min-height: 250px;
    overflow: auto;

    @media ${device.Tablets} {
      height: 380px;
    }
    .ql-editor {
      word-break: break-all;
      text-align: center;
    }
  }
`;
const contentInit = [
  {
    insert: 'FEATURES ',
    attributes: {
      align: 'center',
      size: 'huge',
    },
  },
  {
    insert: `請於此輸入你的特色說明 `,
    attributes: { align: 'center' },
  },
  { insert: { image: 'https://fakeimg.pl/600x400/' } },
  { insert: ' ', attributes: { align: 'center' } },
  { insert: { image: 'https://fakeimg.pl/150/' } },
  { insert: { image: 'https://fakeimg.pl/150/' } },
  { insert: { image: 'https://fakeimg.pl/150/' } },
  { insert: { image: 'https://fakeimg.pl/150/' } },
  { insert: '\n' },
];

export default function Editor({ onChange, content }) {
  const counterRef = React.useRef();
  const modules = {
    imageResize: {
      displaySize: true,
    },
    toolbar: [[{ header: [1, 2, 3, 4, false] }], [{ align: [] }], ['bold', 'italic', 'underline'], ['link', 'image'], ['clean']],
    imageUploader: {
      upload: (files) => {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append('files', files);

          addArticlePhoto(formData)
            .then((result) => {
              console.log(result);
              resolve(result.url);
            })
            .catch((error) => {
              reject('Upload failed');
              console.error('Error:', error);
            });
        });
      },
    },
  };

  const { quill, quillRef, Quill } = useQuill({ modules });
  if (Quill && !quill) {
    Quill.debug('error')
    Quill.register({ 'modules/imageResize': ImageResize, 'modules/imageUploader': ImageUploader });
  }

  useEffect(() => {
    if (quill) {
      quill.setContents(content ? content : contentInit);
      quill.on('text-change', () => {
        const text = quill.getContents();
        console.log(text);
        onChange(text);
      });
    }
  }, [quill]);
  return (
    <Container>
      <div ref={quillRef} />
      <div ref={counterRef} />
    </Container>
  );
}
