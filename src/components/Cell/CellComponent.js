import React from 'react';
import * as PropTypes from 'prop-types';

import styles from './CellComponent.scss';


class CellComponent extends React.Component {

    static propTypes = {
        cellValue: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.string
        ]).isRequired,
        isActive: PropTypes.bool.isRequired,
        isWinningSequenceCell: PropTypes.bool.isRequired,
        onCellClickHandler: PropTypes.func.isRequired
    };


    setCssClasses() {

        let cssClasses = styles.gameCell;

        if (this.props.cellValue) {
            cssClasses += ` ${styles.active}`;
        }

        if (this.props.isWinningSequenceCell) {
            cssClasses += ` ${styles.isWinningSequenceCell}`;
        }

        if (!this.props.isActive) {
            cssClasses += ` ${styles.inactive}`;
        }

        return cssClasses;
    }


    onCellClick() {

        if (this.props.cellValue) {
            return;
        }

        if (this.props.isActive) {
            this.props.onCellClickHandler();
        }
    }


    render() {

        return (
            <div className={this.setCssClasses()}
                onClick={::this.onCellClick}
            >
                {this.props.cellValue}
            </div>
        );
    }
}


export default CellComponent;
