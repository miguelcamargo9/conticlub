import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { sessionService } from "redux-react-session";

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
import Button from "components/CustomButtons/Button.jsx";

import * as userActions from "../../../actions/userActions";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import { BUCKET_URL } from "../../../constants/server";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

class InvoicesList extends React.Component {
  componentDidMount() {
    sessionService
      .loadUser()
      .then(user => {
        this.props.UserActions.getInvoiceHistoryByUser(user.id);
        this.setState({ userId: user.id });
      })
      .catch(err => console.log(err));
  }

  buildDataTable() {
    let data = [];
    if (this.props.invoices.length > 0) {
      data = this.props.invoices.map((invoice, index) => {
        const totalPoints = invoice.invoice_references.reduce(
          (acc, invoiceRef) => {
            return acc + parseFloat(invoiceRef.points);
          },
          0
        );
        const totalPointsUsed = invoice.points.reduce((acc, points) => {
          return acc + parseFloat(points.points);
        }, 0);
        const dataTable = {
          id: index,
          sale_date: invoice.sale_date,
          number: invoice.number,
          price: invoice.price,
          state: invoice.state,
          totalPoints: totalPoints,
          totalPointsUsed: totalPointsUsed,
          register_date: invoice.created_at,
          totalUsed: totalPoints - totalPointsUsed,
          image: (
            <a
              href={BUCKET_URL + invoice.image}
              rel="noopener noreferrer"
              target="_blank"
            >
              Ver Factura
            </a>
          ),
          actions: (
            // we've added some custom button actions
            <div className="actions-left">
              {/* use this button to add a edit kind of action */}
              <Button
                size="sm"
                onClick={() => {
                  let invoiceSelect = this.props.invoices.find(
                    findInvoice => findInvoice.id === invoice.id
                  );
                  this.props.history.push(
                    `/admin/invoice-details/${invoiceSelect.id}`
                  );
                }}
                color="warning"
                className="edit"
              >
                Detalles
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
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning" icon>
              <CardIcon color="warning">
                <Assignment />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Lista de Ventas</h4>
            </CardHeader>
            <CardBody>
              <ReactTable
                previousText="Atrás"
                nextText="Siguiente"
                pageText="Página"
                ofText="de"
                rowsText="filas"
                loadingText="Cargando..."
                noDataText="No ha ingresado ventas"
                data={dataTable}
                filterable
                getTrProps={(state, rowInfo, column) => {
                  return {
                    style: {
                      textDecorationLine:
                        rowInfo && rowInfo.row.state === "Rechazada"
                          ? "line-through"
                          : "",
                      color:
                        rowInfo && rowInfo.row.state === "Rechazada"
                          ? "red"
                          : null
                    }
                  };
                }}
                columns={[
                  {
                    Header: "Fecha",
                    accessor: "sale_date"
                  },
                  {
                    Header: "# Factura",
                    accessor: "number"
                  },
                  {
                    Header: "Total",
                    accessor: "price"
                  },
                  {
                    Header: "Puntos Obtenidos",
                    accessor: "totalPoints"
                  },
                  {
                    Header: "Puntos Usados",
                    accessor: "totalUsed"
                  },
                  {
                    Header: "Puntos Restantes",
                    accessor: "totalPointsUsed"
                  },
                  {
                    Header: "Fecha de Registro",
                    accessor: "register_date"
                  },
                  {
                    Header: "Estado",
                    accessor: "state",
                    color: "danger"
                  },
                  {
                    Header: "Imagen",
                    accessor: "image"
                  },
                  {
                    Header: "Acciones",
                    accessor: "actions",
                    sortable: false,
                    filterable: false
                  }
                ]}
                defaultSorted={[
                  {
                    id: "register_date",
                    desc: true
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
    );
  }
}

function mapStateToProps(state) {
  const invoices =
    state.user.invoices.invoices !== undefined
      ? state.user.invoices.invoices
      : state.user.invoices;
  return {
    invoices: invoices
  };
}

function mapDispatchToProps(dispatch) {
  return {
    UserActions: bindActionCreators(userActions, dispatch)
  };
}

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(InvoicesList);
