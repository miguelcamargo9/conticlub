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
    sessionService
      .loadUser()
      .then(user => {
        this.props.UserActions.getRedeemListByUserId(user.id);
        this.setState({ userId: user.id });
      })
      .catch(err => console.log(err));
  }

  buildDataTable() {
    let data = [];
    if (this.props.redeemList.length > 0) {
      data = this.props.redeemList.map(redeem => {
        const comment = redeem.comment
          ? redeem.buyer_comment
            ? `${redeem.comment}, ${redeem.buyer_comment}`
            : redeem.comment
          : redeem.buyer_comment
          ? redeem.buyer_comment
          : "";
        const dataTable = {
          id: redeem.id,
          product: redeem.product.name,
          user: redeem.user.name,
          points: redeem.points,
          createDate: redeem.created_at,
          comment: comment,
          state: this.capitalize(redeem.state)
        };
        return dataTable;
      });
      return data;
    }

    return data;
  }

  capitalize(s) {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
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
                noDataText="No ha solicitado redenciones"
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
                    Header: "Puntos",
                    accessor: "points"
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
                    Header: "Comentarios",
                    accessor: "comment",
                    sortable: false
                  }
                ]}
                defaultSorted={[
                  {
                    id: "createDate",
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
