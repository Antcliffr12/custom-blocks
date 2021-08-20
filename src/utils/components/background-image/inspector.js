import { __ } from '@wordpress/i18n'
import { Fragment } from '@wordpress/element';
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
import { RangeControl, Panel, PanelBody, PanelRow, Button, ButtonGroup, Icon, FocalPointPicker, ResponsiveWrapper, __experimentalSpacer as Spacer, SelectControl } from '@wordpress/components';



const BackgroundImagePanel = (props) => {

    const { attributes, setAttributes } = props;
    const ALLOWED_MEDIA_TYPES = ['image', 'video'];

    const backgroundRepeatOptions = [
        {
            value: 'no-repeat', label: __('No Repeat', 'custom-blocks')
        },
        {
            value: 'repeat', label: __('Repeat', 'custom-blocks')
        },
        {
            value: 'repeat-y', label: __('Repeat Vertically', 'custom-blocks')
        },
        {
            value: 'repeat-x', label: __('Repeat Horizontally', 'custom-blocks')
        }
    ];

    const backgroundSizeOptions = [
        { value: 'auto', label: __('Auto', 'custom-blocks') },
        { value: 'cover', label: __('Cover', 'custom-blocks') },
        { value: 'contain', label: __('Contain', 'custom-blocks') }
    ];

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

    const onChangeBackgroundColor = (value) => {
        setAttributes({
            backgroundColor: value
        })
    }

    const backgroundRepeat = [
        {
            value: 'no-repeat',
            label: __('No Repeat', 'custom-blocks')
        },
        {
            value: 'repeat-x',
            label: __('Repeat Horizontally', 'custom-blocks')
        },
        {
            value: 'repeat-y',
            label: __('Repeat Vertically', 'custom-blocks')
        },
    ];

    const backgroundSize = [
        {
            value: 'auto',
            label: __('Auto', 'custom-blocks')
        },
        {
            value: 'cover',
            label: __('Cover', 'custom-blocks')
        },
        {
            value: 'contain',
            label: __('Contain', 'custom-blocks')
        }
    ]


    return (
        <Fragment>
            <InspectorControls>
                <PanelBody
                    title={__('Background Options', 'custom-blocks')}
                    initialOpen={false}
                >
                    <MediaUploadCheck>
                       <Spacer>
                        <MediaUpload
                            onSelect={onSelectMedia}
                            allowedTypes={ALLOWED_MEDIA_TYPES}
                            value={attributes.mediaId}
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
                        </Spacer>
                    </MediaUploadCheck>
                    {attributes.mediaId != 0 &&
                        <Spacer>
                            <MediaUploadCheck>
                                <Button onClick={removeMedia} isLink isDestructive>Remove Image</Button>
                            </MediaUploadCheck>
                        </Spacer>
                    }
                    <PanelColorSettings
                        title={__('Background Color', 'custom-blocks')}
                        initialOpen={false}
                        colorSettings={ [
                            {
                                value: attributes.backgroundColor,
                                onChange: onChangeBackgroundColor,
                                label: __('Background Color', 'custom-blocks'),
                            },
                        ] }
                    ></PanelColorSettings>
                    <RangeControl
                        label={__('Image Opacity', 'custom-blocks')}
                        value={attributes.backgroundOpacity}
                        onChange={(value) => 
                            props.setAttributes({
                                backgroundOpacity: value
                            })
                        }
                        min={0}
                        max={100}
                        step={10}
                    />
                    <SelectControl
                        label={__('Image Display', 'custom-blocks')}
                        value={attributes.backgroundSize}
                        options={backgroundSize}
                        onChange={(value) => 
                            props.setAttributes({
                                backgroundSize: value
                            })
                        }
                    />
                    {'cover' !== attributes.backgroundSize && (
                        <SelectControl
                            label={
                                __('Image Repeat', 'custom-blocks')
                            }
                            value={attributes.backgroundRepeat}
                            options={backgroundRepeat}
                            onChange={(value) =>
                                props.setAttributes({
                                    backgroundRepeat: value
                                })
                            }
                        />
                    )}
                </PanelBody>
            </InspectorControls>
        </Fragment>
    )

};
export default BackgroundImagePanel

