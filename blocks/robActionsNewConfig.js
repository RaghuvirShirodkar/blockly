/**
 * @fileoverview Action blocks for the new Configuration type.
 * @requires Blockly.Blocks
 * @author Marcel
 */
'use strict';

goog.provide('Blockly.Blocks.robActionsNewConfig');

goog.require('Blockly.Blocks');
goog.require('Blockly.Blocks.robConfigDefinitions');

/**
 * @lends Block
 */
Blockly.Blocks['robActions_motor_getPower_mbot2'] = {
    /**
     * Get current power of this motor.
     * 
     * @constructs robActions_getPower_mbot2
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            MOTORPORT - available motornames
     * @returns immediately
     * @returns {Number} current Power
     * @memberof Block
     */
    init: function () {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.GET + ' ' + Blockly.Msg.MOTOR_SPEED).appendField(getMotorNames(), 'MOTORPORT');
        this.setOutput(true, 'Number');
        this.setTooltip(Blockly.Msg.MOTOR_GETPOWER_TOOLTIP);
    }
};


/**
 * Ensure that only a number may be entered.
 * @return {?string} A string representing a valid number, or null if invalid.
 */
function getMotorNames() {
    var portList = [];
    var container = Blockly.Workspace.getByContainer("bricklyDiv");
    if (container) {
        var blocks = Blockly.Workspace.getByContainer("bricklyDiv").getAllBlocks();
        for (var x = 0; x < blocks.length; x++) {
            var func = blocks[x].getConfigDecl;
            if (func) {
                var configs = func.call(blocks[x]);
                for (var i = 0; i < configs.length; i++) {
                    var config = configs[i];
                    if (config.type === 'motor' || config.type === 'robbrick_motor_mbot2') {
                        portList.push([config.name, config.name]);
                    }
                }
            }
        }
    }
    if (portList.length === 0) {
        portList.push([Blockly.Msg.CONFIGURATION_NO_PORT || Blockly.checkMsgKey('CONFIGURATION_NO_PORT'),
        (Blockly.Msg.CONFIGURATION_NO_PORT || Blockly.checkMsgKey('CONFIGURATION_NO_PORT')).toUpperCase()]);
    }
    var ports = new Blockly.FieldDropdown(portList);
    return ports;
}

