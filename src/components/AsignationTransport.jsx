import React, { Component } from 'react';
import DownloadIcon from "/icons/download.png";
import UploadIcon from "/icons/upload.png";

import "../styles/AsignationTransport.css";
const AsignationTransport = () => {
    return (
        <>
            <div className="controls-bottom-left">
                <button className="controls-botton">A</button>
                <button className="controls-botton">T</button>
                <button className="controls-botton">
                    <img
                        src={UploadIcon}
                        alt="A"
                        style={{
                            width: "20px",
                        }}
                    />
                </button>
                <button className="controls-botton">
                    <img
                        src={DownloadIcon}
                        alt="A"
                        style={{
                            width: "20px",
                        }}
                    />
                </button>
                <button className="controls-botton"
                    onClick={() => window.open("/manual.pdf")}
                    style={{ color: "#000" }}
                >?</button>
            </div>
        </>
    );
};


export default AsignationTransport;