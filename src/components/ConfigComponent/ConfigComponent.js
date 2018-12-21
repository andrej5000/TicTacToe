import React from 'react';
import PropTypes from 'prop-types';

import styles from './ConfigComponent.scss';


class ConfigComponent extends React.Component {

    static propTypes = {
        fieldHeightName: PropTypes.string.isRequired,
        fieldHeightValue: PropTypes.number.isRequired,
        fieldWidthName: PropTypes.string.isRequired,
        fieldWidthValue: PropTypes.number.isRequired,
        isConfigWindowVisible: PropTypes.bool.isRequired,
        maxRasterDimension: PropTypes.number.isRequired,
        onGetConfigValue: PropTypes.func.isRequired,
        onSetConfigValue: PropTypes.func.isRequired,
        onRenderGameField: PropTypes.func.isRequired
    };


    render() {

        const {
            fieldHeightName,
            fieldHeightValue,
            fieldWidthName,
            fieldWidthValue,
            isConfigWindowVisible,
            onSetConfigValue
        } = this.props;


        if (!isConfigWindowVisible) {
            return null;
        }


        return (
            <table className={styles.configTable}>
                <tbody>
                    <tr>
                        <td colSpan={2}>
                            <i><small>Max. rows and columns: {this.props.maxRasterDimension}</small></i>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor={'fieldHeight'}>
                                Field height:
                            </label>
                        </td>
                        <td>
                            <input id={'fieldHeight'}
                                   onChange={(event) => onSetConfigValue(
                                       fieldHeightName,
                                       ::this.validate(event.target.value)
                                   )}
                                   onFocus={(event) => event.target.setSelectionRange(0, event.target.value.length)} // auto-select mobile Safari safe
                                   value={fieldHeightValue}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor={'fieldWidth'}>
                                Field width:
                            </label>
                        </td>
                        <td>
                            <input id={'fieldWidth'}
                                   onChange={(event) => onSetConfigValue(
                                       fieldWidthName,
                                       ::this.validate(event.target.value)
                                   )}
                                   onFocus={(event) => event.target.setSelectionRange(0, event.target.value.length)} // auto-select mobile Safari safe
                                   value={fieldWidthValue}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <button onClick={::this.onClickHandler}>
                                Render TicTacToe field
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }


    onClickHandler() {

        // Reset old game.
        this.resetGame();

        this.props.onRenderGameField();
    }


    resetGame() {

        const {onSetConfigValue, onGetConfigValue} = this.props;

        onSetConfigValue('isGameFinished', false);
        onSetConfigValue('activePlayer', onGetConfigValue('players')[0].name);
    }


    validate(value) {

        if (isNaN(value)) {
            return 0;
        }

        return value > this.props.maxRasterDimension ? this.props.maxRasterDimension : Number(value);
    }
}


export default ConfigComponent;
