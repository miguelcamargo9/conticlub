import React from "react";

// react component for creating dynamic tables
import ReactTable from "react-table";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import Close from "@material-ui/icons/Close";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "components/CustomButtons/Button.jsx";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";

import { getProfiles } from "../../../services/profileService";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

class profilesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { profiles: [] };
  }

  componentDidMount() {
    getProfiles().then(profilesInfo => {
      this.setState({ profiles: profilesInfo.data });
    });
  }

  buildDataTable() {
    let data = [];
    if (this.state.profiles.length > 0) {
      data = this.state.profiles.map((profile, key) => {
        const dataTable = {
          id: key,
          code: profile.id,
          name: profile.name,
          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {/* use this button to add a edit kind of action */}
              <Button
                justIcon
                round
                simple
                onClick={() => {
                  let obj = this.state.profiles.find(o => o.id === profile.id);
                  alert(
                    "You've clicked EDIT button on \n{ \nName: " +
                      obj.name +
                      "\n}."
                  );
                }}
                color="warning"
                className="edit"
              >
                <Dvr />
              </Button>{" "}
              {/* use this button to remove the data row */}
              <Button
                justIcon
                round
                simple
                onClick={() => {
                  var data = this.state.profiles;
                  data.find((o, i) => {
                    if (o.id === profile.id) {
                      // here you should add some custom code so you can delete the data
                      // from this component and from your server as well
                      data.splice(i, 1);
                      return true;
                    }
                    return false;
                  });
                  this.setState({ profiles: data });
                }}
                color="danger"
                className="remove"
              >
                <Close />
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
        <GridItem xs={12}>
          <Card>
            <CardHeader color="warning" icon>
              <CardIcon color="warning">
                <Assignment />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Lista de Perfiles</h4>
            </CardHeader>
            <CardBody>
              <ReactTable
                previousText="Atrás"
                nextText="Siguiente"
                pageText="Página"
                ofText="de"
                rowsText="filas"
                loadingText="Cargando..."
                noDataText="No hay perfiles"
                data={dataTable}
                filterable
                columns={[
                  {
                    Header: "Id",
                    accessor: "code"
                  },
                  {
                    Header: "Nombre",
                    accessor: "name"
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

export default withStyles(styles)(profilesList);
