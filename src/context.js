import React, { Component } from "react";
import { detailProduct, storeProducts, storeCategories } from "./data";

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

  logout = () =>{
    this.setState({ email: "",
    password: ""})
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
    this.setState({email, password})
  }

  onFormChange = (elemName, value) => {
    this.setState({[elemName]: value})
  }

  pay = () => {
    //save the order
    let {subscribed, frequency, cartTotal} = this.state;
    //copy the cart into order
    let tempOrderHistory = [...this.state.orderHistory];
    tempOrderHistory.push({items: this.state.cart, cartTotal, subscribed, frequency, timestamp: new Date()});
    //add order to history and delete cart
    this.setState({orderHistory: tempOrderHistory});
    this.clearCart();
  }

  subscribeToggle(){
    this.setState({subscribed: !this.state.subscribed})
  }

  changeFrequency(event){
    this.setState({frequency: event.target.value})
  }

  // initializeMostPopular(size) {
  //   let tempMP = [];//contains id of random items
  //   for (let i = 0; i < size; ++i) tempMP[i] = i;

  //   // http://stackoverflow.com/questions/962802#962890
  //   function shuffle(array) {
  //     var tmp, current, top = array.length;
  //     if (top) while (--top) {
  //       current = Math.floor(Math.random() * (top + 1));
  //       tmp = array[current];
  //       array[current] = array[top];
  //       array[top] = tmp;
  //     }
  //     return array;
  //   }

  //   tempMP = shuffle(tempMP);
  //   this.setState({ mostPopular: tempMP });
  // }

  componentDidMount() {
    // beforeunload event fires before user reload or exit the page, componentwillunmount doesn't work here
    window.addEventListener('beforeunload', () => {
      localStorage.setItem("storeState", JSON.stringify(this.state));
      // localStorage.removeItem("storeState");
    });
    let oldState = JSON.parse(localStorage.getItem("storeState"));
    this.setProducts();
    // this.initializeMostPopular(16);

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

  addToCart = id => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;

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

  openModal = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };

  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };

  increment = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

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
      this.removeItem(id);
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

  removeItem = id => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];

    tempCart = tempCart.filter(item => item.id !== id);
    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];
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
  clearCart = () => {
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
  };
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
