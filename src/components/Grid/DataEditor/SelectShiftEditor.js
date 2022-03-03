import APP_CONSTANTS from "constants/appConstants";
import React, { PureComponent } from "react";
import { ENTER_KEY, TAB_KEY } from "react-datasheet/lib/keys";
import Select from "react-select";

class SelectShiftEditor extends PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {};
  }

  handleChange(opt) {
    const { onCommit, onRevert } = this.props;
    if (!opt) {
      return onRevert();
    }
    const { e } = this.state;
    onCommit(opt.value, e);
  }

  handleKeyDown(e) {
    // record last key pressed so we can handle enter
    if (e.which === ENTER_KEY || e.which === TAB_KEY) {
      e.persist();
      this.setState({ e });
    } else {
      this.setState({ e: null });
    }
  }

  render() {
    return (
      <Select
        autoFocus
        openOnFocus
        closeOnSelect
        value={this.props.value}
        onChange={this.handleChange}
        onInputKeyDown={this.handleKeyDown}
        options={APP_CONSTANTS.SHIFT_OPTIONS}
        classNamePrefix="grid-react-select"
      />
    );
  }
}

export default SelectShiftEditor;
