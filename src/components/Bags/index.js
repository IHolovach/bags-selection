import React, { PureComponent, Fragment } from 'react';

import Bag from '../Bag';

import './style.css';

class Bags extends PureComponent {
  constructor(props) {
    super(props);
    this.defaultData = {
      totalPrice: 0,
      currency: '',
    };
    this.state = {
      selectedBags: [],
      ...this.defaultData,
    };
  }

  onRemoved(bag) {
    const { selectedBags } = this.state;

    let updatedBags = [];
    selectedBags.forEach(existingBag => {
      if (existingBag.id !== bag.id) {
        updatedBags.push(existingBag);
      }
    });
    this.updateSelectedBags(updatedBags);
  }

  onAdded(bag) {
    const { selectedBags } = this.state;
    const updatedBags = [
      ...selectedBags,
      bag,
    ];
    this.updateSelectedBags(updatedBags);
  }

  updateSelectedBags(bags) {
    this.setState(
      { selectedBags: bags },
      () => {
        this.calculateTotalPrice();
        this.sendSelectionStatus();
      });
  }

  onBagChangeState = (bag) => {
    const { selectedBags } = this.state;
    const isBagExists = !!selectedBags.find(item => item.id === bag.id);
    if (isBagExists) {
      this.onRemoved(bag);
      return;
    }
    this.onAdded(bag);
  };

  calculateTotalPrice() {
    const { selectedBags } = this.state;
    const isBagsSelected = selectedBags.length;

    if (isBagsSelected) {
      const {currency} = selectedBags[0].price;
      let totalPrice = 0;
      selectedBags.forEach(bag => {
        totalPrice += bag.price.amountValue;
      });
      this.setState({
        totalPrice: totalPrice.toFixed(2),
        currency,
      });
      return;
    }
    this.setState({
      ...this.defaultData,
    });
  }

  sendSelectionStatus() {
    const { changeSelectionStatus } = this.props;
    const { selectedBags } = this.state;
    const isBagsSelected = selectedBags.length;

    changeSelectionStatus(isBagsSelected);
  }

  renderBag = item => {
    const { selectedBags } = this.state;
    const isSelected = !!selectedBags.find(bag => (bag.id === item.id));

    return (
      <Bag
        key={item.id}
        {...item}
        isSelected={isSelected}
        onBagChangeState={this.onBagChangeState}
      />
    );
  };

  render() {
    const {
      totalPrice,
      currency,
    } = this.state;
    const { list } = this.props;

    return (
      <Fragment>
        <div className="bags">
          {list.map(item => this.renderBag(item))}
        </div>
        <div className="total-price">
          Total price:
          {totalPrice}
          {currency}
        </div>
      </Fragment>
    );
  }
}

export default Bags;
