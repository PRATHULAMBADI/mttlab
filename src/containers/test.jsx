import React from "react";
import DataStore from "../DataStore/data_file.json";
import MatchStore from "../DataStore/highlight.json";

class Task extends React.Component {
  setColor = (v, i) => {
    let slice = v && typeof v === "string" ? v.split(" ") : [];
    return slice.map(elem => this.paintUI(elem, i));
  };

  paintUI = (item, key) => {
    let json =
      MatchStore &&
      MatchStore.formattedAnnotations &&
      MatchStore.formattedAnnotations[0] &&
      MatchStore.formattedAnnotations[0].annotations &&
      MatchStore.formattedAnnotations[0].annotations.annotations
        ? MatchStore.formattedAnnotations[0].annotations.annotations
        : {};
    let color =
      json[key] && json[key].inclusion && json[key].inclusion.includes(item)
        ? "green"
        : json[key] && json[key].exclusion && json[key].exclusion.includes(item)
        ? "red"
        : "";
    return (
      <span style={{ backgroundColor: color, marginLeft: "4px" }}>{item}</span>
    );
  };

  setHeader = header => {
    return (
      <thead>
        <tr>
          {header.map((str, index) => (
            <td style={{ border: "1px solid grey" }}>{str}</td>
          ))}
        </tr>
      </thead>
    );
  };

  setBody = (body, keyObj) => {
    return (
      <tbody style={{ width: "100%" }}>
        {body.map((arr, index) => (
          <tr key={index}>
            {arr.map(str => (
              <td style={{ border: "1px solid grey" }}>
                {this.setColor(str, keyObj)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  };

  setTable = (obj, keyObj) => {
    if (
      obj.text_extract &&
      obj.text_extract.tables &&
      obj.text_extract.tables[0]
    ) {
      return (
        <div style={{ width: "100vw" }}>
          <table style={{ width: "100%" }}>
            {this.setHeader(obj.text_extract.tables[0].columns || [])}
            {this.setBody(obj.text_extract.tables[0].data || [], keyObj)}
          </table>
        </div>
      );
    } else {
      return <div>No Table Found</div>;
    }
  };

  createTotalUI = obj => {
    let arr = Object.keys(obj);
    return arr.map((key, index) => (
      <div key={index} style={{ marginTop: "20px" }}>
        <div>{key}</div>
        {this.setTable(obj[key], key)}
      </div>
    ));
  };

  render() {
    return (
      <div>
        <div>
          {this.createTotalUI(
            DataStore.deIdentifiedFile && DataStore.deIdentifiedFile.file
          )}
        </div>
      </div>
    );
  }
}

export default Task;
