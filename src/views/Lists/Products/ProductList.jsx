import React from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import classNames from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Search from "@material-ui/icons/Search";
import Favorite from "@material-ui/icons/FavoriteBorder";

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

import * as productActions from "../../../actions/productActions";

import { getCategoriesService } from "../../../services/productCategoryService";

// utils

import { BUCKET_URL } from "../../../constants/server";

const selectStyles = {
  container: (base, state) => ({
    ...base,
    opacity: state.isDisabled ? ".5" : "1",
    backgroundColor: "transparent",
    zIndex: "999",
    width: "70%"
  })
};

class productList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filteredProducts: [],
      currentPage: 1,
      allPerPage: 16,
      totalPages: 0,
      pagination: [{ text: "ATRAS" }]
    };
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
      gridData = this.state.filteredProducts.map((product, index) => {
        let hrefValue = "#" + index;
        const path = BUCKET_URL + product.image;
        const imgElement = (
          <GridItem xs={12} sm={6} md={6} lg={3} key={index}>
            <Card product>
              <CardHeader image>
                <a href={hrefValue} onClick={e => e.preventDefault()}>
                  <img src={path} alt={product.name} />
                </a>
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardProductTitle}>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    {product.name}
                  </a>
                </h4>
                <p className={classes.cardProductDesciprion}>
                  {product.product_category.name}
                </p>
              </CardBody>
              <CardFooter product>
                <div className={classes.price}>
                  <h4>{product.points} pts.</h4>
                </div>
                <Button
                  color="warning"
                  size="sm"
                  className={classes.marginRight}
                  onClick={e => {
                    this.props.history.push(
                      `/admin/redeem-product/${product.id}`
                    );
                  }}
                >
                  Redimir
                </Button>
                <Button
                  color="danger"
                  justIcon
                  round
                  simple
                  className={classes.marginRight}
                  onClick={e => console.log("start")}
                >
                  <Favorite />
                </Button>
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

    return this.state.products.length > 0 ? (
      <div>
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
  withStyles(dashboardStyle),
  connect(mapStateToProps, mapDispatchToProps)
)(productList);
