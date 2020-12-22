import React, { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import styled from 'styled-components';
import { device } from '../../style/breakpoints';
const Container = styled.div`
  min-height:300px;
  max-height:400px;
  
  .ql-container{
    min-height:250px;
    overflow: auto;
    @media ${device.Tablets}{
      min-height:380px;  
    }
  }

`
export default function Editor({onChange,}) {
  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (quill) {
      quill.setContents(
        [{ insert: 'FEATURES ', attributes: {
          header:1,
    } }, 
        { insert: '\n' },
         { insert: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan
         et viverra justo commodo ` , attributes: { header: 4 } },
         { insert: 'World!', attributes: { bold: true } },
         { insert: '\n' },
        ]);
        quill.on('text-change',()=>{
          const text = quill.getContents();
          onChange(text)
        })
    }
  }, [quill]);
  return (
    <Container>
      <div ref={quillRef} />
    </Container>
  );
}
