import React, { useState } from 'react';
import "../styles/styles.css";
import AssignmentGraph from './AssignmentGraph';
import AssignmentTransport from './AssignmentTransport';
/**
 * 
 * @returns the AssignmentScreen component 
 * Choose between AssignmentGraph and AssignmentTransport
 * 
 */
const AssignmentScreen = () => {
    const [selectScreen, setSelectScreen] = useState(true);
    /*
    * change the state of selectScreen
    */
    const handleTogle = () => {
        setSelectScreen(!selectScreen);
    }
    return (
        <>
                <button className="buttonScreen" onClick={handleTogle}>
                    {
                        (selectScreen ? "Assignment Matrix" : "Assignment Graph")
                    }
                </button>
            {(selectScreen ? <AssignmentGraph /> : <AssignmentTransport />)}
            </>
    );
    }
export default AssignmentScreen;