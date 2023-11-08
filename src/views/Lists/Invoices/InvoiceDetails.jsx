import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

// react component for creating dynamic tables
import ReactTable from "react-table";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";

// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import FindInPage from "@material-ui/icons/FindInPage";
import CloudDownload from "@material-ui/icons/CloudDownload";
import RemoveCircle from "@material-ui/icons/RemoveCircle";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Close from "@material-ui/icons/Close";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";

import * as userActions from "../../../actions/userActions";
import {
  getInvoiceDetailsService,
  approveInvoiceService,
  rejectInvoiceService
} from "../../../services/invoiceService";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import { BUCKET_URL } from "../../../constants/server";

// style for this view
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";

const styles = {
  ...validationFormsStyle,
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
        comment: "",
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
          comment: dataInvoice.comment_rejected
            ? dataInvoice.comment_rejected
            : "",
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
          brand: wheel.tire.design.brand.name,
          design: wheel.tire.design.name,
          wheel: wheel.tire.description,
          amount: wheel.amount,
          points: wheel.points
        };
        return dataTable;
      });
      return data;
    }

    return data;
  }

  rejectInvoice() {
    if (this.isValidated()) {
      const { invoice } = this.state;
      const dataInvoice = {
        id: invoice.id,
        comment: invoice.comment ? invoice.comment : null
      };
      rejectInvoiceService(dataInvoice).then(responseRejectInvocie => {
        if (responseRejectInvocie.data.message === "success") {
          this.setState({
            messageError: null,
            successMessage: `Factura Rechazada`
          });
          setTimeout(() => {
            this.props.history.goBack();
          }, 3000);
        } else {
          this.setState({
            messageError: responseRejectInvocie.data.message,
            successMessage: null
          });
        }
      });
    }
  }

  approveInvoice() {
    const { invoice } = this.state;
    const dataInvoice = {
      id: invoice.id
    };
    approveInvoiceService(dataInvoice).then(responseApproveInvocie => {
      if (responseApproveInvocie.data.message === "success") {
        this.setState({
          messageError: null,
          successMessage: `Factura Aprobada`
        });
        setTimeout(() => {
          this.props.history.goBack();
        }, 3000);
      } else {
        this.setState({
          messageError: responseApproveInvocie.data.message,
          successMessage: null
        });
      }
    });
  }

  // function that verifies if a string has a given length or not
  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }

  change(event, stateName, type, stateNameEqualTo) {
    switch (type) {
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      default:
        break;
    }
    const invoice = {
      ...this.state.invoice,
      [stateName]: event.target.value
    };

    this.setState({ invoice });
  }

  isValidated() {
    if (this.state.commentState === "success") {
      return true;
    } else {
      if (this.state.commentState !== "success") {
        this.setState({ commentState: "error" });
      }
    }
    return false;
  }

  render() {
    const { classes, user } = this.props;
    const dataTable = this.buildDataTable();
    const { invoice } = this.state;

    const rejectButton =
      invoice.state === "Creada" &&
      (user.profiles_id === 4 || user.profiles_id === 1) ? (
        <Button
          size="sm"
          onClick={() => this.rejectInvoice()}
          color="danger"
          className="delete"
        >
          <RemoveCircle />
          Rechazar
        </Button>
      ) : (
        ""
      );

    const approveButton =
      invoice.state === "Creada" &&
      (user.profiles_id === 4 || user.profiles_id === 1) ? (
        <Button
          size="sm"
          onClick={() => this.approveInvoice()}
          color="warning"
          className="success"
        >
          <CheckCircle />
          Aprobar
        </Button>
      ) : (
        ""
      );

    const { messageError, successMessage } = this.state;

    const errorDiv = messageError ? (
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <SnackbarContent message={messageError} color="danger" />
        </GridItem>
      </GridContainer>
    ) : (
      ""
    );

    const successDiv = successMessage ? (
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <SnackbarContent message={successMessage} color="success" />
        </GridItem>
      </GridContainer>
    ) : (
      ""
    );

    return (
      <div>
        <GridContainer>
          {errorDiv}
          {successDiv}
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
                  <GridItem xs={12} sm={12} md={2}>
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
                  <GridItem xs={12} sm={12} md={2}>
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
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      success={this.state.commentState === "success"}
                      error={this.state.commentState === "error"}
                      labelText={
                        <span>
                          Comentario <small>(requerido para rechazar)</small>
                        </span>
                      }
                      id="comment"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: invoice.comment,
                        disabled:
                          invoice.state === "Creada" &&
                          (user.profiles_id === 4 || user.profiles_id === 1)
                            ? false
                            : true,
                        onChange: event =>
                          this.change(event, "comment", "length", 3),
                        type: "text",
                        endAdornment:
                          this.state.commentState === "error" ? (
                            <InputAdornment position="end">
                              <Close className={classes.danger} />
                            </InputAdornment>
                          ) : (
                            undefined
                          )
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={5}>
                    <a
                      href={BUCKET_URL + invoice.image}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Button size="sm" color="info" className="edit">
                        <CloudDownload />
                        Descargar Factura
                      </Button>
                    </a>
                    {rejectButton}
                    {approveButton}
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
                <h4 className={classes.cardIconTitle}>Lista de Llantas</h4>
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
                      Header: "Cantidad",
                      accessor: "amount"
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
    invoices: invoices,
    user: state.session.user
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
