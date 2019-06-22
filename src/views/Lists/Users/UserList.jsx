import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import compose from "recompose/compose";

// react component for creating dynamic tables
import ReactTable from "react-table";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import { dataTable } from "variables/general.jsx";
import * as userActions from "../../../actions/userActions";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

class UserList extends React.Component {
  componentDidMount() {
    this.props.UserActions.getUsersAction();
  }

  buildDataTable() {
    let data = [];
    if (this.props.users.length > 0) {
      data = this.props.users.map((user, index) => {
        const dataTable = {
          id: index,
          name: user.name,
          identification_number: user.identification_number,
          identification_type: user.identification_type,
          email: user.email,
          phone: user.phone,
          points: user.points,
          profile: user.profile.name
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
        <GridItem xs={12}>
          <Card>
            <CardHeader color="warning" icon>
              <CardIcon color="warning">
                <Assignment />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Lista de Usuarios</h4>
            </CardHeader>
            <CardBody>
              <ReactTable
                previousText="Atrás"
                nextText="Siguiente"
                pageText="Página"
                ofText="de"
                rowsText="filas"
                loadingText="Cargando..."
                noDataText="No hay usuarios"
                data={dataTable}
                filterable
                columns={[
                  {
                    Header: "Nombre",
                    accessor: "name"
                  },
                  {
                    Header: "Documento",
                    accessor: "identification_number"
                  },
                  {
                    Header: "Tipo Doc.",
                    accessor: "identification_type"
                  },
                  {
                    Header: "Correo",
                    accessor: "email"
                  },
                  {
                    Header: "Teléfono",
                    accessor: "phone"
                  },
                  {
                    Header: "Puntos",
                    accessor: "points"
                  },
                  {
                    Header: "Perfil",
                    accessor: "profile"
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
    users: state.user.users
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
)(UserList);
