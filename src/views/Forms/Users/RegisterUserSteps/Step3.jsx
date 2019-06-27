import React from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter, Link } from "react-router-dom";

// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "components/CustomButtons/Button.jsx";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

// @material-ui/icons
import LocationCity from "@material-ui/icons/LocationCity";
import Smartphone from "@material-ui/icons/Smartphone";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";

import Politics from "../../../Pages/Politics";
import HabeasData from "../../../Pages/HabeasData";
import registerUserFormStyle from "assets/jss/material-dashboard-pro-react/views/registerUserFormStyle.jsx";

import * as subsidiaryActions from "../../../../actions/subsidiaryActions";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class Step3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subsidiary: null,
      city: "Bogotá",
      subsidiaryState: "error",
      politicsState: "error",
      habeasState: "error",
      classicModal: false,
      habeasModal: false
    };
  }
  aceptPolitics() {
    this.setState({
      politicsState: "success"
    });
  }

  aceptHabeas() {
    this.setState({
      habeasState: "success"
    });
  }

  handleClickOpen(modal) {
    var x = [];
    x[modal] = true;
    this.setState(x);
  }
  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState(x);
  }
  componentDidMount() {
    this.props.SubsidiaryActions.getSubsidiariesData();
  }
  // function that verifies if a string has a given length or not
  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }
  handleChangeSubsidiary = subsidiary => {
    this.setState({
      subsidiary,
      city: subsidiary.city.name,
      subsidiaryState: "success",
      cityState: "success"
    });
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
    if (
      this.state.cityState === "success" &&
      this.state.phoneState === "success" &&
      this.state.subsidiaryState === "success" &&
      this.state.politicsState === "success" &&
      this.state.habeasState === "success"
    ) {
      return true;
    } else {
      if (this.state.cityState !== "success") {
        this.setState({ cityState: "error" });
      }
      if (this.state.phoneState !== "success") {
        this.setState({ phoneState: "error" });
      }
      if (this.state.subsidiaryState !== "success") {
        this.setState({ subsidiaryState: "error" });
      }
      if (this.state.politicsState !== "success") {
        this.setState({ politicsState: "error" });
      }
      if (this.state.habeasState !== "success") {
        this.setState({ habeasState: "error" });
      }
    }
    return false;
  }
  render() {
    const { classes } = this.props;
    const { subsidiaryState, politicsState, habeasState } = this.state;
    const labelClasses = classNames({
      [" " + classes.labelRootError]: subsidiaryState === "error",
      [" " + classes.labelRootSuccess]: subsidiaryState === "success"
    });
    const helpTextClasses = classNames({
      [classes.labelRootError]: subsidiaryState === "error",
      [classes.labelRootSuccess]: subsidiaryState === "success"
    });
    const politcsCheck = politicsState === "success" ? true : false;
    const habeasCheck = habeasState === "success" ? true : false;
    return (
      <div>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12} lg={10}>
            <GridContainer>
              <GridItem xs={12} sm={7}>
                <InputLabel
                  htmlFor="simple-select"
                  className={classes.selectLabel + " " + labelClasses}
                >
                  Seleccione una sucursal (Requerido)
                </InputLabel>
                <Select
                  id="subsidiary"
                  className={classes.selectMenu + " " + labelClasses}
                  value={this.subsidiary}
                  onChange={this.handleChangeSubsidiary}
                  options={this.props.subsidiaries}
                  placeholder="Seleccione una sucursal"
                />
                {subsidiaryState === "error" ? (
                  <FormHelperText id={"subsidiary"} className={helpTextClasses}>
                    {"Requerido"}
                  </FormHelperText>
                ) : null}
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
            <GridContainer className={classes.inlineChecks}>
              <GridItem xs={12} sm={6}>
                <Link
                  to="#"
                  onClick={() => this.handleClickOpen("classicModal")}
                >
                  <FormControlLabel
                    disabled
                    control={
                      <Checkbox
                        id="politicsState"
                        tabIndex={-1}
                        checked={politcsCheck}
                        checkedIcon={<Check className={classes.checkedIcon} />}
                        icon={<Check className={classes.uncheckedIcon} />}
                        classes={{
                          checked: classes.checked,
                          root: classes.checkRoot
                        }}
                      />
                    }
                    classes={{
                      label: classes.label,
                      disabled: classes.disabledCheckboxAndRadio
                    }}
                  />
                  Aceptar políticas y condiciones
                </Link>
                {politicsState === "error" ? (
                  <FormHelperText
                    id={"politicsState"}
                    className={helpTextClasses}
                  >
                    {"Requerido"}
                  </FormHelperText>
                ) : null}
              </GridItem>
              <GridItem xs={12} sm={5}>
                <Link
                  to="#"
                  onClick={() => this.handleClickOpen("habeasModal")}
                >
                  <FormControlLabel
                    disabled
                    control={
                      <Checkbox
                        id={"habeasState"}
                        tabIndex={-1}
                        checked={habeasCheck}
                        checkedIcon={<Check className={classes.checkedIcon} />}
                        icon={<Check className={classes.uncheckedIcon} />}
                        classes={{
                          checked: classes.checked,
                          root: classes.checkRoot
                        }}
                      />
                    }
                    classes={{
                      label: classes.label,
                      disabled: classes.disabledCheckboxAndRadio
                    }}
                  />
                  Aceptar habeas data
                </Link>
                {habeasState === "error" ? (
                  <FormHelperText
                    id={"habeasState"}
                    className={helpTextClasses}
                  >
                    {"Requerido"}
                  </FormHelperText>
                ) : null}
              </GridItem>
            </GridContainer>
            <Dialog
              classes={{
                root: classes.center + " " + classes.modalRoot,
                paper: classes.modal
              }}
              open={this.state.classicModal}
              TransitionComponent={Transition}
              keepMounted
              onClose={() => this.handleClose("classicModal")}
              aria-labelledby="classic-modal-slide-title"
              aria-describedby="classic-modal-slide-description"
            >
              <DialogTitle
                id="classic-modal-slide-title"
                disableTypography
                className={classes.modalHeader}
              >
                <Button
                  justIcon
                  className={classes.modalCloseButton}
                  key="close"
                  aria-label="Close"
                  color="transparent"
                  onClick={() => this.handleClose("classicModal")}
                >
                  <Close className={classes.modalClose} />
                </Button>
                <h4 className={classes.modalTitle}>Políticas y Condiciones</h4>
              </DialogTitle>
              <DialogContent
                id="classic-modal-slide-description"
                className={classes.modalBody}
              >
                <Politics />
              </DialogContent>
              <DialogActions className={classes.modalFooter}>
                <Button
                  onClick={() => {
                    this.handleClose("classicModal");
                    this.aceptPolitics();
                  }}
                  color="transparent"
                >
                  Aceptar
                </Button>
                <Button
                  onClick={() => {
                    this.handleClose("classicModal");
                  }}
                  color="danger"
                  simple
                >
                  Cancelar
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              classes={{
                root: classes.center + " " + classes.modalRoot,
                paper: classes.modal
              }}
              open={this.state.habeasModal}
              TransitionComponent={Transition}
              keepMounted
              onClose={() => this.handleClose("habeasModal")}
              aria-labelledby="classic-modal-slide-title"
              aria-describedby="classic-modal-slide-description"
            >
              <DialogTitle
                id="classic-modal-slide-title"
                disableTypography
                className={classes.modalHeader}
              >
                <Button
                  justIcon
                  className={classes.modalCloseButton}
                  key="close"
                  aria-label="Close"
                  color="transparent"
                  onClick={() => this.handleClose("habeasModal")}
                >
                  <Close className={classes.modalClose} />
                </Button>
                <h4 className={classes.modalTitle}>Habeas Data</h4>
              </DialogTitle>
              <DialogContent
                id="classic-modal-slide-description"
                className={classes.modalBody}
              >
                <HabeasData />
              </DialogContent>
              <DialogActions className={classes.modalFooter}>
                <Button
                  onClick={() => {
                    this.handleClose("habeasModal");
                    this.aceptHabeas();
                  }}
                  color="transparent"
                >
                  Aceptar
                </Button>
                <Button
                  onClick={() => {
                    this.handleClose("habeasModal");
                  }}
                  color="danger"
                  simple
                >
                  Cancelar
                </Button>
              </DialogActions>
            </Dialog>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { subsidiaries } = state.subsidiary;
  const selectData = subsidiaries.map(subsidiary => {
    subsidiary.value = subsidiary.id;
    subsidiary.label = subsidiary.name;
    return subsidiary;
  });
  return {
    subsidiaries: selectData
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
  )(withStyles(registerUserFormStyle)(Step3))
);
