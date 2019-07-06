import React from "react";

// react component for creating dynamic tables
import ReactTable from "react-table";

// react component used to create sweet alerts
import SweetAlert from "react-bootstrap-sweetalert";

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

import {
  getCategoriesService,
  deleteProductCategoryService
} from "../../../services/productCategoryService";

import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  ...sweetAlertStyle
};

class ListCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productCategories: [],
      alert: null,
      show: false
    };
    this.warningWithConfirmMessage = this.warningWithConfirmMessage.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
  }
  componentDidMount() {
    getCategoriesService()
      .then(dataCategories => {
        this.setState({ productCategories: dataCategories.data });
      })
      .catch();
  }

  warningWithConfirmMessage(categoryId) {
    console.log("recibo id", categoryId);
    this.setState({
      alert: (
        <SweetAlert
          warning
          style={{ display: "block", marginTop: "-200px" }}
          title="Esta seguro que desea borrar esta Categoría?"
          onConfirm={() => this.deleteProductCategory(categoryId)}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
          cancelBtnCssClass={
            this.props.classes.button + " " + this.props.classes.danger
          }
          confirmBtnText="Sí, borrar!"
          cancelBtnText="Cancelar"
          showCancel
        >
          Después de eliminada no podrá recuperar la Información
        </SweetAlert>
      )
    });
  }

  successDelete(categoryId) {
    this.setState({
      alert: (
        <SweetAlert
          success
          style={{ display: "block", marginTop: "-200px" }}
          title="Eliminado!"
          onConfirm={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
        >
          La categoría con ID: {categoryId} ha sido eliminada.
        </SweetAlert>
      )
    });
  }

  cancelDetele(text) {
    this.setState({
      alert: (
        <SweetAlert
          danger
          style={{ display: "block", marginTop: "-200px" }}
          title="Cancelled"
          onConfirm={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
        >
          {text}
        </SweetAlert>
      )
    });
  }

  deleteProductCategory(categoryId) {
    deleteProductCategoryService(categoryId)
      .then(productCategoryInfo => {
        if (productCategoryInfo.data.message === "success") {
          const productCategories = this.state.productCategories;
          productCategories.find((productCategory, i) => {
            if (productCategory.id === categoryId) {
              productCategories.splice(i, 1);
              return true;
            }
            return false;
          });
          this.setState({ productCategories: productCategories });
          this.successDelete(categoryId);
        } else {
          return this.cancelDetele(productCategoryInfo.data.detail);
        }
      })
      .catch(e => {
        console.log(
          "Error eliminando categoria de producto con id: categoryId"
        );
      });
  }

  hideAlert() {
    this.setState({
      alert: null
    });
  }

  buildDataTable() {
    let data = [];
    if (this.state.productCategories.length > 0) {
      data = this.state.productCategories.map((productCategory, key) => {
        const dataTable = {
          id: key,
          name: productCategory.name,
          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {/* use this button to add a edit kind of action */}
              <Button
                justIcon
                round
                simple
                onClick={() => {
                  let categorySelect = this.state.productCategories.find(
                    findCategory => findCategory.id === productCategory.id
                  );
                  this.props.history.push({
                    pathname: `/admin/edit-category`,
                    state: {
                      categoryName: productCategory.name,
                      id: categorySelect.id
                    }
                  });
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
                  this.warningWithConfirmMessage(productCategory.id);
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
      <div>
        {this.state.alert}
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="warning" icon>
                <CardIcon color="warning">
                  <Assignment />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Lista de Categorias</h4>
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
                      Header: "ID",
                      accessor: "id"
                    },
                    {
                      Header: "Categoria",
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
      </div>
    );
  }
}

export default withStyles(styles)(ListCategories);
