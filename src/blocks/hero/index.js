import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { ColorPicker } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

import './styles/editor.scss';
import './styles/style.scss';

import Edit from './components/edit';



registerBlockType('custom-blocks/hero-image', {
    title: 'Hero Image',
    icon: 'format-image',
    category: 'custom-blocks',
    keywords: [
        'custom-blocks', 'hero', 'image'
    ],
  
    attributes: {
  
        mediaId: {
            type: 'number',
            default: 0
        },
        mediaUrl: {
            type: 'string',
            default: ''
        },
        TitleString: {
            type: 'array',
            source: 'children',
            selector: '.custom-blocks-title'
        },
        textString: {
            type: 'array',
            source: 'children',
            selector: '.custom-blocks-text',
        },
        titleFontSize: {
            type: 'number',
            default: 32,
        },

        textFontSize: {
            type: 'number',
            default: 16,
        },
        textColor: {
            type: 'string',
            default: '#32373c'
        },
        opacity: {
            type: 'number',
            default: 100
        }


    
    
    },
    edit:Edit,
    save: (props) => {
        return (
           <h1>hi</h1>
        )
    },
})