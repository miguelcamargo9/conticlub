import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import compose from "recompose/compose";
import classNames from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import ArtTrack from "@material-ui/icons/ArtTrack";
import Refresh from "@material-ui/icons/Refresh";
import Edit from "@material-ui/icons/Edit";
import Search from "@material-ui/icons/Search";

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

// utils

import { SERVER_URL } from "../../../constants/server";

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
  }

  componentDidUpdate(prevProps) {
    if (prevProps.products !== this.props.products) {
      const { allPerPage, currentPage } = this.state;
      const { products } = this.props;
      let totalPages = Math.ceil(products.length / allPerPage);
      const currentProducts = this.buildPagination(
        allPerPage,
        currentPage,
        products
      );
      let pagination = this.createPagination(currentPage, totalPages);

      console.log(pagination);

      this.setState({
        products: this.props.products,
        filteredProducts: currentProducts,
        pagination,
        totalPages
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
        active: currentPage == i ? true : false,
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
        this.state.currentPage == 1
          ? this.state.currentPage
          : this.state.currentPage - 1;
    }
    if (index === "SIGUIENTE") {
      index =
        this.state.currentPage == this.state.totalPages
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

  buildGridData(classes) {
    let gridData = [];

    if (this.state.filteredProducts.length > 0) {
      gridData = this.state.filteredProducts.map((picture, index) => {
        let hrefValue = "#" + index;
        // const path = SERVER_URL + picture.image;
        const path = picture.image;
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
                    title="View"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="transparent" simple justIcon>
                      <ArtTrack className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    id="tooltip-top"
                    title="Edit"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="success" simple justIcon>
                      <Refresh className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    id="tooltip-top"
                    title="Remove"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="danger" simple justIcon>
                      <Edit className={classes.underChartIcons} />
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

  render() {
    const { classes, rtlActive } = this.props;
    const searchButton =
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
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardBody style={{ textAlign: "center" }}>
                <Pagination pages={this.state.pagination} color="warning" />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer justify="space-between">
          <GridItem xs={12} sm={2}>
            <h4>Lista de Productos</h4>
          </GridItem>
          <GridItem xs={12} sm={3}>
            <CustomInput
              id="required"
              formControlProps={{
                className: classes.top + " " + classes.search
              }}
              inputProps={{
                placeholder: rtlActive ? "Search" : "Buscar",
                onChange: event => this.change(event),
                type: "search",
                className: classes.searchInput
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
          </GridItem>
        </GridContainer>
        <GridContainer>{gridData}</GridContainer>
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
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(productList);
