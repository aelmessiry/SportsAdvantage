import React from 'react';
import ReactQuill from 'react-quill';
const SpAdvEditor = (props: any) => {
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['blockquote', 'code-block'],
        ['link'],
        ['clean'],
      ],
    },
  };
  return (
    <div className={props.className ? props.className : ''}>
      <p className="text-darkGunmetal-300 mb-2 mr-2 text-sm font-normal">
        {props.label}
        {props.required && <span className=" text-lava-100">*</span>}
      </p>

      <ReactQuill
        theme="snow"
        value={props.value}
        onChange={(e) => {
          props.onChange(e);
          props.isEmpty(
            e.replace(/<(.|\n)*?>/g, '').trim().length === 0 ||
              e === '<p><br></p>'
          );
        }}
        modules={modules}
      />
    </div>
  );
};

export default SpAdvEditor;
