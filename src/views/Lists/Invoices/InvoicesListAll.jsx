import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

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

import * as invoiceActions from "../../../actions/invoiceActions";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import { BUCKET_URL } from "../../../constants/server";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

class InvoicesListAll extends React.Component {
  componentDidMount() {
    this.props.InvoiceActions.getInvoiceHistory();
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
          user: invoice.user.name,
          sale_date: invoice.sale_date,
          number: invoice.number,
          price: invoice.price,
          state: invoice.state,
          totalPointsUsed: totalPointsUsed,
          register_date: invoice.created_at,
          totalUsed: totalPoints - totalPointsUsed,
          totalPoints: totalPoints,
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
                    Header: "Usuario",
                    accessor: "user"
                  },
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
                    accessor: "state"
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
                defaultPageSize={10}
                defaultSorted={[
                  {
                    id: "register_date",
                    desc: true
                  }
                ]}
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
  return {
    invoices: state.invoice.invoices
  };
}

function mapDispatchToProps(dispatch) {
  return {
    InvoiceActions: bindActionCreators(invoiceActions, dispatch)
  };
}

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(InvoicesListAll);
