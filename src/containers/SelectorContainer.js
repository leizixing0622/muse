import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { observer } from 'mobx-react';

// Icons
import { PrevButton, NextButton } from '../sources/icons';

@observer
export default class SelectorContainer extends Component
{
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
    store: PropTypes.object.isRequired
  };

  id = undefined;

  constructor(props) {
    super(props);
    this.id = props.id;
  }

  /* event listeners */
  onPrevButtonClick = () => {
    const { store } = this.props,
          { playList, currentMusicIndex } = store;

    setTimeout(() => store.togglePlay(false), 0);

    if (currentMusicIndex - 1 >= 0) {
      store.setCurrentMusic(currentMusicIndex - 1);
    } else {
      store.setCurrentMusic(playList.length - 1);
    }

    setTimeout(() => store.togglePlay(true), 10);
  }

  onNextButtonClick = () => {
    const { store } = this.props,
          { playList, currentMusicIndex } = store;

    setTimeout(() => store.togglePlay(false), 0);

    if (currentMusicIndex + 1 < playList.length) {
      store.setCurrentMusic(currentMusicIndex + 1);
    } else {
      store.setCurrentMusic(0);
    }

    setTimeout(() => store.togglePlay(true), 10);
  }

  render() {
    return (
      <div className={ 'muse-selector' }>
        <div
          className={ 'muse-selector_prev' }
          title={ '上一首 (Previous)' }
          onClick={ this.onPrevButtonClick }
        >
          <PrevButton />
        </div>
        <div
          className={ 'muse-selector_next' }
          title={ '下一首 (Next)' }
          onClick={ this.onNextButtonClick }
        >
          <NextButton />
        </div>
      </div>
    );
  }
}
