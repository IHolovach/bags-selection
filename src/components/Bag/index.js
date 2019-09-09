import React, {Fragment, PureComponent} from 'react';
import classNames from 'classnames';

import './style.css';

class Bag extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
    };
  }

  onChange = event => {
    const { id } = event.target.dataset;
    const isSelected = event.target.checked;
    const { onBagChangeState } = this.props;
    const { price } = this.state;
    const bag = {
      id,
      price,
      isSelected,
    };
    this.setState({ isSelected });
    onBagChangeState(bag);
  };

  render() {
    const {
      id,
      descriptionLocalized,
      measurements,
      status,
      isSelected,
    } = this.state;
    const isChargeable = status.toLowerCase() === 'chargeable';

    return (
      <div className={classNames("bag", {
        "bag-regular": !isChargeable,
      })}>
        {isChargeable
          ? (
            <input
              className="currency-input"
              data-id={id}
              type="checkbox"
              defaultChecked={isSelected}
              onChange={this.onChange}
            />
          )
          : null
        }
        <p className="bag-info">
          {descriptionLocalized}
        </p>
        {!!measurements
          ? (
            <Fragment>
              <p className="bag-info">
                {measurements[1].unit}
              </p>
              <p className="bag-info">
                {measurements[1].measure}
              </p>
            </Fragment>
          )
          : null
          }
        <p className="bag-info">
          {status}
        </p>
      </div>
    );
  }
}

export default Bag;
