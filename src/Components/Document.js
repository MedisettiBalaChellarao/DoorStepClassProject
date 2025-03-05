import React from 'react';

const Document = () => {
  return (
    <div>
      <iframe
        src="http://localhost:5060/handout.pdf"
        width="100%"
        height="600px"
        title="PDF Document"
      />
    </div>
  );
}

export default Document;
