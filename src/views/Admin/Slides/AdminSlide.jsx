import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import compose from "recompose/compose";

import * as slideActions from "../../../actions/slideActions";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";

// material-ui icons
import Assignment from "@material-ui/icons/Assignment";
import Person from "@material-ui/icons/Person";
import Edit from "@material-ui/icons/Edit";
import Remove from "@material-ui/icons/Remove";

// utils

import { SERVER_URL } from "../../../constants/server";

class AdminSlide extends React.Component {
  componentDidMount() {
    this.props.SlideActions.getSlidesAction();
  }

  render() {
    const { classes } = this.props;

    const simpleButtons = this.createButtons();

    const tableData = this.buildTableData(simpleButtons);

    return this.props.slides.length > 0 ? (
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="warning" icon>
              <CardIcon color="warning">
                <Assignment />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Titan Table</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHead={["#", "Imágen", "Ruta", "Opciones"]}
                tableData={tableData}
                customCellClasses={[
                  classes.center,
                  classes.right,
                  classes.right
                ]}
                customClassesForCells={[0, 4, 5]}
                customHeadCellClasses={[
                  classes.center,
                  classes.right,
                  classes.right
                ]}
                customHeadClassesForCells={[0, 4, 5]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    ) : (
      <div>Loading...</div>
    );
  }

  /**
   * Create the action buttons for the table
   */
  createButtons() {
    const buttons = [
      { color: "info", icon: Person },
      { color: "success", icon: Edit },
      { color: "danger", icon: Remove }
    ];

    return buttons.map((prop, key) => (
      <Button
        color={prop.color}
        simple
        className={this.props.classes.actionButton}
        key={key}
      >
        <prop.icon className={this.props.classes.icon} />
      </Button>
    ));
  }

  /**
   * build the data that will be rendered in the table
   * @param {Element} simpleButtons button element
   */
  buildTableData(simpleButtons) {
    const { slides } = this.props;
    let tableData = [];

    if (slides.length > 0) {
      tableData = slides.map((slide, index) => {
        const path = SERVER_URL + slide.path;
        const imgElement = (
          <img src={path} width="150px" height="80px" alt="imagenes slides" />
        );

        return [index, imgElement, slide.path, simpleButtons];
      });

      return tableData;
    }
  }
}

function mapStateToProps(state) {
  return {
    slides: state.slide.slides
  };
}

function mapDispatchToProps(dispatch) {
  return {
    SlideActions: bindActionCreators(slideActions, dispatch)
  };
}
export default compose(
  withStyles(extendedTablesStyle),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AdminSlide);
