import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { CSVLink } from "react-csv";

// react component for creating dynamic tables
import ReactTable from "react-table";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";

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
          profile: user.profile.name,
          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {/* use this button to add a edit kind of action */}
              <Button
                justIcon
                round
                simple
                onClick={() => {
                  this.props.history.push(`/admin/edit-users/${user.id}`);
                }}
                color="warning"
                className="edit"
              >
                <Dvr />
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
    const csvData = dataTable;
    const prettyLink = {
      backgroundColor: "#fb8c00",
      height: 20,
      padding: "10px",
      color: "#fff"
    };
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
              <GridContainer justify="space-between">
                <GridItem xs={12} sm={10} md={6} />
                <GridItem xs={12} sm={10} md={3}>
                  <span>
                    <CSVLink data={csvData} style={prettyLink}>
                      Exportar a CSV
                    </CSVLink>
                  </span>
                </GridItem>
              </GridContainer>
            </CardBody>
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
