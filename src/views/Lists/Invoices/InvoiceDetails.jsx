import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

// react component for creating dynamic tables
import ReactTable from "react-table";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import FindInPage from "@material-ui/icons/FindInPage";
import CloudDownload from "@material-ui/icons/CloudDownload";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

import * as userActions from "../../../actions/userActions";
import { getInvoiceDetailsService } from "../../../services/invoiceService";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import { SERVER_URL } from "../../../constants/server";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

class ConfirmRedeemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invoice: {
        id: "",
        date: "",
        image: "",
        number: "",
        price: "",
        saleDate: "",
        points: "",
        user: "",
        state: "",
        invoiceReferences: []
      }
    };
  }
  componentDidMount() {
    getInvoiceDetailsService(this.props.match.params.id)
      .then(infoInvoice => {
        const dataInvoice = infoInvoice.data;
        const totalPoints = dataInvoice.invoice_references.reduce(
          (acc, invoiceRef) => {
            return acc + parseFloat(invoiceRef.points);
          },
          0
        );
        const invoice = {
          id: dataInvoice.id,
          date: dataInvoice.created_at,
          image: dataInvoice.image,
          number: dataInvoice.number,
          price: dataInvoice.price,
          saleDate: dataInvoice.sale_date,
          user: dataInvoice.user.name,
          points: totalPoints,
          state: dataInvoice.state,
          invoiceReferences: dataInvoice.invoice_references
        };
        this.setState({ invoice });
      })
      .catch(e => console.log(e));
  }

  buildDataTable() {
    let data = [];
    if (this.state.invoice.invoiceReferences.length > 0) {
      data = this.state.invoice.invoiceReferences.map(wheel => {
        const dataTable = {
          id: wheel.id,
          brand: wheel.rin.design.brand.name,
          design: wheel.rin.design.name,
          wheel: wheel.rin.description,
          points: wheel.points
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
    const { invoice } = this.state;

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="warning" icon>
                <CardIcon color="warning">
                  <FindInPage />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Detalle de Factura</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={1}>
                    <CustomInput
                      labelText="Id"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: invoice.id,
                        disabled: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <CustomInput
                      labelText="Total"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: invoice.price,
                        disabled: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={1}>
                    <CustomInput
                      labelText="Puntos"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: invoice.points,
                        disabled: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={1}>
                    <CustomInput
                      labelText="Número"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: invoice.number,
                        disabled: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <CustomInput
                      labelText="Fecha de Registro"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: invoice.date,
                        disabled: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <CustomInput
                      labelText="Fecha de Venta"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: invoice.saleDate,
                        disabled: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={1}>
                    <CustomInput
                      labelText="Estado"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: invoice.state,
                        disabled: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <CustomInput
                      labelText="Usuario"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: invoice.user,
                        disabled: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={1}>
                    <a
                      href={SERVER_URL + invoice.image}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Button size="sm" color="info" className="edit">
                        <CloudDownload />
                        Descargar Factura
                      </Button>
                    </a>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="warning" icon>
                <CardIcon color="warning">
                  <Assignment />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Lista de Rines</h4>
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
                      Header: "Id",
                      accessor: "id"
                    },
                    {
                      Header: "Marca",
                      accessor: "brand"
                    },
                    {
                      Header: "Diseño",
                      accessor: "design"
                    },
                    {
                      Header: "Rin",
                      accessor: "wheel"
                    },
                    {
                      Header: "Puntos",
                      accessor: "points"
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
)(ConfirmRedeemForm);
