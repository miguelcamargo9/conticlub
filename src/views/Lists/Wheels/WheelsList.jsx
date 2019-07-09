import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";

import wheel1 from "assets/img/llantascontinental/contisportcontact5.png";
import wheel2 from "assets/img/llantascontinental/crosscontactatr.png";
import wheel3 from "assets/img/llantascontinental/crosscontactat50.png";
import wheel4 from "assets/img/llantascontinental/crosscontactuhp.png";

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
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    ContiSportContact 5
                  </a>
                </h4>
                <p className={classes.cardProductDesciprion}>{"Continetal"}</p>
              </CardBody>
              <CardFooter product>
                <div className={classes.price}>
                  <h4>ContiSportContact 5</h4>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card product>
              <CardHeader image>
                <img src={wheel2} alt={wheel2} />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardProductTitle}>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    CrossContact ATR
                  </a>
                </h4>
                <p className={classes.cardProductDesciprion}>{"Continetal"}</p>
              </CardBody>
              <CardFooter product>
                <div className={classes.price}>
                  <h4>CrossContact ATR</h4>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card product>
              <CardHeader image>
                <img src={wheel3} alt={wheel3} />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardProductTitle}>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    TerrainContact AT-50
                  </a>
                </h4>
                <p className={classes.cardProductDesciprion}>{"Continetal"}</p>
              </CardBody>
              <CardFooter product>
                <div className={classes.price}>
                  <h4>TerrainContact AT-50</h4>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card product>
              <CardHeader image>
                <img src={wheel4} alt={wheel4} />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardProductTitle}>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    CrossContact UHP
                  </a>
                </h4>
                <p className={classes.cardProductDesciprion}>{"Continetal"}</p>
              </CardBody>
              <CardFooter product>
                <div className={classes.price}>
                  <h4>CrossContact UHP</h4>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(dashboardStyle)(WheelsList);
