import { __ } from '@wordpress/i18n'
import { Fragment, useState } from '@wordpress/element';
import {
    useBlockProps,
    RichText,
    AlignmentToolbar,
    BlockControls,
    InspectorControls,
    PanelColorSettings,
    MediaUpload,
    MediaUploadCheck,
    MediaPlaceholder
} from '@wordpress/block-editor';
import { Panel, PanelBody, PanelRow, Button, ResponsiveWrapper, ToolbarGroup, ToolbarButton, ColorPalette, SelectControl, RangeControl } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { more, edit, image } from '@wordpress/icons';

import BackgroundImagePanel from '../../../utils/components/background-image/inspector';
import BackgroundClasses from '../../../utils/components/background-image/classes';
import classnames from 'classnames';

const Edit = (props) => {
    const { attributes, setAttributes } = props;

    const ALLOWED_MEDIA_TYPES = ['image', 'video'];


    const onChangeAlignment = (newAlignment) => {
        setAttributes({
            alignment: newAlignment === undefined ? 'none' : newAlignment
        })
    }

    const onChangeBackgroundColor = (value) => {
        setAttributes({
            containerBackgroundColor: value
        })
    }

     const onSelectMedia = (media) => {
        
    props.setAttributes({
            mediaId: media.id,
            mediaUrl: media.url
        });
     }
    
     const onSelectTitleSize = (fontSize) => {
        props.setAttributes({
            titleFontSize: fontSize
        })
     }
    
    const onTitleChange = (changes) => {
        props.setAttributes({
            TitleString: changes
        })
    }

    const onTextChange = (changes) => {
        props.setAttributes({
            textString: changes
        })
    }

    function onChangeTextColor(color) {
        props.setAttributes({
            textColor: color
        })
    }
    
    const styles = {
        backgroundColor: attributes.backgroundColor ? attributes.backgroundColor : undefined,
        backgroundImage: attributes.mediaUrl != 0 ? 'url("' + attributes.mediaUrl + '")' : ''

    }

    const className = classnames(
			[ props.className, 'cb-block-container' ],
			{
                ['align' + attributes.containerWidth]: attributes.containerWidth,
                ['cb-font-size-' + attributes.textFontSize]: attributes.textFontSize,
                ...BackgroundClasses(attributes)
			}
		);

    return (
        <Fragment>
            <div {...useBlockProps()}>
                {
                    <BlockControls>
                        <ToolbarGroup>
                           <MediaUpload
                                onSelect={onSelectMedia}
                                allowedTypes={ALLOWED_MEDIA_TYPES}
                                value={attributes.mediaId}
                                render={({ open }) => (
                                      <ToolbarButton
                                        icon={ image }
                                        label="Change Image"
                                        onClick={open}
                                    />
                                )}

                            />
                        </ToolbarGroup>
                    </BlockControls>
                }    
            </div>
            <InspectorControls>
                <BackgroundImagePanel
                    {...props}
                ></BackgroundImagePanel>
              
                <PanelBody title="Text Options" initialOpen={false}>
                            <RangeControl
                                label="Title Font Size"
                                value={attributes.titleFontSize}
                                onChange={onSelectTitleSize}
                                min={24}
                                max={60}
                                step={2}
                            />
                            <RangeControl
                                label="Text Font Size"
                                value={attributes.textFontSize}
                                onChange={(value) =>
                                    props.setAttributes({
                                        textFontSize: value
                                    })
                                }
                                min={14}
                                max={24}
                                step={2}
                        />
                        <PanelColorSettings
                            title={__('Text Color', 'cb-blocks')}
                            initialOpen={false}
                            colorSettings={[
                                {
                                    value: attributes.textColor,
                                    onChange: onChangeTextColor,
                                    label: 'Text Color'
                                },
                            ]}
                            ></PanelColorSettings>
                         
                </PanelBody>
            </InspectorControls>
            {attributes.mediaId ?
                <div className={className ? className : undefined} style={styles}>
                    <RichText
                        tagName="h2"
                        className={"custom-blocks-title custom-blocks-font-size-" + attributes.titleFontSize}
                        value={attributes.TitleString}
                        onChange={onTitleChange}
                        placeholder="Enter Text Here"
                        keepPlaceholderOnFocus
                        style={{ color: attributes.textColor }}
                    />
                    <RichText
                        tagName="div"
                        multiline="p"
                        className={"custom-blocks-text custom-blocks-font-size-" + attributes.textFontSize}
                        placeholder='Secondary Text'
                        keepPlaceholderOnFocus
                        value={attributes.textString}
                        onChange={onTextChange}
                        style={{ color: attributes.textColor }}
                    />

                </div>
                :
                <MediaPlaceholder
                    icon="format-image"
                    labels={{
                        title:'Add Image'
                    }}
                    className="block-image"
                    onSelect={onSelectMedia}
                    allowedTypes={ALLOWED_MEDIA_TYPES}
                />
             }
        </Fragment>
    )
}

export default withSelect((select, props) => {
    return { media: props.attributes.mediaId ? select('core').getMedia(props.attributes.mediaId) : undefined };
})(Edit);