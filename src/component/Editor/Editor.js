import React, { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import styled from 'styled-components';
import { device } from '../../style/breakpoints';

// const Container = styled.div`
//   width: 100%;
//   @media ${device.Tablets}{
//     max-width:100%;
//     min-width:
//   }
// `;
export default function Editor() {
  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML('<h1>React Hook for Quill!</h1>');
    }
  }, [quill]);
  return (
    <div style={{ height: 400 }}>
      <div ref={quillRef} />
    </div>
  );
}
