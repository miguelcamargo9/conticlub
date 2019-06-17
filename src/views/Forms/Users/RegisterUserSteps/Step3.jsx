import React from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom"
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

// @material-ui/icons
import LocationCity from "@material-ui/icons/LocationCity";
import Smartphone from "@material-ui/icons/Smartphone";

import registerUserFormStyle from "assets/jss/material-dashboard-pro-react/views/registerUserFormStyle.jsx";

import * as subsidiaryActions from "../../../../actions/subsidiaryActions";

class Step3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      simpleSelect: "",
      desgin: false,
      code: false,
      develop: false,
      selectedOption: null,
      city: "Bogotá"
    };
  }

  componentDidMount() {
    this.props.SubsidiaryActions.getSubsidiariesData();
  }
  changeDataToSelect() {
    const { subsidiaries } = this.props;
    let selectData = [];

    if (subsidiaries.length > 0) {
      selectData = subsidiaries.map((subsidiary, index) => {
        subsidiary.value = subsidiary.id;
        subsidiary.label = subsidiary.name;
        return subsidiary;
      });
      return selectData;
    }
  }
  // function that verifies if a string has a given length or not
  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }
  handleChange = selectedOption => {
    this.setState({ selectedOption, city: selectedOption.city.name });
    console.log(`Option selected:`, selectedOption);
  };
  sendState() {
    return this.state;
  }
  handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  change(event, stateName, type, stateNameEqualTo, maxValue) {
    switch (type) {
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      default:
        break;
    }
    this.setState({ [stateName]: event.target.value });
  }
  isValidated() {
    return true;
  }
  render() {
    const { classes } = this.props;
    const tableData = this.changeDataToSelect();
    return (
      <div>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12} lg={10}>
            <GridContainer>
              <GridItem xs={12} sm={5}>
                <InputLabel
                  htmlFor="simple-select"
                  className={classes.selectLabel}
                >
                  Seleccione una sucursal
                </InputLabel>
                <Select
                  value={this.selectedOption}
                  onChange={this.handleChange}
                  options={this.props.subsidiaries}
                />
              </GridItem>
              <GridItem xs={12} sm={5}>
                <CustomInput
                  success={this.state.cityState === "success"}
                  error={this.state.cityState === "error"}
                  labelText={
                    <span>
                      Ciudad <small>(requerido)</small>
                    </span>
                  }
                  id="city"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: event => this.change(event, "city", "length", 5),
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        className={classes.inputAdornment}
                      >
                        <LocationCity className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    ),
                    readOnly: true,
                    value: this.state.city
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={5}>
                <CustomInput
                  success={this.state.phoneState === "success"}
                  error={this.state.phoneState === "error"}
                  labelText={
                    <span>
                      Celular <small>(requerido)</small>
                    </span>
                  }
                  id="phone"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: event => this.change(event, "phone", "length", 5),
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        className={classes.inputAdornment}
                      >
                        <Smartphone className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    )
                  }}
                />
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    subsidiaries: state.subsidiary.subsidiaries
  };
}

function mapDispatchToProps(dispatch) {
  return {
    SubsidiaryActions: bindActionCreators(subsidiaryActions, dispatch)
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    withStyles(registerUserFormStyle)(Step3)
  )
);
