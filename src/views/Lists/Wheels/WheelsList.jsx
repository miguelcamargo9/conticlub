import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";

import wheel1 from "assets/img/llantascontinental/contisportcontact5.png";
import wheel2 from "assets/img/llantascontinental/crosscontactatr.png";
import wheel3 from "assets/img/llantascontinental/crosscontactat50.png";
import wheel4 from "assets/img/llantascontinental/crosscontactuhp.png";
import wheel5 from "assets/img/llantascontinental/grabber_at2.png";
import wheel6 from "assets/img/llantascontinental/altimax_xp7.png";
import wheel7 from "assets/img/llantascontinental/g_max_rs.png";
import wheel8 from "assets/img/llantascontinental/grabber_x3.png";

class WheelsList extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer justify="space-between">
          <GridItem xs={12} sm={2}>
            <h4>Lista de Llantas</h4>
          </GridItem>
        </GridContainer>
        <hr />
        <GridContainer>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card product>
              <CardHeader image>
                <img src={wheel1} alt={wheel1} />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardProductTitle}>
                  ContiSportContact 5
                </h4>
                <p className={classes.cardProductDesciprion}>{"CONTINENTAL"}</p>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card product>
              <CardHeader image>
                <img src={wheel2} alt={wheel2} />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardProductTitle}>CrossContact ATR</h4>
                <p className={classes.cardProductDesciprion}>{"CONTINENTAL"}</p>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card product>
              <CardHeader image>
                <img src={wheel3} alt={wheel3} />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardProductTitle}>
                  TerrainContact AT-50
                </h4>
                <p className={classes.cardProductDesciprion}>{"CONTINENTAL"}</p>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card product>
              <CardHeader image>
                <img src={wheel4} alt={wheel4} />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardProductTitle}>CrossContact UHP</h4>
                <p className={classes.cardProductDesciprion}>{"CONTINENTAL"}</p>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card product>
              <CardHeader image>
                <img src={wheel5} alt={wheel5} />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardProductTitle}>GRABBER AT2</h4>
                <p className={classes.cardProductDesciprion}>
                  {"GENERAL TIRE"}
                </p>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card product>
              <CardHeader image>
                <img src={wheel6} alt={wheel6} />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardProductTitle}>ALTIMAX XP7</h4>
                <p className={classes.cardProductDesciprion}>
                  {"GENERAL TIRE"}
                </p>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card product>
              <CardHeader image>
                <img src={wheel7} alt={wheel7} />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardProductTitle}>G-MAX RS</h4>
                <p className={classes.cardProductDesciprion}>
                  {"GENERAL TIRE"}
                </p>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card product>
              <CardHeader image>
                <img src={wheel8} alt={wheel8} />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardProductTitle}>GRABBER X3</h4>
                <p className={classes.cardProductDesciprion}>
                  {"GENERAL TIRE"}
                </p>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(dashboardStyle)(WheelsList);
