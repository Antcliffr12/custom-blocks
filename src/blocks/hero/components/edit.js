import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps, RichText, InspectorControls, MediaUpload, MediaUploadCheck, MediaPlaceholder, BlockControls, PanelColorSettings } from '@wordpress/block-editor';
import { Panel, PanelBody, PanelRow, Button, ResponsiveWrapper, ToolbarGroup, ToolbarButton, ColorPalette, SelectControl, RangeControl } from '@wordpress/components';
import { more, edit, heading } from '@wordpress/icons';
import { withSelect } from '@wordpress/data';

import { Fragment, useState } from '@wordpress/element';


const Edit = (props) => {

    const { attributes, setAttributes } = props;
    
    const ALLOWED_MEDIA_TYPES = ['image', 'video'];

    const onSelectFontSize = (fontSize) => {
        props.setAttributes({
            titleFontSize: fontSize
        })
    }
    

    const onSelectMedia = (media) => {
        
        props.setAttributes({
            mediaId: media.id,
            mediaUrl: media.url
        });
    }
    

    const removeMedia = () => {
        props.setAttributes({
            mediaId: 0,
            mediaUrl: ''
        });
    }
    
    const backgroundStyle = {
        backgroundImage: attributes.mediaUrl != 0 ? 'url("' + attributes.mediaUrl + '")' : 'none'
    };

   

    function onTitleChange(changes) {
        props.setAttributes({
            TitleString: changes
        })
    }
    
    function onTextChange(changes) {
        props.setAttributes({
            textString: changes
        })
    }
    
    function onTextChangeColor(changes) {
        props.setAttributes({
            fontColor:changes
        })
    }

    function onChangeOverlay(changes) {
        props.setAttributes({
            overlay:changes
        })
    }

    function onChangeTextColor(color) {
        props.setAttributes({
            textColor: color
        })
    }
    
    function opacityClass(opacityValue) {
        return 100 === opacityValue ? '' : 'has-background-opacity-' + opacityValue;
    }


    return (
       
        <Fragment>
              <div {...useBlockProps() }>
                    {
                    <BlockControls>
                        <ToolbarGroup>
                            <MediaUpload
                                onSelect={onSelectMedia}
                                allowedTypes={ALLOWED_MEDIA_TYPES}
                                value={attributes.mediaId}
                                render={({ open }) => (
                                      <ToolbarButton
                                        icon={ edit }
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
                <PanelBody title="Text Options" initialOpen={false}>
                    <PanelRow>
                        <div className="editor-post-cta-text">
                            <RangeControl
                                label="Title Font Size"
                                value={attributes.titleFontSize}
                                onChange={onSelectFontSize}
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
							title='Text Color'
							initialOpen={ false }
							colorSettings={ [
								{
                                    value: attributes.textColor,
									onChange: onChangeTextColor,
									label: 'Text Color',
								},
							] }
						></PanelColorSettings>
                         </div>
                    </PanelRow>
                </PanelBody>
                    <PanelBody title="Background Options" initialOpen={false}>
                        <PanelRow>
                            <div className="editor-post-featured-image">
                                <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={onSelectMedia}
                                    value={attributes.mediaId}
                                    allowedTypes={ALLOWED_MEDIA_TYPES}
                                    render={({ open }) => (
                                       <Button 
                                            className={attributes.mediaId == 0 ? 'button' : 'editor-post-featured-image__preview'}
                                            onClick={open}
                                        >
                                            {attributes.mediaId == 0 && 'Choose an image'}
                                            {props.media != undefined &&
                                                <ResponsiveWrapper
                                                naturalWidth={props.media.media_details.width}
                                                naturalHeight={props.media.media_details.height}
                                            >
                                                
                                                <img src={props.media.source_url} />
                                                </ResponsiveWrapper>
                                            }
                                        </Button>
                                    )} />
                                
                            </MediaUploadCheck>
                            {attributes.mediaId != 0 &&
                                <MediaUploadCheck>
                                    <Button onClick={removeMedia} isLink isDestructive>Remove Image</Button>
                                </MediaUploadCheck>
                            }
                           <RangeControl
                                label="Image Opacity"
                                value={attributes.opacity}
                                onChange={(value) =>
                                    props.setAttributes({
                                        opacity: value
                                    })
                                }
                                min={0}
                                max={100}
                                step={10}
                            />

                        </div>
                       
                        </PanelRow>
                </PanelBody>
            </InspectorControls>
            {attributes.mediaId ?
                <div className={`hero ` + opacityClass(attributes.opacity)} style={backgroundStyle}>
                    <div className="content position-1">
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
    );
}

export default withSelect((select, props) => {
    return { media: props.attributes.mediaId ? select('core').getMedia(props.attributes.mediaId) : undefined };
})(Edit);
