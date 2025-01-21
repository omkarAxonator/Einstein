import React from 'react';
import ReactQuill from 'react-quill'; // Import Quill editor
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

function Textarea({ placeholder, name, id, onChange, value }) {
  return (
    <div className="rich-text-editor" style={{ width: '100%', height: '300px' }}>
      <ReactQuill
        theme="snow"
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        style={{ height: '80%', width: '100%' }} // Set height and width here
        modules={{
          toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['bold', 'italic', 'underline'],
            ['link'],
            ['blockquote'],
            [{ 'align': [] }],
            ['image'],
            [{ 'color': [] }, { 'background': [] }]
          ],
        }}
      />
    </div>
  );
}

export default Textarea;

