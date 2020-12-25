import React, { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import ImageResize from 'quill-image-resize-module--fix-imports-error';
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
      text-align:center;

    }
  }
`;

export default function Editor({ onChange }) {
  const counterRef = React.useRef();
  const modules = {
    imageResize: {
      displaySize: true,
    },
    toolbar: [[{ header: [1, 2, 3, 4, false] }], [{ align: [] }], ['bold', 'italic', 'underline'], ['link', 'image'], ['clean']],
  };

  const { quill, quillRef, Quill } = useQuill({ modules });

  if (Quill && !quill) {
    Quill.register('modules/imageResize', ImageResize);
  }

  useEffect(() => {
    if (quill) {
      quill.setContents([
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
        { insert: ' ' ,attributes: { align: 'center' },},
        { insert: { image: 'https://fakeimg.pl/150/' } },
        { insert: { image: 'https://fakeimg.pl/150/' } },
        { insert: { image: 'https://fakeimg.pl/150/' } },
        { insert: { image: 'https://fakeimg.pl/150/' } },

        { insert: '\n' },
      ]);
      quill.on('text-change', () => {
        const text = quill.getContents();
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
