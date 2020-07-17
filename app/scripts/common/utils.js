'use strict';

module.exports = {
    getSize: function getSize($DOMElement) {
        var inlineStyles = $DOMElement.styles;
        var CSSStyles = window.getComputedStyle($DOMElement);

        return {
            width: parseInt(CSSStyles.width || inlineStyles.width || 0, 10),
            height: parseInt(CSSStyles.height || inlineStyles.height || 0, 10)
        };
    },

    getRandomFromRange: function getRandomFromRange(min, max) {
        return (Math.floor(Math.random() * (max - min + 1)) + min);
    }
};
