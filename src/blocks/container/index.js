import { registerBlockType } from "@wordpress/blocks";
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n'
import { Component } from '@wordpress/element';

import './styles/editor.scss';
import './styles/style.scss';

import Edit from './components/edit.js'
import BackgroundAttributes from './../../utils/components/background-image/attributes'
import TextCTAAttribtues from './../../utils/components/text-options/attributes';

registerBlockType('custom-blocks/cb-container', {
    title: __('Container', 'custom-blocks'),
    description: __(
        'Add container block to wrap other blocks',
        'custom-blocks'
    ),
    icon: 'editor-table',
    category: 'custom-blocks',
    keywords: [
        __('container', 'custom-blocks'),
        __('section', 'custom-blocks'),
        __('custom-blocks', 'custom-blocks')
    ],
    supports: {
        align: ['center', 'full'],
        html: false
    },
    attributes: {
        ...BackgroundAttributes,
        ...TextCTAAttribtues,
        containerWidth: {
            type: 'string',
        },
      
       

    },


   getEditWrapperProps( containerWidth ) {
		const { align, width } = containerWidth;
		if ('center' === align || 'full' === align ) {
			return { 'data-align': align, 'data-resized': !! width };
		}
    },
    edit: Edit,
    save: (props) => {
        return (
            <h1>H1</h1>
        )
    }
    

})