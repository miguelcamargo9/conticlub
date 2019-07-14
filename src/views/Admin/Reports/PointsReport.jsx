import React from "react";

// react component for creating dynamic tables
import ReactTable from "react-table";

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
    this.state = { users: [] };
  }

  componentDidMount() {
    getInvoiceByUserService().then(userInfo => {
      this.setState({ users: userInfo });
    });
  }

  buildDataTable() {
    let data = [];
    if (this.state.users.length > 0) {
      data = this.state.users.map((user, key) => {
        const dataTable = {
          id: key,
          code: user.id,
          name: user.name
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
