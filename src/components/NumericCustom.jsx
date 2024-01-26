import React from "react";
import PropTypes from "prop-types";
import { NumericFormat } from "react-number-format";

const NumericCustom = React.forwardRef(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, value, ...other } = props;

  return (
    <NumericFormat
      {...other}
      value={value}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      valueIsNumericString
    />
  );
});

NumericCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default NumericCustom;
