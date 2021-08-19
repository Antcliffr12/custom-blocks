function BackgroundClasses(attributes) {
    return {
        ['cb-opacity-' + attributes.backgroundOpacity]: attributes.backgroundOpacity,
        ['cb-background-' + attributes.backgroundRepeat]: attributes.backgroundRepeat,
        ['cb-backgroundSize-' + attributes.backgroundSize]: attributes.backgroundSize
    }
}

 export default BackgroundClasses;