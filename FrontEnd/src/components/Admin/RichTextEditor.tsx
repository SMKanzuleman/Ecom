import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { 
  FaBold, 
  FaItalic, 
  FaListUl, 
  FaListOl, 
  FaHeading 
} from 'react-icons/fa';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  
  
    const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editorProps: {
      attributes: {
        class: 'min-h-[150px] p-3 text-black text-sm outline-none focus:outline-none max-h-[250px] overflow-y-auto',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML()); // Pass HTML string back to form state
    },
  });

  if (!editor) return null;

  return (
    <div className="w-full border border-gray-300 rounded-xl overflow-hidden bg-bg">
      {/* Toolbar Buttons */}
      <div className="flex gap-2 p-2 border-b border-gray-300 bg-wh flex-wrap">
        
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-lg text-xs hover:bg-bg ${editor.isActive('bold') ? 'bg-black text-white' : 'text-black'}`}
        >
          <FaBold />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-lg text-xs hover:bg-bg ${editor.isActive('italic') ? 'bg-black text-white' : 'text-black'}`}
        >
          <FaItalic />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={`p-2 rounded-lg text-xs hover:bg-bg ${editor.isActive('heading', { level: 5 }) ? 'bg-black text-white' : 'text-black'}`}
        >
          <FaHeading />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-lg text-xs hover:bg-bg ${editor.isActive('bulletList') ? 'bg-black text-white' : 'text-black'}`}
        >
          <FaListUl />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-lg text-xs hover:bg-bg ${editor.isActive('orderedList') ? 'bg-black text-white' : 'text-black'}`}
        >
          <FaListOl />
        </button>
      </div>

      {/* Editor Typing Area */}
      <EditorContent className='w-full h-[500px]' editor={editor} />
    </div>
  );
};