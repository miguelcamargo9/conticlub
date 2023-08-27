import React, { useState } from "react";

// @material-ui/core components
import InputAdornment from "@material-ui/core/InputAdornment";

// material ui icons
import Close from "@material-ui/icons/Close";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

const Point = ({ point, onChange, classes }) => {
  const [tirePointsGeneralState, setTirePointsGeneralState] = useState();
  const [tirePointsUhpState, setTirePointsUhpState] = useState();

  const change = (event, type, setValidFunction) => {
    switch (type) {
      case "number":
        if (verifyNumber(event.target.value)) {
          setValidFunction("success");
        } else {
          setValidFunction("error");
        }
        break;
      default:
        break;
    }
  };

  // function that verifies if value contains only numbers
  const verifyNumber = value => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={4} md={4}>
        <CustomInput
          labelText={
            <span>
              Puntos General <small>(requerido)</small>
            </span>
          }
          id="tirePointsGeneral"
          formControlProps={{
            fullWidth: true
          }}
          inputProps={{
            value: point.points_general,
            onChange: event => {
              onChange("points_general", event.target.value);
              change(event, "length", 3, setTirePointsGeneralState);
            },
            type: "number",
            endAdornment: tirePointsGeneralState === "error" && (
              <InputAdornment position="end">
                <Close className={classes.danger} />
              </InputAdornment>
            )
          }}
        />
      </GridItem>
      <GridItem xs={12} sm={4} md={4}>
        <CustomInput
          labelText={
            <span>
              Puntos UHP/+17 <small>(requerido)</small>
            </span>
          }
          id="tirePointsUhpState"
          formControlProps={{
            fullWidth: true
          }}
          inputProps={{
            value: point.points_uhp,
            onChange: event => {
              onChange("points_uhp", event.target.value);
              change(event, "length", 3, setTirePointsUhpState);
            },
            type: "number",
            endAdornment: tirePointsUhpState === "error" && (
              <InputAdornment position="end">
                <Close className={classes.danger} />
              </InputAdornment>
            )
          }}
        />
      </GridItem>
      <GridItem xs={12} sm={4} md={4}>
        <CustomInput
          labelText={<span>Puntos Totales</span>}
          id="tireTotalPoints"
          formControlProps={{
            fullWidth: true
          }}
          inputProps={{
            value:
              parseInt(point.points_general || 0) +
              parseInt(point.points_uhp || 0),
            type: "number",
            readOnly: true
          }}
        />
      </GridItem>
    </GridContainer>
  );
};

export default Point;
