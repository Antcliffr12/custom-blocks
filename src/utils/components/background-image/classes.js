// function BackgroundClasses(attributes) {
//     return [
//         attributes.backgroundURL &&
//             attributes.backgroundSize &&
//             'no-repeat' === attributes.backgroundRepeat ? 'cb-background-' + attributes.backgroundSize : null,
//         attributes.backgroundURL && attributes.backgroundRepeat ? 'cb-background-' + backgroundRepeat : null
//     ];
// }

// export default BackgroundClasses;
// attributes.backgroundColor ? attributes.backgroundColor : undefined
function BackgroundClasses(attributes) {
    return {
        ['cb-opacity-' + attributes.backgroundOpacity]: attributes.backgroundOpacity,
        ['cb-background-' + attributes.backgroundRepeat]: attributes.backgroundRepeat,
        ['cb-backgroundSize-' + attributes.backgroundSize]: attributes.backgroundSize
    }
}

 export default BackgroundClasses;