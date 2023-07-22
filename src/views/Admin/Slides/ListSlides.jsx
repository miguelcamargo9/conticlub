import React from "react";

// react component used to create sweet alerts
import SweetAlert from "react-bootstrap-sweetalert";

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
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";

// material-ui icons
import Assignment from "@material-ui/icons/Assignment";
import Remove from "@material-ui/icons/Remove";

// utils
import { BUCKET_URL } from "../../../constants/server";

import {
  getSlideService,
  deleteSlideService
} from "../../../services/slideService";

const styles = {
  ...extendedTablesStyle,
  ...sweetAlertStyle
};

class ListSlides extends React.Component {
  constructor(props) {
    super(props);
    this.state = { slides: [], alert: null, show: false };
    this.warningWithConfirmMessage = this.warningWithConfirmMessage.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
  }
  componentDidMount() {
    getSlideService().then(slidesInfo => {
      this.setState({ slides: slidesInfo.data });
    });
  }

  warningWithConfirmMessage(slideId) {
    this.setState({
      alert: (
        <SweetAlert
          warning
          style={{ display: "block", marginTop: "-200px" }}
          title="Esta seguro que desea borrar este slide?"
          onConfirm={() => this.deleteSlide(slideId)}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
          cancelBtnCssClass={
            this.props.classes.button + " " + this.props.classes.danger
          }
          confirmBtnText="Sí, borrar!"
          cancelBtnText="Cancelar"
          showCancel
        >
          Después de que se borre no podrá recuperar la Información
        </SweetAlert>
      )
    });
  }

  successDelete(slideId) {
    this.setState({
      alert: (
        <SweetAlert
          success
          style={{ display: "block", marginTop: "-200px" }}
          title="Eliminado!"
          onConfirm={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
        >
          El Slide con ID: {slideId} ha sido eliminado.
        </SweetAlert>
      )
    });
  }

  cancelDetele(text) {
    this.setState({
      alert: (
        <SweetAlert
          danger
          style={{ display: "block", marginTop: "-200px" }}
          title="Cancelled"
          onConfirm={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
        >
          {text}
        </SweetAlert>
      )
    });
  }

  deleteSlide(slideId) {
    deleteSlideService(slideId)
      .then(slideInfo => {
        if (slideInfo.data.message === "success") {
          const slides = this.state.slides;
          slides.find((slide, i) => {
            if (slide.id === slideId) {
              slides.splice(i, 1);
              return true;
            }
            return false;
          });
          this.setState({ slides: slides });
          this.successDelete(slideId);
        } else {
          return this.cancelDetele(slideInfo.data.detail);
        }
      })
      .catch(e => {
        console.log(`Error eliminado slide id: ${slideId}`);
      });
  }

  hideAlert() {
    this.setState({
      alert: null
    });
  }

  render() {
    const { classes } = this.props;

    const tableData = this.buildTableData();

    return this.state.slides.length > 0 ? (
      <div>
        {this.state.alert}
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="warning" icon>
                <CardIcon color="warning">
                  <Assignment />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Lista diapositivas</h4>
              </CardHeader>
              <CardBody>
                <Table
                  tableHead={[
                    "#",
                    "Imágen",
                    "Ruta",
                    "Posición",
                    "Índice",
                    "Mostrar",
                    "Responsive",
                    "Opciones"
                  ]}
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
      </div>
    ) : (
      <div>Loading...</div>
    );
  }

  buildTableData() {
    const { slides } = this.state;
    let tableData = [];

    if (slides.length > 0) {
      tableData = slides.map(slide => {
        const path = BUCKET_URL + slide.path;
        const imgElement = (
          <img src={path} width="150px" height="80px" alt="imagenes slides" />
        );
        const show = slide.show ? "Sí" : "No";
        const responsive = slide.responsive ? "Sí" : "No";
        return [
          slide.id,
          imgElement,
          slide.path,
          slide.position,
          slide.order,
          show,
          responsive,
          // we've added some custom button actions
          <div className="actions-right">
            {/* use this button to remove the data row */}
            <Button
              justIcon
              round
              simple
              onClick={() => {
                this.warningWithConfirmMessage(slide.id);
              }}
              color="danger"
              className="remove"
            >
              <Remove />
            </Button>{" "}
          </div>
        ];
      });

      return tableData;
    }
  }
}

export default withStyles(styles)(ListSlides);
