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
        textString: {
            type: 'array',
            source: 'children',
            selector: 'h2',
        },
        fontColor: {
            type: 'string',
            default: 'black'
        }
    
    },
    edit:Edit,
    save: (props) => {
        const { attributes, className } = props;
        const { fontColor } = props.attributes;
        return (
            <div className={className}>
                <div className="overlay"></div>
                <h2 className="content" style={{ color: fontColor }}>{attributes.textString}</h2>
            </div>
        )
    },
})