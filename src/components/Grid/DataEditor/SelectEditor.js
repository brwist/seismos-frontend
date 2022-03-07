import React, { PureComponent } from "react";
import { ENTER_KEY, TAB_KEY } from "react-datasheet/lib/keys";
import Select from "react-select";

class SelectEditor extends PureComponent {
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
        options={[
          { label: "Engineering Manager", value: "engineering_manager" },
          { label: "Field engineer", value: "field_engineer" },
        ]}
        classNamePrefix="grid-react-select"
      />
    );
  }
}

export default SelectEditor;
