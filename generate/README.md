This is the source for the icon generator. It reads icons from the `sources/` directory and transforms them into React / Styled Components.

**NOTE:** in `transform/h2x.js`, the `fill` attribute is being removed, so that fills can be overridden by the global `<svg />` `fill` attribute. This assumes that icons are a single solid color. For now that is the case, but if this ever changes, this transform will have to be reevaluated.
