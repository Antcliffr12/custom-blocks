import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps, RichText, InspectorControls, MediaUpload, MediaUploadCheck, MediaPlaceholder, BlockControls } from '@wordpress/block-editor';
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
        backgroundImage: attributes.mediaUrl != 0 ? 'url("' + attributes.mediaUrl + '")' : 'url("https://www.fillmurray.com/900/300")'
    };

    //text
        const [color, setColor] = useState('#000000')

        const colors = [
            { name: 'grey', color: '#808080' },
            { name: 'white', color: '#ffffff' },
            { name: 'blue', color: '#00f' },
            
        ];
    
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
                                     {console.log(attributes.mediaId)}

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
                        </div>
                       
                        </PanelRow>
                </PanelBody>
                <PanelBody title="Hero Styles">
                    <PanelRow>
                        <div className="editor-post-featured-text">
                            <ColorPalette
                                colors={colors}
                                value={attributes.fontColor}
                                onChange={onTextChangeColor}
                            />
                            
                        </div>
                    </PanelRow>
                </PanelBody>
            </InspectorControls>
            {attributes.mediaId ?
                <section className="hero" style={backgroundStyle}>
                    <div className="overlay-content">
                            <RichText
                                tagName="h2"
                                className={"custom-blocks-title custom-blocks-font-size-" + attributes.titleFontSize}
                                value={attributes.TitleString}
                                onChange={onTitleChange}
                                placeholder="Enter Text Here"
                                keepPlaceholderOnFocus
                                style={{ color: attributes.titleColor }}
                        />
                        <RichText
                            tagName="div"
                            multiline="p"
                            className={"custom-blocks-text custom-blocks-font-size-" + attributes.textFontSize}
                            placeholder='Secondary Text'
                            keepPlaceholderOnFocus
                            value={attributes.textString}
                            onChange={onTextChange}
                        />
                        
                         
                    </div>
                </section>
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
