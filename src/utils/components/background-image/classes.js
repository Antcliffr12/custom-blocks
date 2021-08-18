function BackgroundClasses(attributes) {
    return [
        attributes.backgroundURL &&
            attributes.backgroundSize &&
            'no-repeat' === attributes.backgroundRepeat ? 'cb-background-' + attributes.backgroundSize : null,
        attributes.backgroundURL && attributes.backgroundRepeat ? 'cb-background-' + backgroundRepeat : null
    ];
}

export default BackgroundClasses;