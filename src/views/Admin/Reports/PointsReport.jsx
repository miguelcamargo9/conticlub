import React from "react";

// react component for creating dynamic tables
import ReactTable from "react-table";
import { CSVLink } from "react-csv";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";

import { getInvoiceByUserService } from "../../../services/reportService";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

class PointsReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [], dataCsv: [] };
  }

  componentDidMount() {
    getInvoiceByUserService().then(userInfo => {
      this.setState({ users: userInfo });
    });
  }

  buildDataTable() {
    let data = [];
    if (this.state.users.length > 0) {
      data = this.state.users.map(user => {
        const dataTable = {
          code: user.id,
          name: user.name,
          points: user.points,
          gastados: user.gastados,
          vencidos: user.vencidos,
          apply_aprobado: user.apply_aprobado,
          apply_rechazado: user.apply_rechazado,
          apply_espera: user.apply_espera,
          invoices_count: user.invoices_count,
          subsidiary: user.subsidiary && user.subsidiary.name,
          city: user.subsidiary && user.subsidiary.city.name
        };
        return dataTable;
      });
      return data;
    }
    return data;
  }

  render() {
    const { classes } = this.props;
    const dataTable = this.state.users;
    console.table("ESTO NO ESTA SALIEDNO");
    const csvData = this.buildDataTable();
    const prettyLink = {
      backgroundColor: "#fb8c00",
      height: 20,
      padding: "10px",
      color: "#fff"
    };
    return dataTable.length > 0 ? (
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="warning" icon>
              <CardIcon color="warning">
                <Assignment />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Reporte de puntos</h4>
            </CardHeader>
            <CardBody>
              <GridContainer justify="space-between">
                <GridItem xs={12} sm={10} md={6} />
                <GridItem xs={12} sm={10} md={3}>
                  <span>
                    <CSVLink data={csvData} style={prettyLink}>
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
                noDataText="No hay usuarios"
                data={dataTable}
                filterable
                columns={[
                  {
                    Header: "Id",
                    accessor: "id"
                  },
                  {
                    Header: "Nombre",
                    accessor: "name"
                  },
                  {
                    Header: "Subsidiaria",
                    accessor: "subsidiary.name"
                  },
                  {
                    Header: "Puntos",
                    accessor: "points"
                  },
                  {
                    Header: "Cantidad Facturas",
                    accessor: "invoices_count"
                  },
                  {
                    Header: "Aprobadas",
                    accessor: "apply_aprobado"
                  },
                  {
                    Header: "Rechazadas",
                    accessor: "apply_rechazado"
                  },
                  {
                    Header: "Puntos gastados",
                    accessor: "gastados"
                  },
                  {
                    Header: "Puntos vencidos",
                    accessor: "vencidos"
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
    ) : (
      <div>Loading...</div>
    );
  }
}

export default withStyles(styles)(PointsReport);
