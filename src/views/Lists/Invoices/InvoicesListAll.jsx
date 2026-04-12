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
import CustomInput from "components/CustomInput/CustomInput.jsx";

import * as invoiceActions from "../../../actions/invoiceActions";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import { BUCKET_URL } from "../../../constants/server";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
    gap: "10px"
  }
};

class InvoicesListAll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      searchTimeout: null
    };
  }

  componentDidMount() {
    const { pagination } = this.props;
    this.props.InvoiceActions.getInvoiceHistory(
      pagination.currentPage,
      pagination.perPage
    );
  }

  handlePageChange(pageIndex) {
    const { pagination } = this.props;
    this.props.InvoiceActions.getInvoiceHistory(
      pageIndex + 1,
      pagination.perPage,
      this.state.search
    );
  }

  handlePageSizeChange(pageSize) {
    this.props.InvoiceActions.getInvoiceHistory(
      1,
      pageSize,
      this.state.search
    );
  }

  handleSearchChange(e) {
    const value = e.target.value;
    if (this.state.searchTimeout) {
      clearTimeout(this.state.searchTimeout);
    }
    const timeout = setTimeout(() => {
      this.props.InvoiceActions.getInvoiceHistory(
        1,
        this.props.pagination.perPage,
        value
      );
    }, 500);
    this.setState({ search: value, searchTimeout: timeout });
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
            <div className="actions-left">
              <Button
                size="sm"
                onClick={() => {
                  this.props.history.push(
                    `/admin/invoice-details/${invoice.id}`
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
    const { classes, pagination, loading } = this.props;
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
              <div className={classes.searchContainer}>
                <CustomInput
                  formControlProps={{
                    style: { margin: 0, paddingTop: 0 }
                  }}
                  inputProps={{
                    placeholder: "Buscar por nombre, # factura o estado...",
                    value: this.state.search,
                    onChange: e => this.handleSearchChange(e),
                    style: { width: "350px" }
                  }}
                />
                {pagination.total > 0 && (
                  <span style={{ color: "#999", fontSize: "13px" }}>
                    {pagination.total} resultados
                  </span>
                )}
              </div>
              <ReactTable
                manual
                pages={pagination.lastPage}
                page={pagination.currentPage - 1}
                onPageChange={pageIndex => this.handlePageChange(pageIndex)}
                onPageSizeChange={pageSize =>
                  this.handlePageSizeChange(pageSize)
                }
                loading={loading}
                previousText="Atr&aacute;s"
                nextText="Siguiente"
                pageText="P&aacute;gina"
                ofText="de"
                rowsText="filas"
                loadingText="Cargando..."
                noDataText="No ha ingresado ventas"
                data={dataTable}
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
                defaultPageSize={15}
                pageSizeOptions={[15, 30, 50, 100]}
                getTrProps={(state, rowInfo) => {
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
    invoices: state.invoice.invoices,
    pagination: state.invoice.pagination,
    loading: state.invoice.loading
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
