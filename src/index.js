import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import toaster from 'toasted-notes';

import data from './data.json';
import Bags from './components/Bags';

import 'toasted-notes/src/styles.css';
import './styles.css';

/*
  1. create tabs for switching between itinerary and legs
  2. create complete list of all bags for each group with the provided template like .bag div
  3. create selection only for bags that have state === "Chargeable"
  4. write total price for selected bags
  5. BONUS: display warning when switching to other mode and you have some bags selected
*/
class App extends Component {
  state = {
    activeTab: 0,
    isSelectedItemsExist: false,
  };

  onChangeTab = (activeTab) => {
    const { isSelectedItemsExist } = this.state;
    if (isSelectedItemsExist) {
      toaster.notify('Warning: You have selected items', {
        duration: 2000,
      });
    }
    this.setState({ activeTab });
  };

  changeSelectionStatus = (isSelectedItemsExist) => {
    this.setState({ isSelectedItemsExist });
  };

  render() {
    const groups = Object.keys(data);
    const { activeTab } = this.state;
    const tabData = Object.values(data)[activeTab];

    return (
      <div className="App">
        <div className="tabs">
          {groups.map((group, index) => (
            <p
              key={group}
              className={classNames('tab', {
                'active-tab': activeTab === index,
                'regular-tab': activeTab !== index,
              })}
              onClick={() => this.onChangeTab(index)}
            >
              {group}
            </p>
          ))}
        </div>
        <Bags
          list={tabData}
          changeSelectionStatus={this.changeSelectionStatus}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
