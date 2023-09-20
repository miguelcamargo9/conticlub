import React from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import classNames from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import Search from "@material-ui/icons/Search";

// react component used to create sweet alerts
import SweetAlert from "react-bootstrap-sweetalert";

import { CSVLink } from "react-csv";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Pagination from "components/Pagination/Pagination.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";

import * as productActions from "../../../actions/productActions";

import { getCategoriesService } from "../../../services/productCategoryService";
import { deleteProductService } from "../../../services/productService";

// utils
import { BUCKET_URL } from "../../../constants/server";

const productListAdminStyles = {
  ...sweetAlertStyle,
  ...dashboardStyle
};

const selectStyles = {
  container: (base, state) => ({
    ...base,
    opacity: state.isDisabled ? ".5" : "1",
    backgroundColor: "transparent",
    zIndex: "999",
    width: "70%"
  })
};

class productListAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filteredProducts: [],
      currentPage: 1,
      allPerPage: 16,
      totalPages: 0,
      pagination: [{ text: "ATRAS" }],
      alert: null,
      show: false
    };
    this.warningWithConfirmMessage = this.warningWithConfirmMessage.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
  }

  componentDidMount() {
    this.props.ProductActions.getProductsAction();

    getCategoriesService().then(categories => {
      categories = categories.data.map(category => {
        category.value = category.id;
        category.label = category.name;
        return category;
      });
      this.setState({ categories: categories });
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.products !== this.props.products) {
      const { allPerPage } = this.state;
      const { products } = this.props;
      let totalPages = Math.ceil(products.length / allPerPage);
      const currentProducts = this.buildPagination(allPerPage, 1, products);
      let pagination = this.createPagination(1, totalPages);
      this.setState({
        products: this.props.products,
        filteredProducts: currentProducts,
        pagination,
        totalPages,
        currentPage: 1
      });
    }
  }

  warningWithConfirmMessage(productId) {
    this.setState({
      alert: (
        <SweetAlert
          warning
          style={{ display: "block", marginTop: "-200px" }}
          title="Está seguro que desea borrar este Producto?"
          onConfirm={() => this.deleteProduct(productId)}
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
          Después de eliminado no podrá recuperar la Información
        </SweetAlert>
      )
    });
  }

  successDelete(productId) {
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
          El producto con ID: {productId} ha sido eliminado.
        </SweetAlert>
      )
    });
  }

  cancelDelete(text) {
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

  deleteProduct(productId) {
    deleteProductService(productId)
      .then(productInfo => {
        if (productInfo.data.message === "success") {
          const products = this.state.filteredProducts;
          products.find((product, i) => {
            if (product.id === productId) {
              products.splice(i, 1);
              return true;
            }
            return false;
          });
          this.setState({ filteredProducts: products });
          this.successDelete(productId);
        } else {
          return this.cancelDelete(productInfo.data.detail);
        }
      })
      .catch(e => {
        console.log("Error eliminando producto con id: productId", e);
      });
  }

  hideAlert() {
    this.setState({
      alert: null
    });
  }

  createPagination(currentPage, totalPages) {
    let pagination = [
      { text: "ATRAS", onClick: this.handleClickPaginator.bind(this) }
    ];
    for (let i = 1; i <= totalPages; i++) {
      pagination.push({
        text: i,
        active: currentPage === i ? true : false,
        onClick: this.handleClickPaginator.bind(this)
      });
    }
    pagination.push({
      text: "SIGUIENTE",
      onClick: this.handleClickPaginator.bind(this)
    });
    return pagination;
  }

  handleClickPaginator(index) {
    if (index === "ATRAS") {
      index =
        this.state.currentPage === 1
          ? this.state.currentPage
          : this.state.currentPage - 1;
    }
    if (index === "SIGUIENTE") {
      index =
        this.state.currentPage === this.state.totalPages
          ? this.state.currentPage
          : this.state.currentPage + 1;
    }
    const { allPerPage, totalPages } = this.state;
    const { products } = this.props;
    const currentProducts = this.buildPagination(allPerPage, index, products);
    let pagination = this.createPagination(index, totalPages);

    this.setState({
      filteredProducts: currentProducts,
      pagination,
      currentPage: index
    });
  }

  buildPagination(allPerPage, currentPage, products) {
    // Logic for displaying todos
    const indexOfLastProduct = currentPage * allPerPage;
    const indexOfFirstProduct = indexOfLastProduct - allPerPage;
    const currentProducts = products.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );

    return currentProducts;
  }

  handleChangeCategory = category => {
    this.props.ProductActions.getProductsByCategoryId(category.id);
  };

  buildGridData(classes) {
    let gridData = [];

    if (this.state.filteredProducts.length > 0) {
      gridData = this.state.filteredProducts.map((picture, index) => {
        let hrefValue = "#" + index;
        const path =
          BUCKET_URL +
          decodeURIComponent((picture.image + "").replace(/\+/g, "%20"));

        // const path = picture.image;
        const imgElement = (
          <GridItem xs={12} sm={6} md={6} lg={3} key={index}>
            <Card product className={classes.cardHover}>
              <CardHeader image className={classes.cardHeaderHover}>
                <a href={hrefValue} onClick={e => e.preventDefault()}>
                  <img src={path} alt={picture.name} />
                </a>
              </CardHeader>
              <CardBody>
                <div className={classes.cardHoverUnder}>
                  <Tooltip
                    id="tooltip-top"
                    title="Editar"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button
                      color="warning"
                      simple
                      justIcon
                      onClick={() => {
                        this.props.history.push(
                          `/admin/edit-product/${picture.id}`
                        );
                      }}
                    >
                      <Edit className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    id="tooltip-top"
                    title="Eliminar"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button
                      color="danger"
                      simple
                      justIcon
                      onClick={() => {
                        this.warningWithConfirmMessage(picture.id);
                      }}
                    >
                      <Delete className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                </div>
                <h4 className={classes.cardProductTitle}>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    {picture.name}
                  </a>
                </h4>
                <p className={classes.cardProductDesciprion}>
                  {picture.product_category.name}
                </p>
              </CardBody>
              <CardFooter product>
                <div className={classes.price}>
                  <h4>{picture.points} pts.</h4>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        );
        return [imgElement];
      });

      return gridData;
    }
  }

  change(event) {
    let searchText = event.target.value.toLowerCase();
    if (searchText.length > 3) {
      let productData = this.props.products.filter(product => {
        return product.name.toLowerCase().includes(searchText);
      });
      this.setState({
        filteredProducts: productData
      });
    } else {
      this.setState({
        filteredProducts: this.state.products
      });
    }
  }

  buildDataExcel(){
    let data = [];
    if (this.state.products && this.state.products.length > 0) {
      data = this.state.products.map(product => {
        let dataTable = {
          id: product.id,
          name: product.name,
          points: product.points,
          category: product.product_category && product.product_category.name,
          estimated_value: product.estimated_value,
          status: product.state ? "ACTIVO" : "DESACTIVADO",
        };
        return dataTable;
      });
      return data;
    }
    return data;
  }

  render() {
    const { classes, rtlActive } = this.props;
    const searchButton =
      selectStyles +
      " " +
      classes.top +
      " " +
      classes.searchButton +
      " " +
      classNames({
        [classes.searchRTL]: rtlActive
      });

    const gridData = this.buildGridData(classes);
    const dataExcel = this.buildDataExcel();
    const headExcel = [
      {
        Header: "ID",
        accessor: "id"
      },
      {
        Header: "Nombre",
        accessor: "name"
      },
      {
        Header: "Puntos",
        accessor: "points"
      },
      {
        Header: "Categoria",
        accessor: "category"
      },
      {
        Header: "Valor estimado",
        accessor: "estimated_value"
      },
      {
        Header: "Stado",
        accessor: "status"
      }
    ];
    const prettyLink = {
      backgroundColor: "#fb8c00",
      height: 20,
      padding: "10px",
      color: "#fff"
    };
    return this.state.products.length > 0 ? (
      <div>
        {this.state.alert}
        <CardBody>
          <GridContainer justify="space-between">
            <GridItem xs={12} sm={10} md={6} />
            <GridItem xs={12} sm={10} md={3}>
              <span>
                <CSVLink
                  columns={headExcel}
                  data={dataExcel}
                  style={prettyLink}
                  filename={"productos.csv"}
                >
                  Exportar a CSV
                </CSVLink>
              </span>
            </GridItem>
          </GridContainer>
        </CardBody>
        <GridContainer justify="space-between">
          <GridItem xs={12} sm={2}>
            <h4>Lista de Productos</h4>
          </GridItem>
          <GridItem xs={12} sm={4}>
            <CustomInput
              id="required"
              formControlProps={{
                className: classes.search
              }}
              inputProps={{
                placeholder: rtlActive ? "Search" : "Buscar",
                onChange: event => this.change(event),
                type: "search"
              }}
            />
            <Button
              color="white"
              aria-label="edit"
              justIcon
              round
              className={searchButton}
            >
              <Search
                className={classes.headerLinksSvg + " " + classes.searchIcon}
              />
            </Button>
            <Select
              value={this.selectedOption}
              onChange={this.handleChangeCategory}
              options={this.state.categories}
              placeholder={"Seleccione una categoria"}
              styles={selectStyles}
            />
          </GridItem>
        </GridContainer>
        <hr />
        <GridContainer>{gridData}</GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6}>
            <Pagination pages={this.state.pagination} color="warning" />
          </GridItem>
        </GridContainer>
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.product.products
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ProductActions: bindActionCreators(productActions, dispatch)
  };
}

export default compose(
  withStyles(productListAdminStyles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(productListAdmin);
