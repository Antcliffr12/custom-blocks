/**
 * Background image Attributes
 */

const BackgroundAttributes = {
    mediaId: {
        type: 'number',
        default: 0
    },
    mediaUrl: {
        type: 'string'
    },
    backgroundRepeat: {
        type: 'string',
        default: 'no-repeat'
    },
    backgroundSize: {
        type: 'string',
        default: 'cover'
    },
    backgroundColor: {
        type: 'string'
    },
    backgroundOpacity: {
        type: 'number',
        default: 100
    }
}

export default BackgroundAttributes