import {
    useBlockProps,
    RichText,
    AlignmentToolbar,
    BlockControls,
} from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n'

const Test = (props) => {
    const { attributes, setAttributes } = props;
    
    const onChangeAlignment = (newAlignment) => {
        setAttributes({
            alignment: newAlignment === undefined ? 'none' : newAlignment
        })
    }

    return (
        <div {...useBlockProps()}>
            {
                <BlockControls>
                    <AlignmentToolbar
                        value={attributes.alignment}
                        onChange={onChangeAlignment}
                    />
                </BlockControls>
            }
         </div>
    )

}

export default Test