import { registerBlockType } from "@wordpress/blocks";


const Edit = (props) => {
    
    function onTextChange(changes) {
        props.Set
    }

    return (
        <div className={className}
            style={{
                backgroundImage: `url('http://placehold.it/1440x700')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
            <div className="overlay"></div>
            <RichText
                tagName="h2"
                className="content" // adding a class we can target
                value={attributes.textString}
                onChange={props.onTextChange}
                placeholder="Enter your text here!"
            />
         </div>
    );
}

export default Edit;
