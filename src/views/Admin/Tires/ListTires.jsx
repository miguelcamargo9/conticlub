import React from "react";
import { withRouter } from "react-router-dom";

// react component for creating dynamic tables
import ReactTable from "react-table";
import { CSVLink } from "react-csv";

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
  getTiresService,
  deleteTireService,
  getTiresByDesigndId
} from "../../../services/tireService";

import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  ...sweetAlertStyle
};

class ListTires extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tires: [],
      alert: null,
      show: false,
      profiles: []
    };
    this.warningWithConfirmMessage = this.warningWithConfirmMessage.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
  }
  componentDidMount() {
    if (this.props.designId) {
      getTiresByDesigndId(this.props.designId)
        .then(dataTires => {
          this.setState({ tires: dataTires.data.tires });
          this.setState({ profiles: dataTires.data.profiles });
        })
        .catch();
    } else {
      getTiresService()
        .then(dataTires => {
          this.setState({ tires: dataTires.data.tires });
          this.setState({ profiles: dataTires.data.profiles });
        })
        .catch();
    }
  }

  warningWithConfirmMessage(tireId) {
    this.setState({
      alert: (
        <SweetAlert
          warning
          style={{ display: "block", marginTop: "-200px" }}
          title="Está seguro que desea borrar esta Llanta?"
          onConfirm={() => this.deleteTire(tireId)}
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

  successDelete(tireId) {
    this.setState({
      alert: (
        <SweetAlert
          success
          style={{ display: "block", marginTop: "-200px" }}
          title="Eliminada!"
          onConfirm={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
        >
          La llanta con ID: {tireId} ha sido eliminada.
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

  deleteTire(tireId) {
    deleteTireService(tireId)
      .then(tireInfo => {
        if (tireInfo.data.message === "success") {
          const tires = this.state.tires;
          tires.find((tire, i) => {
            if (tire.id === tireId) {
              tires.splice(i, 1);
              return true;
            }
            return false;
          });
          this.setState({ tires: tires });
          this.successDelete(tireId);
        } else {
          return this.cancelDetele(tireInfo.data.detail);
        }
      })
      .catch(e => {
        console.log(`Error eliminando llanta con id: ${tireId}`, e);
      });
  }

  hideAlert() {
    this.setState({
      alert: null
    });
  }

  buildDataTable() {
    let data = [];
    if (this.state.tires && this.state.tires.length > 0) {
      data = this.state.tires.map(tire => {
        let dataTable = {
          id: tire.id,
          name: tire.name,
          code: tire.tire_code,
          desc: tire.description,
          design: tire.design.name,
          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {/* use this button to add a edit kind of action */}
              <Button
                justIcon
                round
                simple
                onClick={() => {
                  let tireSelect = this.state.tires.find(
                    findTire => findTire.id === tire.id
                  );
                  this.props.history.push(`/admin/edit-tire/${tireSelect.id}`);
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
                  this.warningWithConfirmMessage(tire.id);
                }}
                color="danger"
                className="remove"
              >
                <Close />
              </Button>{" "}
            </div>
          )
        };
        tire.tire_points_by_profile.map(tpbp => {
          if (tpbp && tpbp.profile !== null) {
            dataTable[tpbp.profile.name] = tpbp.total_points;
          }
        });

        return dataTable;
      });
      return data;
    }
    return data;
  }

  buildDataExcel() {
    let data = [];
    if (this.state.tires && this.state.tires.length > 0) {
      data = this.state.tires.map(tire => {
        let dataTable = {
          id: tire.id,
          name: tire.name,
          code: tire.tire_code,
          desc: tire.description,
          design: tire.design.name
        };
        tire.tire_points_by_profile.map(tpbp => {
          if (tpbp && tpbp.profile !== null) {
            dataTable[`${tpbp.profile.name}_points_general`] =
              tpbp.points_general;
            dataTable[`${tpbp.profile.name}_points_uhp`] = tpbp.points_uhp;
            dataTable[`${tpbp.profile.name}`] = tpbp.total_points;
          }
        });

        return dataTable;
      });
      return data;
    }
    return data;
  }

  buildHeadTableProfiles() {
    var data = [];
    if (this.state.profiles && this.state.profiles.length > 0) {
      this.state.profiles.map(profile => {
        data.push({
          Header: profile.name.toUpperCase(),
          accessor: profile.name
        });
      });
    }
    return data;
  }
  buildHeadExcelProfiles() {
    var data = [];
    if (this.state.profiles && this.state.profiles.length > 0) {
      this.state.profiles.map(profile => {
        data.push(
          {
            Header: `${profile.name.toUpperCase()}_points_general`,
            accessor: `${profile.name}_points_general`
          },
          {
            Header: `${profile.name.toUpperCase()}_points_uhp`,
            accessor: `${profile.name}_points_uhp`
          },
          {
            Header: `${profile.name.toUpperCase()}`,
            accessor: `${profile.name}`
          }
        );
      });
    }
    return data;
  }
  render() {
    const { classes } = this.props;
    const dataTable = this.buildDataTable();
    const dataExcel = this.buildDataExcel();
    const columns = [
      {
        Header: "ID",
        accessor: "id"
      },
      {
        Header: "Llanta",
        accessor: "name"
      },
      {
        Header: "Código",
        accessor: "code"
      },
      {
        Header: "Descripción",
        accessor: "desc"
      },
      {
        Header: "Diseño",
        accessor: "design"
      }
    ];
    const headTableProfiles = this.buildHeadTableProfiles().concat([
      {
        Header: "Acciones",
        accessor: "actions",
        sortable: false,
        filterable: false
      }
    ]);
    const totalColumns = columns.concat(headTableProfiles);
    const headExcel = columns.concat(this.buildHeadExcelProfiles());
    const prettyLink = {
      backgroundColor: "#fb8c00",
      height: 20,
      padding: "10px",
      color: "#fff"
    };
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
                <h4 className={classes.cardIconTitle}>Lista de Llantas</h4>
              </CardHeader>
              <CardBody>
                <GridContainer justify="space-between">
                  <GridItem xs={12} sm={10} md={6} />
                  <GridItem xs={12} sm={10} md={3}>
                    <span>
                      <CSVLink
                        columns={headExcel}
                        data={dataExcel}
                        style={prettyLink}
                        filename={"llantas.csv"}
                      >
                        Exportar a CSV
                      </CSVLink>
                    </span>
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardBody>
                <ReactTable
                  previousText="Atrás"
                  nextText="Siguiente"
                  pageText="Página"
                  ofText="de"
                  rowsText="filas"
                  loadingText="Cargando..."
                  noDataText="No hay llantas registrados"
                  data={dataTable}
                  filterable
                  columns={totalColumns}
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

export default withRouter(withStyles(styles)(ListTires));
