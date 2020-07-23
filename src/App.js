import React, { Component } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import data from "./Data";
import Context from "./Context";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import Cart from "./components/Cart";


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.routerRef = React.createRef();
  }


  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          removeFromCart: this.removeFromCart,
          addToCart: this.addToCart,
          login: this.login,
          addProduct: this.addProduct,
          clearCart: this.clearCart,
          checkout: this.checkout
        }}
      >
        <Router ref={this.routerRef}>
          <div className="App">
            <nav
              className="navbar container"
              role="navigation"
              aria-label="main navigation"
            >
              <div className="navbar-brand">
                <b className="navbar-item is-size-4 ">ecommerce</b>
                <a
                  role="button"
                  class="navbar-burger burger"
                  aria-label="menu"
                  aria-expanded="false"
                  data-target="navbarBasicExample"
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ showMenu: !this.state.showMenu });
                  }}
                >
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                </a>
              </div>
              <div className={`navbar-menu ${
                  this.state.showMenu ? "is-active" : ""
                }`}>
                <Link to="/products" className="navbar-item">
                  Products
                </Link>
                {this.state.user && this.state.user.accessLevel < 1 && (
                  <Link to="/add-product" className="navbar-item">
                    Add Product
                  </Link>
                )}
                <Link to="/cart" className="navbar-item">
                  Cart
                  <span
                    className="tag is-primary"
                    style={{ marginLeft: "5px" }}
                  >
                    {Object.keys(this.state.cart).length}
                  </span>
                </Link>
                {!this.state.user ? (
                  <Link to="/login" className="navbar-item">
                    Login
                  </Link>
                ) : (
                  <a className="navbar-item" onClick={this.logout}>
                    Logout
                  </a>
                )}
              </div>
            </nav>
            <Switch>
              <Route exact path="/" component={Component} />
              <Route exact path="/login" component={Component} />
              <Route exact path="/cart" component={Component} />
              <Route exact path="/add-product" component={Component} />
              <Route exact path="/products" component={Component} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/add-product" component={AddProduct} />
              <Route exact path="/cart" component={Cart} />

            </Switch>
          </div>
        </Router>
      </Context.Provider>
    );
  }
}
constructor(props); {
  super(props);
  this.state = {
    user: null
  };
}
componentDidMount();{
  let user = localStorage.getItem("user");
  user = user ? JSON.parse(user) : null;
  this.setState({ user });
}
login = (usn, pwd) => {
  let user = data.users.find(u => u.username === usn && u.password === pwd);
  if (user) {
    this.setState({ user });
    localStorage.setItem("user", JSON.stringify(user));
    return true;
  }
  return false;
};
logout = e => {
  e.preventDefault();
  this.setState({ user: null });
  localStorage.removeItem("user");

};
constructor(props); {
  super(props);
  this.state = {
    user: null,
    products: []
  };
}
componentDidMount(); {
  let user = localStorage.getItem("user");
  let products = localStorage.getItem("products");

  user = user ? JSON.parse(user) : null;
  products = products ? JSON.parse(products) : data.initProducts;

  this.setState({ user, products });
}
addProduct = (product, callback) => {
  let products = this.state.products.slice();
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));
  this.setState({ products }, () => callback && callback());
};
constructor(props); {
  super(props);
  this.state = {
    user: null,
    products: [],
    Cart: {}
  };
}

componentDidMount(); {
  let user = localStorage.getItem("user");
  let products = localStorage.getItem("products");
  let cart = localStorage.getItem("cart");


  products = products ? JSON.parse(products) : data.initProducts;
  user = user ? JSON.parse(user) : null;
  cart = cart? JSON.parse(cart) : {};

  this.setState({ user, products, cart });
}
addToCart = cartItem => {
  let cart = this.state.cart;
  if (cart[cartItem.id]) {
    cart[cartItem.id].amount += cartItem.amount;
  } else {
    cart[cartItem.id] = cartItem;
  }
  if (cart[cartItem.id].amount > cart[cartItem.id].product.stock) {
    cart[cartItem.id].amount = cart[cartItem.id].product.stock;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  this.setState({ cart });
};
removeFromCart = cartItemId => {
  let cart = this.state.cart;
  delete cart[cartItemId];
  localStorage.setItem("cart", JSON.stringify(cart));
  this.setState({ cart });
};
clearCart = () => {
  let cart = {};
  localStorage.removeItem("cart");
  this.setState({ cart });
};
checkout = () => {
  if (!this.state.user) {
    this.routerRef.current.history.push("/login");
    return;
  }
  const cart = this.state.cart;
  const products = this.state.products.map(p => {
    if (cart[p.name]) {
      p.stock = p.stock - cart[p.name].amount;
    }
    return p;
  });
  this.setState({ products });
  this.clearCart();
};




