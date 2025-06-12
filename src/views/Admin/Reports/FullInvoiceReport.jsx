import React from "react";
import ReactTable from "react-table";
import { CSVLink } from "react-csv";
import withStyles from "@material-ui/core/styles/withStyles";
import Assignment from "@material-ui/icons/Assignment";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import { getFullInvoicesReportService } from "services/reportService";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

class FullInvoiceReport extends React.Component {
  state = {
    data: []
  };

  componentDidMount() {
    getFullInvoicesReportService().then(report => {
      this.setState({ data: Array.isArray(report) ? report : [] });
    });
  }

  render() {
    const { classes } = this.props;
    const { data } = this.state;

    const prettyLink = {
      backgroundColor: "#fb8c00",
      height: 20,
      padding: "10px",
      color: "#fff"
    };

    return data.length > 0 ? (
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="warning" icon>
              <CardIcon color="warning">
                <Assignment />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Reporte de facturas</h4>
            </CardHeader>
            <CardBody>
              <GridContainer justify="space-between">
                <GridItem xs={12} sm={10} md={6} />
                <GridItem xs={12} sm={10} md={3}>
                  <span>
                    <CSVLink data={data} style={prettyLink}>
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
                noDataText="No hay datos"
                data={data}
                filterable
                columns={[
                  {
                    Header: "Punto de venta",
                    accessor: "Punto de venta"
                  },
                  {
                    Header: "Distribuidor",
                    accessor: "Distribuidor"
                  },
                  {
                    Header: "Fecha factura",
                    accessor: "Fecha factura"
                  },
                  {
                    Header: "Número de factura",
                    accessor: "Número de factura"
                  },
                  {
                    Header: "Costo Total",
                    accessor: "Costo Total"
                  },
                  {
                    Header: "Marca",
                    accessor: "Marca"
                  },
                  {
                    Header: "Diseño",
                    accessor: "Diseño"
                  },
                  {
                    Header: "Medida",
                    accessor: "Medida"
                  },
                  {
                    Header: "Cantidad",
                    accessor: "Cantidad"
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

export default withStyles(styles)(FullInvoiceReport);
