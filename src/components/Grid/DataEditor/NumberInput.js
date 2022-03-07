import React, { PureComponent } from "react";

class NumberInput extends PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this._input.focus();
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    const { value, onKeyDown } = this.props;
    return (
      <input
        ref={(input) => {
          this._input = input;
        }}
        type="number"
        className="data-editor transparent-input"
        value={value}
        onChange={this.handleChange}
        onKeyDown={onKeyDown}
      />
    );
  }
}

export default NumberInput;
