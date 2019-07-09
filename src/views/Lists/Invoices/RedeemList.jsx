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

import * as userActions from "../../../actions/userActions";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

class RedeemList extends React.Component {
  componentDidMount() {
    this.props.UserActions.getRedeemList();
  }

  buildDataTable() {
    let data = [];
    if (this.props.redeemList.length > 0) {
      data = this.props.redeemList.map(redeem => {
        const dataTable = {
          id: redeem.id,
          product: redeem.product.name,
          user: redeem.user.name,
          cc: redeem.user.identification_number,
          points: redeem.points,
          userPoints: redeem.user.points,
          createDate: redeem.created_at,
          state: redeem.state,
          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {/* use this button to add a edit kind of action */}
              <Button
                size="sm"
                onClick={() => {
                  console.log("accion");
                  let redeemSelect = this.props.redeemList.find(
                    findRedeem => findRedeem.id === redeem.id
                  );
                  this.props.history.push(
                    `/admin/confirm-redeem/${redeemSelect.id}`
                  );
                }}
                color="warning"
                className="edit"
              >
                Redimir
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
              <h4 className={classes.cardIconTitle}>Lista de Redenciones</h4>
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
                    Header: "ID",
                    accessor: "id"
                  },
                  {
                    Header: "Producto",
                    accessor: "product"
                  },
                  {
                    Header: "Usuario",
                    accessor: "user"
                  },
                  {
                    Header: "# Cédula",
                    accessor: "cc"
                  },
                  {
                    Header: "Puntos",
                    accessor: "points"
                  },
                  {
                    Header: "Puntos Usuario",
                    accessor: "userPoints"
                  },
                  {
                    Header: "Fecha Creación",
                    accessor: "createDate"
                  },
                  {
                    Header: "Estado",
                    accessor: "state"
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
    redeemList: state.user.redeemList
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
)(RedeemList);
