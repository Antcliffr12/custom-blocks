import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { ColorPicker } from '@wordpress/components';
import { useState } from '@wordpress/element';

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
        textString: {
            type: 'array',
            source: 'children',
            selector: 'h2',
        },
        fontColor: {
            type: 'string',
        }
    },
    edit: (props) => {
        const {
            setAttributes,
            attributes,
            className,
            focus
        } = props;

        const { fontColor } = props.attributes;

        function onTextChange(changes) {
            setAttributes({
                textString: changes
            });
        }

      
        return (
            <>
            <InspectorControls>
                <div>
                        <strong>Select a font color:</strong>
                        <ColorPicker
                            color={ fontColor }
                            onChangeComplete={ (value) => setAttributes({fontColor:value}) }
                        />
                </div>
            </InspectorControls>
             <div 
                className={className}
                style={{
                    backgroundImage: `url('http://placehold.it/1440x700')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                <div className="overlay"></div>
                <RichText
                    tagName="h2"
                    className="content"
                    value={attributes.textString}
                    onChange={onTextChange}
                    placeholder="Enter your text here"
                    style={{color: fontColor}}
                />
                </div>
                </>
         )
    },
    save: (props) => {
        const { attributes, className } = props;
        const { fontColor } = props.attributes;
        return (
            <div className={className}>
                <div className="overlay"></div>
                <h2 className="content" style={{color:fontColor}}>{attributes.textString}</h2>
            </div>
        )
    },
})