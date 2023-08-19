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
  getSubsidiariesService,
  deleteSubsidiaryService
} from "../../../services/subsidiaryService";

import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  ...sweetAlertStyle
};

class ListSubsidiaries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subsidiaries: [],
      alert: null,
      show: false
    };
    this.warningWithConfirmMessage = this.warningWithConfirmMessage.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
  }
  componentDidMount() {
    getSubsidiariesService()
      .then(dataSubsidiaries => {
        this.setState({ subsidiaries: dataSubsidiaries });
      })
      .catch();
  }

  warningWithConfirmMessage(subsidiaryId) {
    this.setState({
      alert: (
        <SweetAlert
          warning
          style={{ display: "block", marginTop: "-200px" }}
          title="Está seguro que desea borrar esta Sucursal?"
          onConfirm={() => this.deleteSubsidiary(subsidiaryId)}
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
          Después de eliminada no podrá recuperar la Información
        </SweetAlert>
      )
    });
  }

  successDelete(subsidiaryId) {
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
          La sucursal con ID: {subsidiaryId} ha sido eliminada.
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

  deleteSubsidiary(subsidiaryId) {
    deleteSubsidiaryService(subsidiaryId)
      .then(subsidiaryInfo => {
        if (subsidiaryInfo.data.message === "success") {
          const subsidiaries = this.state.subsidiaries;
          subsidiaries.find((subsidiary, i) => {
            if (subsidiary.id === subsidiaryId) {
              subsidiaries.splice(i, 1);
              return true;
            }
            return false;
          });
          this.setState({ subsidiaries: subsidiaries });
          this.successDelete(subsidiaryId);
        } else {
          return this.cancelDetele(subsidiaryInfo.data.detail);
        }
      })
      .catch(e => {
        console.log(`Error eliminando sucursal con id: ${subsidiaryId}`, e);
      });
  }

  hideAlert() {
    this.setState({
      alert: null
    });
  }

  buildDataTable() {
    let data = [];
    if (this.state.subsidiaries && this.state.subsidiaries.length > 0) {
      data = this.state.subsidiaries.map((subsidiary, key) => {
        const dataTable = {
          id: subsidiary.id,
          name: subsidiary.name,
          city: subsidiary.city.name,
          profile: subsidiary.profile.name,
          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {/* use this button to add a edit kind of action */}
              <Button
                justIcon
                round
                simple
                onClick={() => {
                  let subsidiarySelect = this.state.subsidiaries.find(
                    findCategory => findCategory.id === subsidiary.id
                  );
                  this.props.history.push(
                    `/admin/edit-subsidiary/${subsidiarySelect.id}`
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
                  this.warningWithConfirmMessage(subsidiary.id);
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
                <h4 className={classes.cardIconTitle}>Lista de Sucursales</h4>
              </CardHeader>
              <CardBody>
                <ReactTable
                  previousText="Atrás"
                  nextText="Siguiente"
                  pageText="Página"
                  ofText="de"
                  rowsText="filas"
                  loadingText="Cargando..."
                  noDataText="No hay sucursales registradas"
                  data={dataTable}
                  filterable
                  columns={[
                    {
                      Header: "ID",
                      accessor: "id"
                    },
                    {
                      Header: "Sucursal",
                      accessor: "name"
                    },
                    {
                      Header: "Ciudad",
                      accessor: "city"
                    },
                    {
                      Header: "Perfil",
                      accessor: "profile"
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

export default withStyles(styles)(ListSubsidiaries);
