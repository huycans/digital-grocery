import React, { Component } from "react";
import { detailProduct, storeProducts, storeCategories } from "./data";
import { toast } from "react-toastify"
import { ButtonContainer } from "./Components/Button";
const ProductContext = React.createContext();
//Provider
//Consumer

class ProductProvider extends Component {
  state = {
    products: [],
    categories: [],
    filteredProducts: [],
    // mostPopular: [],
    detailProduct,
    cart: [],
    orderHistory: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
    searchValue: "",
    // for order
    subscribed: false,
    frequency: "1",
    //for forms
    paymethod: "",
    name: "",
    cardnum: "",
    expMonth: "",
    expYear: "",
    security: "",
    //help message on or off
    help: true,
    //user profile
    email: "",
    password: ""
  };


  logout = () => {
    this.setState({
      email: "",
      password: ""
    })
  }

  clearPayment = () => {
    this.setState({
      paymethod: "",
      name: "",
      cardnum: "",
      expMonth: "",
      expYear: "",
      security: "",
    });

  }

  signin = (email, password) => {
    this.setState({ email, password })
  }

  onFormChange = (elemName, value) => {
    this.setState({ [elemName]: value })
  }

  pay = () => {
    //save the order
    let { subscribed, frequency, cartTotal } = this.state;
    //copy the cart into order
    let tempOrderHistory = [...this.state.orderHistory];
    tempOrderHistory.push({ items: this.state.cart, cartTotal, subscribed, frequency, timestamp: new Date() });
    //add order to history and delete cart
    this.setState({ orderHistory: tempOrderHistory });
    this.clearCart(true);
    setTimeout(() => {
      this.clearPayment();
    }, 500); 
    this.setState({searchValue: "", filteredProducts: []});
  }

  subscribeToggle() {
    this.setState({ subscribed: !this.state.subscribed })
  }

  changeFrequency(event) {
    this.setState({ frequency: event.target.value })
  }

  componentDidMount() {
    // beforeunload event fires before user reload or exit the page, componentwillunmount doesn't work here
    window.addEventListener('beforeunload', () => {
      localStorage.setItem("storeState", JSON.stringify(this.state));
      // localStorage.removeItem("storeState");
    });
    let oldState = JSON.parse(localStorage.getItem("storeState"));
    this.setProducts();

    if (oldState != null) {
      let { cart,
        cartSubTotal,
        cartTax,
        cartTotal,
        products,
        orderHistory,
        detailProduct,
        email } = oldState;

      this.setState({
        cart,
        cartSubTotal,
        cartTax,
        cartTotal,
        products,
        modalOpen: false,
        searchValue: "",
        orderHistory,
        detailProduct,
        email
      })
    };
  }
  onSearchInput = (event) => {
    this.setState({ searchValue: event.target.value }, () => {
      if (this.state.searchValue == "" || this.state.searchValue.length < 2) this.setState({ filteredProducts: [] });
      else {
        const filteredProducts = this.state.products.filter((product, index) => {
          return product.title.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) != -1
        })
        this.setState({ filteredProducts: filteredProducts });
      }
    });
  }
  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach(item => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });

    let tempCategories = [];
    storeCategories.forEach(item => {
      const singleItem = { ...item };
      tempCategories = [...tempCategories, singleItem];
    });

    this.setState(() => {
      return { products: tempProducts, categories: tempCategories };
    });
  };

  getItem = id => {
    const product = this.state.products.find(item => item.id === id);
    return product;
  };

  handleDetail = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product };
    });
  };

  addToCart = (id, count) => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;

    const price = product.price;
    product.total = price;

    //using hack to put count into product
    //when user undo delete item, count is passed into here, otherwise it's undefined
    if (count){
      product.count = count;
      product.total = price*product.count;
    }
    this.setState(
      () => {
        return {
          products: tempProducts,
          cart: [...this.state.cart, product]
        };
      },
      () => {
        this.addTotals();
      }
    );
  };

  increment = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    console.log("product", product);

    product.count = product.count + 1;
    product.total = product.count * product.price;

    this.setState(
      () => {
        return { cart: [...tempCart] };
      },
      () => {
        this.addTotals();
      }
    );
  };

  decrement = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count = product.count - 1;

    if (product.count === 0) {
      this.removeItem(id, true);
    }
    else {
      product.total = product.count * product.price;
      this.setState(
        () => {
          return { cart: [...tempCart] };
        },
        () => {
          this.addTotals();
        }
      );
    }

  };

  showToast = (message, id, count, undo, cart) => {
    const settings =  {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false
    }
    if (cart != undefined){
      toast.info(() => {return <div>
        <h4>
          {message} <button onClick={() => undo(cart)}>UNDO</button>
        </h4>
      </div>}, settings)
    }
    else {
      toast.info(() => {return <div>
        <h4>
          {message} <button onClick={() => undo(id, count)}>UNDO</button>
        </h4>
      </div>},settings)
    }
  }

  undoItem = (id, count) => {
    setTimeout(() => {
      this.addToCart(id, count);
    }, 50); 
  }

  undoCart = (cart) => {
    for (let i = 0; i < cart.length; i++) {
      //hack! need setTimeout to remove missing items in cart problem because multiple this.addToCart calls
      //need multiple setState calls, which cause asynch problem with state
      setTimeout(() => {
        this.undoItem(cart[i].id, cart[i].count);
      }, 50*i); 
    }
  }
  removeItem = (id, dontShowToast) => {
    //prepare to remove the item
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter(item => item.id !== id);
    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];

    if (!dontShowToast) this.showToast("Item removed", id, removedProduct.count, this.undoItem);

    //reset data
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;

    this.setState(
      () => {
        return {
          cart: [...tempCart],
          products: [...tempProducts]
        };
      },
      () => {
        this.addTotals();
      }
    );
  };

  clearCart = (dontShowToast) => {
    let cartCopy = [...this.state.cart]
    if (!dontShowToast) this.showToast("Cart emptied", null, null, this.undoCart, cartCopy);
    this.setState(
      () => {
        return {
          cart: []
        };
      },
      () => {
        //reset all data as if new
        this.setProducts();
        this.addTotals();
      }
    );
  }

  addTotals = () => {
    let subtotal = 0;
    this.state.cart.map(item => {
      return (subtotal += item.total);
    });
    const tempTax = subtotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subtotal + tax;
    this.setState(() => {
      return {
        cartSubTotal: subtotal,
        cartTax: tax,
        cartTotal: total
      };
    });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
          onSearchInput: this.onSearchInput,
          saveOrder: this.saveOrder,
          pay: this.pay,
          subscribeToggle: this.subscribeToggle,
          changeFrequency: this.changeFrequency,
          onFormChange: this.onFormChange,
          signin: this.signin,
          logout: this.logout,
          clearPayment: this.clearPayment
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
