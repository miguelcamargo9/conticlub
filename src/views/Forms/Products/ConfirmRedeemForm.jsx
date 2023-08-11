import React from "react";
import Datetime from "react-datetime";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

// react component for creating dynamic tables
import ReactTable from "react-table";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Close from "@material-ui/icons/Close";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";

import * as userActions from "../../../actions/userActions";
import {
  approveRedeemService,
  rejectRedeemService,
  getRedeemByIdService,
  confirmRedeemService
} from "../../../services/productRedeemService";

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
      redeem: {
        id: "",
        product: "",
        user: "",
        cc: "",
        points: "",
        userPoints: "",
        createDate: "",
        comment: "",
        buyerComment: "",
        purchaseDate: "",
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
          comment: dataRedeem.comment ? dataRedeem.comment : "",
          buyerComment: dataRedeem.buyer_comment
            ? dataRedeem.buyer_comment
            : "",
          purchaseDate: dataRedeem.purchase_date,
          state: this.capitalize(dataRedeem.state)
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
        const totalPointsUsed = invoice.points.reduce((acc, points) => {
          return acc + parseFloat(points.points);
        }, 0);
        const dataTable = {
          id: index,
          sale_date: invoice.sale_date,
          number: invoice.number,
          price: invoice.price,
          totalPoints: totalPoints,
          state: invoice.state,
          register_date: invoice.created_at,
          totalPointsUsed: totalPointsUsed,
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

  approveRedeem() {
    const { redeem } = this.state;
    const dataRedeem = {
      id: redeem.id,
      comment: redeem.comment ? redeem.comment : null
    };
    approveRedeemService(dataRedeem).then(responseApproveRedeem => {
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
          messageError: responseApproveRedeem.data.detail,
          successMessage: null
        });
      }
    });
  }

  confirmRedeem() {
    if (this.isValidatedConfirm()) {
      const { redeem, date } = this.state;
      const dataRedeem = {
        id: redeem.id,
        comment: redeem.buyerComment ? redeem.buyerComment : null,
        purchaseDate: date
      };
      console.log("data enviada", dataRedeem);
      confirmRedeemService(dataRedeem).then(responseApproveRedeem => {
        if (responseApproveRedeem.data.message === "success") {
          this.setState({
            messageError: null,
            successMessage: `Confirmado con éxito`
          });
          setTimeout(() => {
            this.props.history.push(`/admin/redeem-list`);
          }, 3000);
        } else {
          this.setState({
            messageError: responseApproveRedeem.data.detail,
            successMessage: null
          });
        }
      });
    }
  }

  rejectRedeem() {
    if (this.isValidated()) {
      const { redeem } = this.state;
      const dataRedeem = {
        id: redeem.id,
        comment: redeem.comment ? redeem.comment : null
      };
      rejectRedeemService(dataRedeem).then(responseApproveRedeem => {
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
            messageError: responseApproveRedeem.data.detail,
            successMessage: null
          });
        }
      });
    }
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
    const redeem = {
      ...this.state.redeem,
      [stateName]: event.target.value
    };

    this.setState({ redeem });
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

  isValidatedConfirm() {
    if (
      this.state.dateState === "success" &&
      this.state.buyerCommentState === "success"
    ) {
      return true;
    } else {
      if (this.state.dateState !== "success") {
        this.setState({ dateState: "error" });
      }
      if (this.state.buyerCommentState !== "success") {
        this.setState({ buyerCommentState: "error" });
      }
    }
    return false;
  }

  capitalize(s) {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  // Let's use the static moment reference in the Datetime component
  validDate(current) {
    const yesterday = Datetime.moment("20190301");
    return current.isAfter(yesterday);
  }

  handleChangeDate = date => {
    if (date._d !== undefined) {
      const selectDate = date._d.toISOString().substr(0, 10);
      this.setState({ date: selectDate, dateState: "success" });
    } else {
      this.setState({ date: null, dateState: "error" });
    }
  };

  render() {
    const { classes, user } = this.props;
    const dataTable = this.buildDataTable();
    const { messageError, successMessage, redeem } = this.state;

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

    const buttons =
      redeem.state === "Espera" && user.profiles_id === 4 ? (
        <React.Fragment>
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
        </React.Fragment>
      ) : redeem.state === "Aprobado" && user.profiles_id === 5 ? (
        <Button
          size="sm"
          onClick={() => this.confirmRedeem()}
          color="warning"
          className="edit"
        >
          Confirmar Compra
        </Button>
      ) : (
        ""
      );

    const inputDate =
      redeem.state === "Aprobado" && user.profiles_id === 5 ? (
        <GridItem xs={12} sm={4}>
          <InputLabel className={classes.label}>
            Fecha de Confirmación (requerido para confirmar)
          </InputLabel>
          <br />
          <FormControl fullWidth>
            <Datetime
              timeFormat={false}
              inputProps={{
                placeholder: "Fecha de Confirmación",
                readOnly: true
              }}
              onChange={this.handleChangeDate}
              closeOnSelect
              isValidDate={this.validDate}
            />
          </FormControl>
          <br />
          <br />
          {this.state.dateState === "error" ? (
            <InputAdornment position="end" className={classes.danger}>
              Seleccione Una Fecha
              <Close />
            </InputAdornment>
          ) : (
            ""
          )}
        </GridItem>
      ) : (
        <GridItem xs={12} sm={12} md={3}>
          <CustomInput
            labelText="Fecha de Confirmación"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              value: redeem.purchaseDate,
              disabled: true
            }}
          />
        </GridItem>
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
                  <GridItem xs={12} sm={12} md={2}>
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
                  <GridItem xs={12} sm={12} md={5}>
                    <CustomInput
                      success={this.state.commentState === "success"}
                      error={this.state.commentState === "error"}
                      labelText={
                        <span>
                          Comentario Aprobador
                          <small> (requerido para rechazar)</small>
                        </span>
                      }
                      id="comment"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: redeem.comment,
                        disabled:
                          redeem.state === "Espera" && user.profiles_id === 4
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
                  <GridItem xs={12} sm={12} md={5}>
                    <CustomInput
                      success={this.state.buyerCommentState === "success"}
                      error={this.state.buyerCommentState === "error"}
                      labelText={
                        <span>
                          Comentario Comprador
                          <small> (requerido para confirmar)</small>
                        </span>
                      }
                      id="buyerComment"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: redeem.buyerComment,
                        disabled:
                          redeem.state === "Aprobado" && user.profiles_id === 5
                            ? false
                            : true,
                        onChange: event =>
                          this.change(event, "buyerComment", "length", 3),
                        type: "text",
                        endAdornment:
                          this.state.buyerCommentState === "error" ? (
                            <InputAdornment position="end">
                              <Close className={classes.danger} />
                            </InputAdornment>
                          ) : (
                            undefined
                          )
                      }}
                    />
                  </GridItem>
                  {inputDate}
                </GridContainer>
                {buttons}
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
                  showPaginationTop
                  showPaginationBottom={false}
                  defaultSorted={[
                    {
                      id: "register_date",
                      desc: true
                    }
                  ]}
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
