import { __ } from '@wordpress/i18n'
import { Fragment } from '@wordpress/element';
import {
    useBlockProps,
    RichText,
    AlignmentToolbar,
    BlockControls,
    InspectorControls,
    PanelColorSettings,
} from '@wordpress/block-editor';
import { Panel, PanelBody, PanelRow, Button, ResponsiveWrapper, ToolbarGroup, ToolbarButton, ColorPalette, SelectControl, RangeControl } from '@wordpress/components';


const TextCTAOptionsPanel = (props) => {
    const { attributes, setAttributes } = props;

    function onChangeTextColor(color) {
        props.setAttributes({
            textColor: color
        })
    }

    return (
        <Fragment>
            <InspectorControls>
                 <PanelBody
                    title={__('Text Options', 'custom-blocks')}
                    initialOpen={false}
                >
                    <RangeControl
                        label={__('Title Font Size', 'custom-blocks')}
                        value={attributes.titleFontSize}
                        onChange={(value) => 
                            props.setAttributes({
                                titleFontSize: value
                            })
                        }
                        min={24}
                        max={60}
                        step={2}
                    />
                    <RangeControl
                        label={__('Text Font Size', 'custom-blocks')}
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
                        title={__('Text Color', 'custom-blocks')}
                        initialOpen={false}
                        colorSettings={[
                            {
                                value: attributes.textColor,
                                onChange: onChangeTextColor,
                                label: __("Text Color", 'custom-blocks')
                            },
                        ]}
                        ></PanelColorSettings>
                </PanelBody>
            </InspectorControls>
        </Fragment>
    )
}

export default TextCTAOptionsPanel
