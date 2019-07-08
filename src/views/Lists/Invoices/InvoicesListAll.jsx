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

import * as invoiceActions from "../../../actions/invoiceActions";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import { SERVER_URL } from "../../../constants/server";

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
        const totalPoints = 0;
        const dataTable = {
          id: index,
          user: invoice.user.name,
          sale_date: invoice.sale_date,
          number: invoice.number,
          price: invoice.price,
          totalPoints: totalPoints,
          image: (
            <a
              href={SERVER_URL + invoice.image}
              rel="noopener noreferrer"
              target="_blank"
            >
              Ver Factura
            </a>
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
                    Header: "Puntos",
                    accessor: "totalPoints"
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
