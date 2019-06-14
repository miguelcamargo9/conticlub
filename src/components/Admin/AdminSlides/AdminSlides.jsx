import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import compose from "recompose/compose";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import appStyle from "assets/jss/material-dashboard-pro-react/layouts/adminStyle.jsx";

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

class AdminSlides extends React.Component {
  render() {
    const { classes } = this.props;
    const simpleButtons = [
      { color: "info", icon: Person },
      { color: "success", icon: Edit },
      { color: "danger", icon: Remove }
    ].map((prop, key) => {
      return (
        <Button
          color={prop.color}
          simple
          className={classes.actionButton}
          key={key}
        >
          <prop.icon className={classes.icon} />
        </Button>
      );
    });
    return (
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <Assignment />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Simple Table</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHead={[
                  "#",
                  "Name",
                  "Job Position",
                  "Since",
                  "Salary",
                  "Actions"
                ]}
                tableData={[
                  [
                    "1",
                    "Andrew Mike",
                    "Develop",
                    "2013",
                    "€ 99,225",
                    simpleButtons
                  ],
                  [
                    "2",
                    "John Doe",
                    "Design",
                    "2012",
                    "€ 89,241",
                    simpleButtons
                  ],
                  [
                    "3",
                    "Alex Mike",
                    "Design",
                    "2010",
                    "€ 92,144",
                    simpleButtons
                  ],
                  [
                    "4",
                    "Mike Monday",
                    "Marketing",
                    "2013",
                    "€ 49,990",
                    simpleButtons
                  ],
                  [
                    "5",
                    "Paul Dickens",
                    "Communication",
                    "2015",
                    "€ 69,201",
                    simpleButtons
                  ]
                ]}
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
    );
  }
}
export default withStyles(extendedTablesStyle)(AdminSlides);
