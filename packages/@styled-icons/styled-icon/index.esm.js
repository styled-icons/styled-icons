import { __assign, __makeTemplateObject, __rest } from "tslib";
import * as React from 'react';
import styled from 'styled-components';
import validProp from '@emotion/is-prop-valid';
function isValidProp(key) {
    return validProp(key);
}
function filterSVGProps(props) {
    return Object.keys(props).reduce(function (p, k) {
        if (isValidProp(k)) {
            // hack to satisfy TypeScript complexity
            ;
            p[k] = props[k];
        }
        return p;
    }, {});
}
var StyledIconBaseBase = React.forwardRef(function (props, ref) {
    var children = props.children, iconAttrs = props.iconAttrs, iconVerticalAlign = props.iconVerticalAlign, iconViewBox = props.iconViewBox, size = props.size, title = props.title, otherProps = __rest(props, ["children", "iconAttrs", "iconVerticalAlign", "iconViewBox", "size", "title"]);
    var iconProps = __assign({ viewBox: iconViewBox, height: props.height !== undefined ? props.height : size, width: props.width !== undefined ? props.width : size, 'aria-hidden': title == null ? 'true' : undefined, focusable: 'false', role: title != null ? 'img' : undefined }, iconAttrs);
    var svgProps = filterSVGProps(otherProps);
    return (React.createElement("svg", __assign({}, iconProps, svgProps, { ref: ref }),
        title && React.createElement("title", { key: "icon-title" }, title),
        children));
});
export var StyledIconBase = styled(StyledIconBaseBase).withConfig({ displayName: "StyledIconBase", componentId: "sc-1lvpcot" })(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: inline-block;\n  vertical-align: ", ";\n  overflow: hidden;\n"], ["\n  display: inline-block;\n  vertical-align: ", ";\n  overflow: hidden;\n"])), function (props) { return props.iconVerticalAlign; });
var templateObject_1;
