const SvgComponent = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <g data-name="20x20/three-dots--grey" transform="rotate(90 12 12)">
      <path fill="none" d="M0 0h24v24H0z" />
      <circle
        cx={1}
        cy={1}
        r={1}
        stroke="currentColor"
        fill="currentColor"
        strokeMiterlimit={10}
        strokeWidth={0.5}
        transform="translate(5 11)"
      />
      <circle
        cx={1}
        cy={1}
        r={1}
        stroke="currentColor"
        fill="currentColor"
        strokeMiterlimit={10}
        strokeWidth={0.5}
        data-name="Oval"
        transform="translate(11 11)"
      />
      <circle
        cx={1}
        cy={1}
        r={1}
        stroke="currentColor"
        fill="currentColor"
        strokeMiterlimit={10}
        strokeWidth={0.5}
        data-name="Oval"
        transform="translate(17 11)"
      />
    </g>
  </svg>
);
export default SvgComponent;
