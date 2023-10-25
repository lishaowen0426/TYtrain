// import React, { Component } from 'react';
// import Editor from '../ckeditor5/build/ckeditor';
// import { CKEditor } from '@ckeditor/ckeditor5-react'
// import '../css/ckeditors.css';

// const editorConfiguration = {
//    // toolbar: [ 'bold', 'italic' ]
//    height: 400 // 设置您希望的高度，例如 400px
// };

// class MyEditor extends Component {
//     handleEditorChange = (event, editor) => {
//         const data = editor.getData();
//         console.log({ event, editor, data });

//         // 将数据传递回页面A
//         if (this.props.onDataChanged) {
//             this.props.onDataChanged(data);
//         }
//     }

//     render() {
//         return (
//             <div className="App">
//              {/* <h2>Using CKEditor&nbsp;5 from online builder in React</h2> */}
//                 <CKEditor
//                     editor={ Editor }
//                     config={ editorConfiguration }
//                    // data="<p>Hello from CKEditor&nbsp;5!</p>"
//                     data=""
//                     onReady={ editor => {
//                         // You can store the "editor" and use when it is needed.
//                         console.log( 'Editor is ready to use!', editor );
//                     } }
//                     onChange={ this.handleEditorChange }
//                     onBlur={ ( event, editor ) => {
//                         console.log( 'Blur.', editor );
//                     } }
//                     onFocus={ ( event, editor ) => {
//                         console.log( 'Focus.', editor );
//                     } }
//                 />
//             </div>
//         );
//     }
// }

// export default MyEditor;
import React, { Component } from 'react';
import Editor from '../ckeditor.js';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import '../css/ckeditors.css';

const editorConfiguration = {
    height: 400 // 设置您希望的高度，例如 400px
};

class MyEditor extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         initialValue: this.props.initialValue || '' // 获取传入的初期值
    //     };
    // }

    handleEditorChange = (event, editor) => {
        const data = editor.getData();
        console.log({ event, editor, data });

        // 将数据传递回页面A
        if (this.props.onDataChanged) {
            this.props.onDataChanged(data);
        }
    }

    render() {
        return (
            <div className="App">
                <CKEditor
                    editor={Editor}
                    config={editorConfiguration}
                    data={this.props.initialValue} // 使用初期值
                    onReady={editor => {
                        console.log('Editor is ready to use!', editor);
                    }}
                    onChange={this.handleEditorChange}
                    onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                />
            </div>
        );
    }
}

export default MyEditor;
