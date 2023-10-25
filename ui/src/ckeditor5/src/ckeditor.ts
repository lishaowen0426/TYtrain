/**
 * @license Copyright (c) 2014-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';

import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Bold, Code, Italic, Underline } from '@ckeditor/ckeditor5-basic-styles';
import { CodeBlock } from '@ckeditor/ckeditor5-code-block';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { FindAndReplace } from '@ckeditor/ckeditor5-find-and-replace';
import { FontBackgroundColor, FontColor, FontFamily, FontSize } from '@ckeditor/ckeditor5-font';
import { Image } from '@ckeditor/ckeditor5-image';
import { Indent } from '@ckeditor/ckeditor5-indent';
import { List } from '@ckeditor/ckeditor5-list';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { Table, TableToolbar } from '@ckeditor/ckeditor5-table';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import { Base64UploadAdapter } from '@ckeditor/ckeditor5-upload';

// You can read more about extending the build with additional plugins in the "Installing plugins" guide.
// See https://ckeditor.com/docs/ckeditor5/latest/installation/plugins/installing-plugins.html for details.

class Editor extends ClassicEditor {
	public static override builtinPlugins = [
		Autoformat,
		Base64UploadAdapter,
		Bold,
		Code,
		CodeBlock,
		Essentials,
		FindAndReplace,
		FontBackgroundColor,
		FontColor,
		FontFamily,
		FontSize,
		Image,
		Indent,
		Italic,
		List,
		Paragraph,
		Table,
		TableToolbar,
		TextTransformation,
		Underline
	];

	public static override defaultConfig = {
		toolbar: {
			items: [
				'fontColor',
				'fontSize',
				'fontFamily',
				'fontBackgroundColor',
				'bold',
				'underline',
				'italic',
				'bulletedList',
				'numberedList',
				'|',
				'outdent',
				'indent',
				'findAndReplace',
				'|',
				'insertTable',
				'undo',
				'redo',
				'codeBlock',
				'code'
			]
		},
		language: 'en',
		table: {
			contentToolbar: [
				'tableColumn',
				'tableRow',
				'mergeTableCells'
			]
		}
	};
}

export default Editor;
