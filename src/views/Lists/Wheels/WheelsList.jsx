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

import { BUCKET_URL } from "../../../constants/server";

class WheelsList extends React.Component {
  wheels = [
    {
      src: `${BUCKET_URL}/files/assets/img/llantascontinental/contisportcontact5.png`,
      title: "ContiSportContact 5",
      brand: "CONTINENTAL"
    },
    {
      src: `${BUCKET_URL}/files/assets/img/llantascontinental/crosscontactatr.png`,
      title: "CrossContact ATR",
      brand: "CONTINENTAL"
    },
    {
      src: `${BUCKET_URL}/files/assets/img/llantascontinental/crosscontactat50.png`,
      title: "TerrainContact AT-50",
      brand: "CONTINENTAL"
    },
    {
      src: `${BUCKET_URL}/files/assets/img/llantascontinental/continental_premium_contact_6_fixed.png`,
      title: "Premium Contact 6",
      brand: "CONTINENTAL"
    },
    {
      src: `${BUCKET_URL}/files/assets/img/llantascontinental/grabberATX_bsw_fixed.png`,
      title: "Grabber A/Tx",
      brand: "GENERAL TIRE"
    },
    {
      src: `${BUCKET_URL}/files/assets/img/llantascontinental/altimax_xp7_fixed.png`,
      title: "ALTIMAX XP7",
      brand: "GENERAL TIRE"
    },
    {
      src: `${BUCKET_URL}/files/assets/img/llantascontinental/g_max_rs.png`,
      title: "G-MAX RS",
      brand: "GENERAL TIRE"
    },
    {
      src: `${BUCKET_URL}/files/assets/img/llantascontinental/general_tire_grabber_GT_plus_fixed.png`,
      title: "Grabber GT+",
      brand: "GENERAL TIRE"
    }
  ];
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
          {this.wheels.map((wheel, index) => (
            <GridItem key={index} xs={12} sm={6} md={6} lg={3}>
              <Card product>
                <CardHeader image>
                  <img src={wheel.src} alt={wheel.title} />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardProductTitle}>{wheel.title}</h4>
                  <p className={classes.cardProductDesciprion}>{wheel.brand}</p>
                </CardBody>
              </Card>
            </GridItem>
          ))}
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(dashboardStyle)(WheelsList);
