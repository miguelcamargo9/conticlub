import React from "react";

// react component for creating dynamic tables
import ReactTable from "react-table";

// react component used to create sweet alerts
import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import Close from "@material-ui/icons/Close";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "components/CustomButtons/Button.jsx";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";

import {
  getProfiles,
  deleteProfileService
} from "../../../services/profileService";

import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  ...sweetAlertStyle
};

class profilesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { profiles: [], alert: null, show: false };
    this.warningWithConfirmMessage = this.warningWithConfirmMessage.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
  }

  componentDidMount() {
    getProfiles().then(profilesInfo => {
      this.setState({ profiles: profilesInfo.data });
    });
  }

  warningWithConfirmMessage(profileId) {
    this.setState({
      alert: (
        <SweetAlert
          warning
          style={{ display: "block", marginTop: "-200px" }}
          title="Está seguro que desea borrar este perfil?"
          onConfirm={() => this.deleteProfile(profileId)}
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

  successDelete(profileId) {
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
          El Perfil con ID: {profileId} ha sido eliminado.
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

  deleteProfile(profileId) {
    deleteProfileService(profileId)
      .then(profileInfo => {
        if (profileInfo.data.message === "success") {
          const profiles = this.state.profiles;
          profiles.find((profile, i) => {
            if (profile.id === profileId) {
              profiles.splice(i, 1);
              return true;
            }
            return false;
          });
          this.setState({ profiles: profiles });
          this.successDelete(profileId);
        } else {
          return this.cancelDetele(profileInfo.data.detail);
        }
      })
      .catch(e => {
        console.log("Error eliminado perfil id: profileId");
      });
  }

  hideAlert() {
    this.setState({
      alert: null
    });
  }

  buildDataTable() {
    let data = [];
    if (this.state.profiles.length > 0) {
      data = this.state.profiles.map((profile, key) => {
        const dataTable = {
          id: key,
          code: profile.id,
          name: profile.name,
          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {/* use this button to add a edit kind of action */}
              <Button
                justIcon
                round
                simple
                onClick={() => {
                  let profileSelect = this.state.profiles.find(
                    findProfile => findProfile.id === profile.id
                  );
                  this.props.history.push(
                    `/admin/edit-profile/${profileSelect.id}`
                  );
                }}
                color="warning"
                className="edit"
              >
                <Dvr />
              </Button>{" "}
              {/* use this button to remove the data row */}
              <Button
                justIcon
                round
                simple
                onClick={() => {
                  this.warningWithConfirmMessage(profile.id);
                }}
                color="danger"
                className="remove"
              >
                <Close />
              </Button>{" "}
            </div>
          )
        };
        return dataTable;
      });
      return data;
    }
    return data;
  }

  render() {
    const { classes } = this.props;
    const dataTable = this.buildDataTable();
    return (
      <div>
        {this.state.alert}
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="warning" icon>
                <CardIcon color="warning">
                  <Assignment />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Lista de Perfiles</h4>
              </CardHeader>
              <CardBody>
                <ReactTable
                  previousText="Atrás"
                  nextText="Siguiente"
                  pageText="Página"
                  ofText="de"
                  rowsText="filas"
                  loadingText="Cargando..."
                  noDataText="No hay perfiles"
                  data={dataTable}
                  filterable
                  columns={[
                    {
                      Header: "Id",
                      accessor: "code"
                    },
                    {
                      Header: "Nombre",
                      accessor: "name"
                    },
                    {
                      Header: "Acciones",
                      accessor: "actions",
                      sortable: false,
                      filterable: false
                    }
                  ]}
                  defaultPageSize={10}
                  showPaginationTop
                  showPaginationBottom={false}
                  className="-striped -highlight"
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(profilesList);
