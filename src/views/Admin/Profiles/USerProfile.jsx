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
import ShoppingCart from "@material-ui/icons/ShoppingCart";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import * as userActions from "../../../actions/userActions";
import {
  approveRedeemService,
  rejectRedeemService,
  getRedeemByIdService
} from "../../../services/productRedeemService";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import { SERVER_URL } from "../../../constants/server";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

class USerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redeem: {
        id: "",
        product: "",
        user: "",
        cc: "",
        points: "",
        userPoints: "",
        createDate: "",
        state: ""
      }
    };
  }
  componentDidMount() {
    getRedeemByIdService(this.props.match.params.id)
      .then(infoRedeem => {
        const dataRedeem = infoRedeem.data;
        this.props.UserActions.getInvoiceHistoryByUser(dataRedeem.users_id);
        const redeem = {
          id: dataRedeem.id,
          product: dataRedeem.product.name,
          user: dataRedeem.user.name,
          cc: dataRedeem.user.identification_number,
          points: dataRedeem.points,
          userPoints: dataRedeem.user.points,
          createDate: dataRedeem.created_at,
          state: dataRedeem.state
        };
        this.setState({ redeem });
      })
      .catch(e => console.log(e));
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
        const dataTable = {
          id: index,
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

  approveRedeem() {
    approveRedeemService(this.state.redeem.id).then(responseApproveRedeem => {
      if (responseApproveRedeem.data.message === "success") {
        this.setState({
          messageError: null,
          successMessage: `Aprobado con éxito`
        });
        setTimeout(() => {
          this.props.history.push(`/admin/redeem-list`);
        }, 3000);
      } else {
        this.setState({
          messageError: responseApproveRedeem.data.message,
          successMessage: null
        });
      }
    });
  }

  rejectRedeem() {
    rejectRedeemService(this.state.redeem.id).then(responseApproveRedeem => {
      if (responseApproveRedeem.data.message === "success") {
        this.setState({
          messageError: null,
          successMessage: `Solicitud Rechazada`
        });
        setTimeout(() => {
          this.props.history.push(`/admin/redeem-list`);
        }, 3000);
      } else {
        this.setState({
          messageError: responseApproveRedeem.data.message,
          successMessage: null
        });
      }
    });
  }

  render() {
    const { classes } = this.props;
    const dataTable = this.buildDataTable();
    const { redeem } = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="warning" icon>
                <CardIcon color="warning">
                  <ShoppingCart />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                  Información de solicitud
                </h4>
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
                        value: redeem.id,
                        disabled: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Producto"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: redeem.product,
                        disabled: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Usuario"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: redeem.user,
                        disabled: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <CustomInput
                      labelText="CC"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: redeem.cc,
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
                        value: redeem.points,
                        disabled: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <CustomInput
                      labelText="Puntos Usuario"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: redeem.userPoints,
                        disabled: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <CustomInput
                      labelText="Fecha Creacion"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: redeem.createDate,
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
                        value: redeem.state,
                        disabled: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <Button
                  size="sm"
                  onClick={() => this.approveRedeem()}
                  color="warning"
                  className="edit"
                >
                  Aprobar
                </Button>{" "}
                <Button
                  size="sm"
                  onClick={() => this.rejectRedeem()}
                  color="danger"
                  className="delete"
                >
                  Rechazar
                </Button>{" "}
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
)(USerProfile);
